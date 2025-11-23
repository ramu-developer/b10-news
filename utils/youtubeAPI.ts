const YOUTUBE_API_KEY = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY || "AIzaSyBYibXOgiSMmidWSECa4plIDj1ZWXxOw-E";
const YOUTUBE_CHANNEL_ID = process.env.EXPO_PUBLIC_YOUTUBE_CHANNEL_ID || "UCff6g5U72C10-bqm_M1a-lw";

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
}

export const fetchYouTubeVideos = async (maxResults: number = 10): Promise<YouTubeVideo[]> => {
  try {
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${YOUTUBE_CHANNEL_ID}&maxResults=${maxResults}&order=date&type=video&key=${YOUTUBE_API_KEY}`;
    
    const response = await fetch(searchUrl);
    const data = await response.json();

    if (!data.items) {
      return [];
    }

    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      channelTitle: item.snippet.channelTitle,
    }));
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
};
