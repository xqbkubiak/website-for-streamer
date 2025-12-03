import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

const CONFIG_PATH = path.join(process.cwd(), "stream-config.json")

export async function GET() {
    try {
        const data = await fs.readFile(CONFIG_PATH, "utf-8")
        const config = JSON.parse(data)
        return NextResponse.json(config)
    } catch (error) {
        console.error("Error reading stream config:", error)
        return NextResponse.json({ error: "Failed to read configuration" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Basic validation could go here

        await fs.writeFile(CONFIG_PATH, JSON.stringify(body, null, 4), "utf-8")
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Failed to update stream config:", error)
        return NextResponse.json({ error: "Failed to update configuration" }, { status: 500 })
    }
}
