import { StreamStatus } from './types';

export async function getKickStreamStatus(username: string): Promise<StreamStatus> {
    try {
        const url = `https://kick.com/api/v2/channels/${username}`;

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            console.error(`Kick API Error: ${response.status}`);
            return {
                isLive: false,
                platform: 'Kick',
            };
        }

        const data = await response.json();

        // Sprawdź czy livestream istnieje (tak jak w Python kodzie)
        const isLive = data.livestream !== null && data.livestream !== undefined;

        if (!isLive) {
            return {
                isLive: false,
                platform: 'Kick',
            };
        }

        // Pobierz dane streamu
        const livestream = data.livestream;
        const viewerCount = livestream.viewer_count || 0;
        const streamTitle = livestream.session_title || 'Bez tytułu';
        const thumbnailUrl = livestream.thumbnail?.url;
        const avatarUrl = data.user?.profile_pic;

        return {
            isLive: true,
            platform: 'Kick',
            title: streamTitle,
            viewers: viewerCount,
            thumbnailUrl: thumbnailUrl || avatarUrl,
            streamUrl: `https://kick.com/${username}`,
        };
    } catch (error) {
        console.error('Kick API request failed:', error);
        return {
            isLive: false,
            platform: 'Kick',
        };
    }
}
