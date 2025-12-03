"use client"

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { ArrowDown, Play } from "lucide-react"
import { useStreamStatus } from "@/hooks/use-stream-status"

interface HeroConfig {
  titlePart1: string
  titlePart2: string
  tagline: string
  streamUrl: string
}

export function HeroSection({ config }: { config: HeroConfig }) {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])


  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 })


  const { status, loading } = useStreamStatus(60000) // Poll every 60 seconds

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      mouseX.set((clientX - innerWidth / 2) / 20)
      mouseY.set((clientY - innerHeight / 2) / 20)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise"
    >

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ x: smoothMouseX, y: smoothMouseY }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full mix-blend-screen"
        />
        <motion.div
          style={{ x: smoothMouseX, y: smoothMouseY }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gray-500/10 blur-[100px] rounded-full mix-blend-screen"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] blur-[120px] rounded-full" />
      </div>


      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="absolute top-20 right-20 w-3 h-3 rounded-full bg-white/20 blur-[2px]" />
      <div className="absolute bottom-32 left-32 w-2 h-2 rounded-full bg-white/10 blur-[1px]" />
      <div className="absolute top-1/3 left-20 w-4 h-4 rounded-full bg-white/5 blur-sm" />


      <motion.div style={{ y, opacity, scale }} className="relative z-10 text-center px-6">

        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-10"
          >
            <span className="inline-flex items-center gap-3 px-5 py-2.5 glass rounded-full text-sm border border-white/5 bg-white/5 backdrop-blur-md shadow-xl shadow-black/20">
              {status?.isLive ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                  </span>
                  <span className="text-gray-200 font-medium">
                    Live on {status.platform}
                    {status.viewers && ` · ${status.viewers.toLocaleString()} viewers`}
                  </span>
                </>
              ) : (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                  </span>
                  <span className="text-gray-400">Offline</span>
                </>
              )}
            </span>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-6"
        >
          <h1 className="text-8xl md:text-[12rem] font-black tracking-tighter leading-none select-none">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-100 to-gray-500 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              {config.titlePart1}
              {config.titlePart2}
            </span>
          </h1>
        </motion.div>


        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-gray-400 mb-12 font-light max-w-lg mx-auto"
        >
          {config.tagline}
        </motion.p>


        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={status?.isLive && status.streamUrl ? status.streamUrl : config.streamUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 font-semibold text-white transition-all hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Play className="w-4 h-4 fill-current" />
              Watch Stream
            </span>
          </a>
          <a href="#connect" className="px-8 py-4 rounded-full glass hover:bg-white/10 transition-all font-medium">
            Connect
          </a>
        </div>
      </motion.div>


      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  )
}
