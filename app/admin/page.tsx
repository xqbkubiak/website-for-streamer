"use client"
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Save, Lock, Loader2 } from "lucide-react"

interface SiteConfig {
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
    stats: Array<{ value: number; suffix: string; label: string }>
    socialLinks: Array<{ name: string; handle: string; href: string; description: string }>
    gear: Array<{ category: string; name: string }>
    fragrances: string[]
    setup: Array<{
        id: string
        name: string
        color: string
        items: Array<{ label: string; value: string }>
    }>
}

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState("")
    const [config, setConfig] = useState<SiteConfig | null>(null)
    const [streamConfig, setStreamConfig] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState("")


    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (password === "admin123") {
            setIsAuthenticated(true)
            fetchConfig()
        } else {
            setMessage("Invalid password")
        }
    }

    const fetchConfig = async () => {
        try {
            const [siteRes, streamRes] = await Promise.all([
                fetch("/api/admin/config"),
                fetch("/api/admin/stream-config")
            ])

            const siteData = await siteRes.json()
            const streamData = await streamRes.json()

            setConfig(siteData)
            setStreamConfig(streamData)
            setLoading(false)
        } catch (error) {
            console.error("Failed to load config", error)
            setMessage("Failed to load configuration")
        }
    }

    const handleSave = async () => {
        if (!config || !streamConfig) return
        setSaving(true)
        setMessage("")

        try {
            const [siteRes, streamRes] = await Promise.all([
                fetch("/api/admin/config", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(config),
                }),
                fetch("/api/admin/stream-config", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(streamConfig),
                })
            ])

            if (siteRes.ok && streamRes.ok) {
                setMessage("Configuration saved successfully!")
            } else {
                setMessage("Failed to save configuration")
            }
        } catch (error) {
            console.error("Failed to save", error)
            setMessage("Error saving configuration")
        } finally {
            setSaving(false)
        }
    }

    const updateConfig = (section: keyof SiteConfig, key: string, value: string) => {
        if (!config) return
        setConfig({
            ...config,
            [section]: {
                ...config[section],
                [key]: value,
            },
        })
    }

    const updateStreamConfig = (section: string, key: string, value: any) => {
        if (!streamConfig) return

        if (section === "root") {
            setStreamConfig({ ...streamConfig, [key]: value })
        } else {
            setStreamConfig({
                ...streamConfig,
                platforms: {
                    ...streamConfig.platforms,
                    [section]: {
                        ...streamConfig.platforms[section],
                        [key]: value
                    }
                }
            })
        }
    }


    const updateArrayItem = (section: keyof SiteConfig, index: number, field: string, value: any) => {
        if (!config) return
        const newArray = [...(config[section] as any[])]
        if (typeof newArray[index] === 'object' && newArray[index] !== null) {
            newArray[index] = { ...newArray[index], [field]: value }
        } else {
            newArray[index] = value
        }
        setConfig({ ...config, [section]: newArray })
    }


    const updateSetupItem = (categoryIndex: number, itemIndex: number, field: string, value: string) => {
        if (!config) return
        const newSetup = [...config.setup]
        newSetup[categoryIndex].items[itemIndex] = { ...newSetup[categoryIndex].items[itemIndex], [field]: value }
        setConfig({ ...config, setup: newSetup })
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-4">
                <div className="w-full max-w-md p-8 rounded-2xl border border-border bg-card">
                    <div className="flex justify-center mb-6">
                        <div className="p-3 rounded-full bg-primary/10">
                            <Lock className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-center mb-6">Admin Access</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                className="w-full px-4 py-2 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        {message && <p className="text-red-500 text-sm text-center">{message}</p>}
                        <button
                            type="submit"
                            className="w-full py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    if (loading || !config || !streamConfig) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">Site Configuration</h1>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Changes
                    </button>
                </div>

                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-lg mb-6 ${message.includes("success") ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                            }`}
                    >
                        {message}
                    </motion.div>
                )}

                <div className="space-y-8">

                    <section className="p-6 rounded-2xl border border-border bg-card">
                        <h2 className="text-xl font-semibold mb-4">Stream Configuration</h2>
                        <div className="grid gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-muted-foreground">Active Platform</label>
                                <select
                                    value={streamConfig.platform || ""}
                                    onChange={(e) => updateStreamConfig("root", "platform", e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="">None (Offline)</option>
                                    <option value="twitch">Twitch</option>
                                    <option value="youtube">YouTube</option>
                                    <option value="kick">Kick</option>
                                    <option value="tiktok">TikTok</option>
                                </select>
                            </div>

                            <div className="border-t border-border/50 pt-4 mt-2">
                                <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Platform Settings</h3>


                                <div className="mb-4 p-4 rounded-lg bg-background/50 border border-border/50">
                                    <h4 className="font-medium mb-2">YouTube</h4>
                                    <div className="grid gap-3">
                                        <div>
                                            <label className="block text-xs mb-1 text-muted-foreground">API Key</label>
                                            <input
                                                type="text"
                                                value={streamConfig.platforms?.youtube?.apiKey || ""}
                                                onChange={(e) => updateStreamConfig("youtube", "apiKey", e.target.value)}
                                                className="w-full px-3 py-1.5 rounded bg-input border border-border text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs mb-1 text-muted-foreground">Channel ID</label>
                                            <input
                                                type="text"
                                                value={streamConfig.platforms?.youtube?.channelId || ""}
                                                onChange={(e) => updateStreamConfig("youtube", "channelId", e.target.value)}
                                                className="w-full px-3 py-1.5 rounded bg-input border border-border text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>


                                <div className="mb-4 p-4 rounded-lg bg-background/50 border border-border/50">
                                    <h4 className="font-medium mb-2">Twitch</h4>
                                    <div className="grid gap-3">
                                        <div>
                                            <label className="block text-xs mb-1 text-muted-foreground">Username</label>
                                            <input
                                                type="text"
                                                value={streamConfig.platforms?.twitch?.username || ""}
                                                onChange={(e) => updateStreamConfig("twitch", "username", e.target.value)}
                                                className="w-full px-3 py-1.5 rounded bg-input border border-border text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs mb-1 text-muted-foreground">Client ID</label>
                                            <input
                                                type="text"
                                                value={streamConfig.platforms?.twitch?.clientId || ""}
                                                onChange={(e) => updateStreamConfig("twitch", "clientId", e.target.value)}
                                                className="w-full px-3 py-1.5 rounded bg-input border border-border text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs mb-1 text-muted-foreground">Client Secret</label>
                                            <input
                                                type="password"
                                                value={streamConfig.platforms?.twitch?.clientSecret || ""}
                                                onChange={(e) => updateStreamConfig("twitch", "clientSecret", e.target.value)}
                                                className="w-full px-3 py-1.5 rounded bg-input border border-border text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>


                                <div className="mb-4 p-4 rounded-lg bg-background/50 border border-border/50">
                                    <h4 className="font-medium mb-2">Kick</h4>
                                    <div className="grid gap-3">
                                        <div>
                                            <label className="block text-xs mb-1 text-muted-foreground">Username</label>
                                            <input
                                                type="text"
                                                value={streamConfig.platforms?.kick?.username || ""}
                                                onChange={(e) => updateStreamConfig("kick", "username", e.target.value)}
                                                className="w-full px-3 py-1.5 rounded bg-input border border-border text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>


                                <div className="p-4 rounded-lg bg-background/50 border border-border/50">
                                    <h4 className="font-medium mb-2">TikTok</h4>
                                    <div className="grid gap-3">
                                        <div>
                                            <label className="block text-xs mb-1 text-muted-foreground">Username</label>
                                            <input
                                                type="text"
                                                value={streamConfig.platforms?.tiktok?.username || ""}
                                                onChange={(e) => updateStreamConfig("tiktok", "username", e.target.value)}
                                                className="w-full px-3 py-1.5 rounded bg-input border border-border text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    <section className="p-6 rounded-2xl border border-border bg-card">
                        <h2 className="text-xl font-semibold mb-4">Metadata (SEO)</h2>
                        <div className="grid gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-muted-foreground">Page Title</label>
                                <input
                                    type="text"
                                    value={config.metadata.title}
                                    onChange={(e) => updateConfig("metadata", "title", e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-muted-foreground">Description</label>
                                <input
                                    type="text"
                                    value={config.metadata.description}
                                    onChange={(e) => updateConfig("metadata", "description", e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                        </div>
                    </section>


                    <section className="p-6 rounded-2xl border border-border bg-card">
                        <h2 className="text-xl font-semibold mb-4">Hero Section</h2>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-muted-foreground">Title Part 1 (Gradient)</label>
                                    <input
                                        type="text"
                                        value={config.hero.titlePart1}
                                        onChange={(e) => updateConfig("hero", "titlePart1", e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-muted-foreground">Title Part 2 (Solid)</label>
                                    <input
                                        type="text"
                                        value={config.hero.titlePart2}
                                        onChange={(e) => updateConfig("hero", "titlePart2", e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-muted-foreground">Tagline</label>
                                <input
                                    type="text"
                                    value={config.hero.tagline}
                                    onChange={(e) => updateConfig("hero", "tagline", e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                        </div>
                    </section>


                    <section className="p-6 rounded-2xl border border-border bg-card">
                        <h2 className="text-xl font-semibold mb-4">Footer Section</h2>
                        <div className="grid gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-muted-foreground">Watermark Text (Big Background)</label>
                                <input
                                    type="text"
                                    value={config.footer.watermark}
                                    onChange={(e) => updateConfig("footer", "watermark", e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-muted-foreground">Footer Heading</label>
                                <input
                                    type="text"
                                    value={config.footer.heading}
                                    onChange={(e) => updateConfig("footer", "heading", e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-muted-foreground">Description</label>
                                <textarea
                                    value={config.footer.description}
                                    onChange={(e) => updateConfig("footer", "description", e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary h-24"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-muted-foreground">Twitch URL</label>
                                    <input
                                        type="text"
                                        value={config.footer.twitchUrl}
                                        onChange={(e) => updateConfig("footer", "twitchUrl", e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-muted-foreground">TikTok URL</label>
                                    <input
                                        type="text"
                                        value={config.footer.tiktokUrl}
                                        onChange={(e) => updateConfig("footer", "tiktokUrl", e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-muted-foreground">Copyright Name</label>
                                <input
                                    type="text"
                                    value={config.footer.copyrightName}
                                    onChange={(e) => updateConfig("footer", "copyrightName", e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                        </div>
                    </section>


                    <section className="p-6 rounded-2xl border border-border bg-card">
                        <h2 className="text-xl font-semibold mb-4">Stats Section</h2>
                        <div className="grid gap-4">
                            {config.stats.map((stat, index) => (
                                <div key={index} className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-background/50 border border-border/50">
                                    <div>
                                        <label className="block text-xs mb-1 text-muted-foreground">Value</label>
                                        <input
                                            type="number"
                                            value={stat.value}
                                            onChange={(e) => updateArrayItem("stats", index, "value", Number(e.target.value))}
                                            className="w-full px-3 py-1.5 rounded bg-input border border-border text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs mb-1 text-muted-foreground">Suffix</label>
                                        <input
                                            type="text"
                                            value={stat.suffix}
                                            onChange={(e) => updateArrayItem("stats", index, "suffix", e.target.value)}
                                            className="w-full px-3 py-1.5 rounded bg-input border border-border text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs mb-1 text-muted-foreground">Label</label>
                                        <input
                                            type="text"
                                            value={stat.label}
                                            onChange={(e) => updateArrayItem("stats", index, "label", e.target.value)}
                                            className="w-full px-3 py-1.5 rounded bg-input border border-border text-sm"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>


                    <section className="p-6 rounded-2xl border border-border bg-card">
                        <h2 className="text-xl font-semibold mb-4">Social Links (Let's Connect)</h2>
                        <div className="grid gap-4">
                            {config.socialLinks.map((link, index) => (
                                <div key={index} className="p-4 rounded-lg bg-background/50 border border-border/50">
                                    <div className="grid grid-cols-2 gap-4 mb-2">
                                        <div>
                                            <label className="block text-xs mb-1 text-muted-foreground">Name</label>
                                            <input
                                                type="text"
                                                value={link.name}
                                                onChange={(e) => updateArrayItem("socialLinks", index, "name", e.target.value)}
                                                className="w-full px-3 py-1.5 rounded bg-input border border-border text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs mb-1 text-muted-foreground">Handle</label>
                                            <input
                                                type="text"
                                                value={link.handle}
                                                onChange={(e) => updateArrayItem("socialLinks", index, "handle", e.target.value)}
                                                className="w-full px-3 py-1.5 rounded bg-input border border-border text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs mb-1 text-muted-foreground">URL</label>
                                            <input
                                                type="text"
                                                value={link.href}
                                                onChange={(e) => updateArrayItem("socialLinks", index, "href", e.target.value)}
                                                className="w-full px-3 py-1.5 rounded bg-input border border-border text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs mb-1 text-muted-foreground">Description</label>
                                            <input
                                                type="text"
                                                value={link.description}
                                                onChange={(e) => updateArrayItem("socialLinks", index, "description", e.target.value)}
                                                className="w-full px-3 py-1.5 rounded bg-input border border-border text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>


                    <section className="p-6 rounded-2xl border border-border bg-card">
                        <h2 className="text-xl font-semibold mb-4">My Gear</h2>
                        <div className="grid gap-4">
                            {config.gear.map((item, index) => (
                                <div key={index} className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-background/50 border border-border/50">
                                    <div>
                                        <label className="block text-xs mb-1 text-muted-foreground">Category</label>
                                        <input
                                            type="text"
                                            value={item.category}
                                            onChange={(e) => updateArrayItem("gear", index, "category", e.target.value)}
                                            className="w-full px-3 py-1.5 rounded bg-input border border-border text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs mb-1 text-muted-foreground">Name</label>
                                        <input
                                            type="text"
                                            value={item.name}
                                            onChange={(e) => updateArrayItem("gear", index, "name", e.target.value)}
                                            className="w-full px-3 py-1.5 rounded bg-input border border-border text-sm"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h3 className="text-lg font-semibold mt-6 mb-3">Fragrances</h3>
                        <div className="grid gap-2">
                            {config.fragrances.map((fragrance, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        value={fragrance}
                                        onChange={(e) => updateArrayItem("fragrances", index, "", e.target.value)}
                                        className="w-full px-3 py-1.5 rounded bg-input border border-border text-sm"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>


                    <section className="p-6 rounded-2xl border border-border bg-card">
                        <h2 className="text-xl font-semibold mb-4">The Setup</h2>
                        <div className="space-y-6">
                            {config.setup.map((category, catIndex) => (
                                <div key={category.id} className="p-4 rounded-lg bg-background/50 border border-border/50">
                                    <h3 className="font-medium mb-3 text-primary">{category.name}</h3>
                                    <div className="grid gap-3">
                                        {category.items.map((item, itemIndex) => (
                                            <div key={itemIndex} className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs mb-1 text-muted-foreground">Label</label>
                                                    <input
                                                        type="text"
                                                        value={item.label}
                                                        onChange={(e) => updateSetupItem(catIndex, itemIndex, "label", e.target.value)}
                                                        className="w-full px-3 py-1.5 rounded bg-input border border-border text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs mb-1 text-muted-foreground">Value</label>
                                                    <input
                                                        type="text"
                                                        value={item.value}
                                                        onChange={(e) => updateSetupItem(catIndex, itemIndex, "value", e.target.value)}
                                                        className="w-full px-3 py-1.5 rounded bg-input border border-border text-sm"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </div>
        </div>
    )
}
