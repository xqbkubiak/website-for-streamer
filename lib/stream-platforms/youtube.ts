import { StreamStatus } from './types';

export async function getYouTubeStreamStatus(
    apiKey: string,
    channelId: string
): Promise<StreamStatus> {
    try {
        // First, get the channel's live broadcasts
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`;

        const searchResponse = await fetch(searchUrl);
        const searchData = await searchResponse.json();

        if (searchData.error) {
            console.error('YouTube API Error:', searchData.error);
            return {
                isLive: false,
                platform: 'YouTube',
            };
        }

        // Check if there are any live videos
        if (!searchData.items || searchData.items.length === 0) {
            return {
                isLive: false,
                platform: 'YouTube',
            };
        }

        const liveVideo = searchData.items[0];

        // Get video statistics for viewer count
        const videoId = liveVideo.id.videoId;
        const videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails&id=${videoId}&key=${apiKey}`;

        const videoResponse = await fetch(videoUrl);
        const videoData = await videoResponse.json();

        if (videoData.items && videoData.items.length > 0) {
            const video = videoData.items[0];
            const liveDetails = video.liveStreamingDetails;

            return {
                isLive: true,
                platform: 'YouTube',
                title: video.snippet.title,
                viewers: liveDetails?.concurrentViewers ? parseInt(liveDetails.concurrentViewers) : undefined,
                thumbnailUrl: video.snippet.thumbnails?.high?.url,
                streamUrl: `https://www.youtube.com/watch?v=${videoId}`,
            };
        }

        return {
            isLive: false,
            platform: 'YouTube',
        };
    } catch (error) {
        console.error('YouTube API request failed:', error);
        return {
            isLive: false,
            platform: 'YouTube',
        };
    }
}
