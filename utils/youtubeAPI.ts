const YOUTUBE_API_KEY = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY || "AIzaSyBYibXOgiSMmidWSECa4plIDj1ZWXxOw-E";
const YOUTUBE_CHANNEL_ID = process.env.EXPO_PUBLIC_YOUTUBE_CHANNEL_ID || "UCff6g5U72C10-bqm_M1a-lw";

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
}

// Get the uploads playlist ID for a channel
// Channel ID format: UC... → Uploads playlist: UU... (replace UC with UU)
const getUploadsPlaylistId = (channelId: string): string => {
  if (channelId.startsWith('UC')) {
    return 'UU' + channelId.slice(2);
  }
  return channelId;
};

// OPTIMIZED: Using playlistItems.list (1 unit per request) instead of search.list (100 units per request)
export const fetchYouTubeVideos = async (maxResults: number = 200): Promise<YouTubeVideo[]> => {
  try {
    const allVideos: YouTubeVideo[] = [];
    let pageToken: string | undefined = undefined;
    const videosPerPage = 50; // YouTube API max is 50 per request
    const pagesToFetch = Math.ceil(maxResults / videosPerPage);
    const uploadsPlaylistId = getUploadsPlaylistId(YOUTUBE_CHANNEL_ID);

    console.log(`Fetching videos from uploads playlist: ${uploadsPlaylistId}`);

    for (let page = 0; page < pagesToFetch; page++) {
      // Using playlistItems.list - COSTS ONLY 1 UNIT per request (vs 100 for search.list)
      const playlistUrl = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
      playlistUrl.searchParams.append("part", "snippet");
      playlistUrl.searchParams.append("playlistId", uploadsPlaylistId);
      playlistUrl.searchParams.append("maxResults", String(videosPerPage));
      playlistUrl.searchParams.append("key", YOUTUBE_API_KEY);
      
      if (pageToken) {
        playlistUrl.searchParams.append("pageToken", pageToken);
      }

      const response = await fetch(playlistUrl.toString());
      const data = await response.json();

      if (data.error) {
        console.error("YouTube API Error:", JSON.stringify(data.error));
        if (data.error.code === 403 && data.error.errors?.[0]?.reason === "quotaExceeded") {
          console.error("⚠️ QUOTA EXCEEDED: Your YouTube API key has reached its daily limit. Please update with a new API key in environment variables: EXPO_PUBLIC_YOUTUBE_API_KEY");
        }
        break;
      }

      if (!data.items || data.items.length === 0) {
        break;
      }

      const pageVideos = data.items.map((item: any) => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        channelTitle: item.snippet.channelTitle,
      }));

      allVideos.push(...pageVideos);

      // Stop if we've fetched enough videos
      if (allVideos.length >= maxResults) {
        break;
      }

      // Get next page token
      pageToken = data.nextPageToken;
      if (!pageToken) {
        break; // No more pages available
      }
    }

    console.log(`Successfully fetched ${allVideos.length} videos`);
    return allVideos.slice(0, maxResults);
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
};
