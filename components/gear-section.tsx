"use client"

import { motion } from "framer-motion"
import { Mouse, Keyboard, Headphones, Mic, Sparkles, Monitor, Laptop, Gamepad } from "lucide-react"
import { useState, useEffect } from "react"

const defaultGear = [
  { category: "Mouse", name: "SteelSeries Aerox 5 Wireless" },
  { category: "Keyboard", name: "Aula F87 Pro Custom" },
  { category: "Headset", name: "SteelSeries Arctis Nova Pro Wireless" },
  { category: "Microphone", name: "SHURE SM7B" },
]

const defaultFragrances = [
  "Carolina Herrera Bad Boy",
  "Carolina Herrera Bad Boy Cobalt",
  "Armani Stronger With You",
  "Jean Paul Gaultier Le Male Elixir",
  "Armani Code Profumo",
]

const getIconForCategory = (category: string) => {
  const lower = category.toLowerCase()
  if (lower.includes("mouse")) return Mouse
  if (lower.includes("keyboard")) return Keyboard
  if (lower.includes("headset") || lower.includes("audio")) return Headphones
  if (lower.includes("mic")) return Mic
  if (lower.includes("monitor")) return Monitor
  if (lower.includes("laptop") || lower.includes("pc")) return Laptop
  if (lower.includes("gamepad") || lower.includes("controller")) return Gamepad
  return Sparkles
}

export function GearSection({ gear, fragrances }: { gear: any[]; fragrances: string[] }) {


  return (
    <section className="py-32 px-6 relative overflow-hidden">


      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 glass rounded-full text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
            Equipment
          </span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter">
            My <span className="text-gradient">Gear</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          <div>
            <div className="space-y-4">
              {gear.map((item, index) => {
                const Icon = getIconForCategory(item.category)
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ x: 8 }}
                    className="group relative p-6 glass rounded-xl overflow-hidden cursor-default"
                  >

                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative flex items-center gap-5">
                      <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">{item.category}</p>
                        <p className="text-lg font-semibold tracking-tight">{item.name}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 glass rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-8">
                <Sparkles className="w-5 h-5 text-white" />
                <h3 className="text-xl font-bold">Stream Fragrances</h3>
              </div>

              <div className="space-y-4">
                {fragrances.map((fragrance, index) => (
                  <div key={index} className="group flex items-center gap-4 cursor-default">
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono text-white bg-white/10"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                      {fragrance}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
