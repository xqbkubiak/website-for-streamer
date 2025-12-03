"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Monitor, Video, Smartphone, Cpu, Gamepad, Laptop } from "lucide-react"

const defaultCategories = [
  {
    id: "pc",
    name: "PC Specs",
    icon: "Monitor",
    color: "white",
    items: [
      { label: "CPU", value: "AMD Ryzen 9 5950x" },
      { label: "GPU", value: "MSI GeForce RTX 3090 Aorus Master" },
      { label: "RAM", value: "G.Skill Flare X 64GB DDR4" },
      { label: "Cooling", value: "NZXT Kraken X73" },
      { label: "Motherboard", value: "Asus ROG Crosshair VIII Dark Hero" },
      { label: "PSU", value: "Corsair HX1200" },
    ],
  },
  {
    id: "streaming",
    name: "Streaming",
    icon: "Video",
    color: "white",
    items: [
      { label: "Camera", value: "Sony Alpha A7 III" },
      { label: "Lens", value: "Sony FE 35mm f/1.8" },
      { label: "Lighting", value: "Elgato Key Light" },
      { label: "Interface", value: "TC Helicon GO XLR MINI" },
      { label: "Stream Deck", value: "Elgato Stream Deck XL" },
      { label: "Chair", value: "Ergohuman KM11" },
    ],
  },
  {
    id: "portable",
    name: "Portable",
    icon: "Smartphone",
    color: "white",
    items: [
      { label: "Notebook", value: "MacBook Pro M2" },
      { label: "Handheld", value: "ASUS ROG Ally Z1 Extreme" },
      { label: "Projector", value: "Samsung Freestyle" },
      { label: "Speaker", value: "JBL Charge 5" },
      { label: "Router", value: "Netgear Nighthawk M1" },
      { label: "Powerbank", value: "Baseus 65W 30000mAh" },
    ],
  },
]

const getIcon = (name: string) => {
  const lower = name.toLowerCase()
  if (lower.includes("pc") || lower.includes("monitor")) return Monitor
  if (lower.includes("streaming") || lower.includes("video")) return Video
  if (lower.includes("portable") || lower.includes("phone")) return Smartphone
  if (lower.includes("gaming") || lower.includes("console")) return Gamepad
  if (lower.includes("laptop")) return Laptop
  return Cpu
}

export function SetupSection({ setup }: { setup: any[] }) {
  const [activeCategory, setActiveCategory] = useState(setup[0]?.id || "pc")


  const activeData = setup.find((c: any) => c.id === activeCategory)
  const activeItems = activeData?.items || []
  const activeColor = activeData?.color || "white"

  return (
    <section className="py-32 px-6 relative overflow-hidden">

      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10 blur-[150px] rounded-full transition-colors duration-500"
        style={{ backgroundColor: activeColor }}
      />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 glass rounded-full text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
            Setup
          </span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter">
            The <span className="text-gradient">Setup</span>
          </h2>
        </motion.div>


        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {setup.map((category: any) => {
            const Icon = getIcon(category.name)
            const isActive = activeCategory === category.id
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "relative flex items-center gap-3 px-6 py-4 rounded-full transition-all duration-300",
                  isActive ? "text-background" : "glass text-muted-foreground hover:text-foreground",
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: activeColor }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium uppercase tracking-wider">{category.name}</span>
                </span>
              </button>
            )
          })}
        </div>


        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {activeItems.map((item: any, index: number) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="group relative p-6 glass rounded-xl overflow-hidden"
              >

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ backgroundColor: activeColor }}
                />

                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-mono">{item.label}</p>
                    <div
                      className="w-2 h-2 rounded-full opacity-50 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: activeColor }}
                    />
                  </div>
                  <p className="text-lg font-semibold tracking-tight">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
