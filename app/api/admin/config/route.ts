import { NextResponse } from "next/server"
import { getSiteConfig, updateSiteConfig } from "@/lib/site-config"

export async function GET() {
    const config = await getSiteConfig()
    return NextResponse.json(config)
}

export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Basic validation could go here

        await updateSiteConfig(body)
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Failed to update config:", error)
        return NextResponse.json({ error: "Failed to update configuration" }, { status: 500 })
    }
}
