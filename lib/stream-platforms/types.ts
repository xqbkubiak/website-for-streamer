export interface StreamStatus {
    isLive: boolean;
    platform: string;
    title?: string;
    viewers?: number;
    thumbnailUrl?: string;
    streamUrl?: string;
}

export interface PlatformConfig {
    youtube?: {
        apiKey: string;
        channelId: string;
    };
    twitch?: {
        clientId: string;
        clientSecret: string;
        username: string;
    };
    kick?: {
        username: string;
    };
    tiktok?: {
        username: string;
    };
}

export interface StreamConfig {
    platform: string;
    platforms: PlatformConfig;
}
