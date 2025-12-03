"use client"

const words = ["GAMING", "STREAMING", "COMMUNITY", "ENTERTAINMENT", "LIVE", "TWITCH", "CONTENT", "VIBES"]

export function MarqueeSection() {
  return (
    <section className="py-6 overflow-hidden relative">

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
      <div className="flex animate-marquee">
        {[...words, ...words, ...words, ...words].map((word, index) => (
          <span
            key={index}
            className="text-5xl md:text-7xl font-black tracking-tighter whitespace-nowrap mx-6 text-transparent bg-clip-text bg-gradient-to-r from-muted-foreground/20 via-muted-foreground/40 to-muted-foreground/20"
          >
            {word}
            <span className="text-white opacity-20 ml-6">•</span>
          </span>
        ))}
      </div>


      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
    </section>
  )
}
