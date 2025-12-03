"use client"
import { motion, useInView, useMotionTemplate, useMotionValue } from "framer-motion"
import { useRef, useEffect, useState, MouseEvent } from "react"

const defaultAccentColors = [
  "from-white to-gray-400",
  "from-gray-200 to-gray-500",
  "from-gray-300 to-gray-600",
  "from-white to-gray-300",
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView) {
      let start = 0
      const end = value
      const duration = 2000
      const increment = end / (duration / 16)

      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setDisplayValue(end)
          clearInterval(timer)
        } else {
          setDisplayValue(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  )
}

function StatCard({ stat, index }: { stat: any; index: number }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group rounded-2xl border border-white/10 bg-[#12121a]/80 backdrop-blur-sm overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
        }}
      />


      <div className="relative p-6 md:p-8">

        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-10 h-1 rounded-b-full bg-gradient-to-r ${stat.accentColor}`}
        />


        <div className="text-3xl md:text-5xl font-black tracking-tight text-white text-center mb-2">
          <AnimatedNumber value={stat.value} suffix={stat.suffix} />
        </div>


        <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-500 text-center group-hover:text-gray-300 transition-colors">
          {stat.label}
        </p>
      </div>
    </motion.div>
  )
}

export function StatsSection({ stats }: { stats: any[] }) {
  const mergedStats = stats.map((stat, index) => ({
    ...stat,
    accentColor: defaultAccentColors[index % defaultAccentColors.length]
  }))

  return (
    <section className="py-20 px-6 relative overflow-hidden bg-gradient-to-b from-[#0a0a0f] via-[#0d0d14] to-[#0a0a0f]">
      <div className="max-w-6xl mx-auto relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {mergedStats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
