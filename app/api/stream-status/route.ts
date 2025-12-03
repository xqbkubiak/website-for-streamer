import { NextResponse } from 'next/server';
import { StreamStatus, StreamConfig } from '@/lib/stream-platforms/types';
import { getYouTubeStreamStatus } from '@/lib/stream-platforms/youtube';
import { streamStatusCache } from '@/lib/stream-platforms/cache';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

function loadConfig(): StreamConfig | null {
    try {
        const configPath = path.join(process.cwd(), 'stream-config.json');
        const configFile = fs.readFileSync(configPath, 'utf-8');
        return JSON.parse(configFile) as StreamConfig;
    } catch (error) {
        console.error('Failed to load stream-config.json:', error);
        return null;
    }
}

export async function GET() {
    try {
        const config = loadConfig();

        if (!config) {
            return NextResponse.json(
                { error: 'Configuration file not found' },
                { status: 500 }
            );
        }

        // If no platform is selected, return offline status
        if (!config.platform) {
            return NextResponse.json<StreamStatus>({
                isLive: false,
                platform: 'None',
            });
        }

        // Check cache first
        const cacheKey = `stream-status-${config.platform}`;
        const cachedStatus = streamStatusCache.get<StreamStatus>(cacheKey);

        if (cachedStatus) {
            return NextResponse.json(cachedStatus);
        }

        let status: StreamStatus = {
            isLive: false,
            platform: config.platform,
        };

        // Check selected platform
        switch (config.platform.toLowerCase()) {
            case 'youtube':
                const youtubeConfig = config.platforms.youtube;
                if (youtubeConfig && youtubeConfig.apiKey && youtubeConfig.channelId) {
                    status = await getYouTubeStreamStatus(
                        youtubeConfig.apiKey,
                        youtubeConfig.channelId
                    );
                } else {
                    return NextResponse.json(
                        { error: 'YouTube not configured properly' },
                        { status: 400 }
                    );
                }
                break;

            case 'twitch':
                // TODO: Implement Twitch later
                return NextResponse.json(
                    { error: 'Twitch integration coming soon' },
                    { status: 501 }
                );

            case 'kick':
                const kickConfig = config.platforms.kick;
                if (kickConfig && kickConfig.username) {
                    const { getKickStreamStatus } = await import('@/lib/stream-platforms/kick');
                    status = await getKickStreamStatus(kickConfig.username);
                } else {
                    return NextResponse.json(
                        { error: 'Kick not configured properly' },
                        { status: 400 }
                    );
                }
                break;

            case 'tiktok':
                const tiktokConfig = config.platforms.tiktok;
                if (tiktokConfig && tiktokConfig.username) {
                    const { getTikTokStreamStatus } = await import('@/lib/stream-platforms/tiktok');
                    status = await getTikTokStreamStatus(tiktokConfig.username);
                } else {
                    return NextResponse.json(
                        { error: 'TikTok not configured properly' },
                        { status: 400 }
                    );
                }
                break;

            default:
                return NextResponse.json(
                    { error: 'Unknown platform' },
                    { status: 400 }
                );
        }

        // Cache the result
        streamStatusCache.set(cacheKey, status);

        console.log(`[API] Returning status for ${config.platform}:`, status);
        return NextResponse.json(status);
    } catch (error) {
        console.error('Stream status API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
