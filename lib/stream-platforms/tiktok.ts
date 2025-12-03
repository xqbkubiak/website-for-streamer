import { StreamStatus } from './types';

export async function getTikTokStreamStatus(username: string): Promise<StreamStatus> {
    console.log(`[TikTok] Checking status for: ${username} using scraping`);

    try {
        const url = `https://www.tiktok.com/@${username}`;

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
        });

        if (!response.ok) {
            console.error(`[TikTok] Request failed: ${response.status}`);
            return {
                isLive: false,
                platform: 'TikTok',
            };
        }

        const html = await response.text();

        // Sprawdź czy jest na żywo (szukamy w meta tagach - logika od użytkownika)
        const isLive = html.includes('"isLive":true') ||
            (html.includes('"roomId":"') && !html.includes('"roomId":""')) ||
            (html.includes('"liveRoom":{') && html.includes('"status":2'));

        console.log(`[TikTok] Is Live: ${isLive}`);

        if (!isLive) {
            return {
                isLive: false,
                platform: 'TikTok',
            };
        }

        console.log(`[TikTok] Returning LIVE status for ${username}`);
        return {
            isLive: true,
            platform: 'TikTok',
            streamUrl: `https://www.tiktok.com/@${username}/live`,
        };
    } catch (error) {
        console.error('[TikTok] Request failed:', error);
        return {
            isLive: false,
            platform: 'TikTok',
        };
    }
}
