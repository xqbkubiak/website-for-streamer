"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Heart } from "lucide-react"
import { SiTwitch } from "react-icons/si"
import { useState, useEffect } from "react"

interface FooterConfig {
  watermark: string
  heading: string
  description: string
  twitchUrl: string
  tiktokUrl: string
  copyrightName: string
}

export function Footer({ config }: { config: FooterConfig }) {


  return (
    <footer className="py-24 px-6 relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-t from-white/5 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white opacity-5 blur-[150px] rounded-full" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[15vw] font-black tracking-tighter text-foreground/[0.02] whitespace-nowrap">
          {config.watermark}
        </span>
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">
              <span className="text-gradient">{config.heading}</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {config.description}
            </p>


          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-right"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Bro</p>
            <a
              href={config.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl font-bold hover:text-[var(--neon-cyan)] transition-colors"
            >
              6zMati
            </a>
          </motion.div>
        </div>

        <div className="mt-24 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground tracking-wider font-mono flex items-center gap-2">
            © {new Date().getFullYear()} <a href="https://bkubiak.dev" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">bkubiak.dev</a>. Made with <Heart className="w-3 h-3 text-white" /> in
            Poland
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
