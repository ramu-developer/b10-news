const YOUTUBE_API_KEY = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY || "AIzaSyBYibXOgiSMmidWSECa4plIDj1ZWXxOw-E";
const YOUTUBE_CHANNEL_ID = process.env.EXPO_PUBLIC_YOUTUBE_CHANNEL_ID || "UCff6g5U72C10-bqm_M1a-lw";

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
}

export const fetchYouTubeVideos = async (maxResults: number = 200): Promise<YouTubeVideo[]> => {
  try {
    const allVideos: YouTubeVideo[] = [];
    let pageToken: string | undefined = undefined;
    const videosPerPage = 50; // YouTube API max is 50 per request
    const pagesToFetch = Math.ceil(maxResults / videosPerPage);

    for (let page = 0; page < pagesToFetch; page++) {
      const searchUrl = new URL("https://www.googleapis.com/youtube/v3/search");
      searchUrl.searchParams.append("part", "snippet");
      searchUrl.searchParams.append("channelId", YOUTUBE_CHANNEL_ID);
      searchUrl.searchParams.append("maxResults", String(videosPerPage));
      searchUrl.searchParams.append("order", "date");
      searchUrl.searchParams.append("type", "video");
      searchUrl.searchParams.append("key", YOUTUBE_API_KEY);
      
      if (pageToken) {
        searchUrl.searchParams.append("pageToken", pageToken);
      }

      const response = await fetch(searchUrl.toString());
      const data = await response.json();

      if (!data.items || data.items.length === 0) {
        break;
      }

      const pageVideos = data.items.map((item: any) => ({
        id: item.id.videoId,
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

    return allVideos.slice(0, maxResults);
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
};
