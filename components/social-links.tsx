"use client"
import { motion } from "framer-motion"
import { Heart, ArrowUpRight, Link as LinkIcon } from "lucide-react"
import { SiTwitch, SiDiscord, SiInstagram, SiTiktok, SiYoutube, SiKick } from "react-icons/si"
import { useState, useEffect } from "react"

const defaultLinks = [
  {
    name: "Twitch",
    handle: "@NAME",
    href: "https://www.twitch.tv/NAME",
    description: "Live streams",
  },
  {
    name: "Discord",
    handle: "Community",
    href: "https://discord.com/invite/NAME",
    description: "Join the server",
  },
  {
    name: "Instagram",
    handle: "@NAME",
    href: "https://www.instagram.com/NAME/",
    description: "Behind the scenes",
  },
  {
    name: "Support",
    handle: "Tipply",
    href: "https://tipply.pl/@NAME",
    description: "Show some love",
  },
]

const getIconAndColor = (name: string) => {
  const lowerName = name.toLowerCase()
  let icon: any = LinkIcon

  if (lowerName.includes("twitch")) icon = SiTwitch
  else if (lowerName.includes("discord")) icon = SiDiscord
  else if (lowerName.includes("instagram")) icon = SiInstagram
  else if (lowerName.includes("tiktok")) icon = SiTiktok
  else if (lowerName.includes("youtube")) icon = SiYoutube
  else if (lowerName.includes("kick")) icon = SiKick
  else if (lowerName.includes("support") || lowerName.includes("tipply")) icon = Heart

  return { icon, color: "#ffffff" }
}

export function SocialLinks({ socialLinks }: { socialLinks: any[] }) {


  return (
    <section id="connect" className="py-32 px-6 relative overflow-hidden">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white opacity-5 blur-[150px] rounded-full" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 glass rounded-full text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
            Connect
          </span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter">
            Let's <span className="text-gradient">Connect</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socialLinks.map((link, index) => {
            const { icon: Icon, color } = getIconAndColor(link.name)
            return (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="group relative p-8 glass rounded-2xl overflow-hidden transition-all duration-500"
              >

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"
                  style={{ backgroundColor: color }}
                />


                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${color}40, transparent, ${color}20)`,
                    }}
                  />
                </div>

                <div className="relative flex items-start justify-between">
                  <div className="flex items-center gap-5">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                      style={{
                        backgroundColor: `${color}15`,
                        boxShadow: `0 0 0 1px ${color}30`,
                      }}
                    >
                      <Icon className="w-6 h-6 transition-colors duration-500" style={{ color: color }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold tracking-tight mb-1">{link.name}</h3>
                      <p className="text-sm text-muted-foreground">{link.description}</p>
                    </div>
                  </div>

                  <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
                </div>


                <div
                  className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
                  style={{ backgroundColor: color }}
                />
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
