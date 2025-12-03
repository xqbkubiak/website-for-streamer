import fs from "fs/promises"
import path from "path"

const CONFIG_PATH = path.join(process.cwd(), "site-config.json")

export interface SiteConfig {
    metadata: {
        title: string
        description: string
    }
    hero: {
        titlePart1: string
        titlePart2: string
        tagline: string
        streamUrl: string
    }
    footer: {
        watermark: string
        heading: string
        description: string
        twitchUrl: string
        tiktokUrl: string
        copyrightName: string
    }
    stats: Array<{
        value: number
        suffix: string
        label: string
    }>
    socialLinks: Array<{
        name: string
        handle: string
        href: string
        description: string
    }>
    gear: Array<{
        category: string
        name: string
    }>
    fragrances: string[]
    setup: Array<{
        id: string
        name: string
        color: string
        items: Array<{
            label: string
            value: string
        }>
    }>
}

export async function getSiteConfig(): Promise<SiteConfig> {
    try {
        const data = await fs.readFile(CONFIG_PATH, "utf-8")
        return JSON.parse(data)
    } catch (error) {
        console.error("Error reading site config:", error)
        // Return default fallback if file fails
        return {
            metadata: {
                title: "NAME | Streamer",
                description: "Polish content creator and streamer",
            },
            hero: {
                titlePart1: "NAME",
                titlePart2: "",
                tagline: "Content Creator & Streamer from Poland",
                streamUrl: "https://www.twitch.tv/NAME",
            },
            footer: {
                watermark: "NAME",
                heading: "NAME",
                description: "Content Creator & Streamer from Poland. Building a community of gaming enthusiasts and good vibes.",
                twitchUrl: "https://www.twitch.tv/NAME",
                tiktokUrl: "https://www.tiktok.com/@NAME",
                copyrightName: "NAME",
            },
            stats: [],
            socialLinks: [],
            gear: [],
            fragrances: [],
            setup: [],
        }
    }
}

export async function updateSiteConfig(newConfig: SiteConfig): Promise<void> {
    await fs.writeFile(CONFIG_PATH, JSON.stringify(newConfig, null, 2), "utf-8")
}
