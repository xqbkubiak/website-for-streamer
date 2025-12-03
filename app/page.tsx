import { HeroSection } from "@/components/hero-section"
import { SocialLinks } from "@/components/social-links"
import { GearSection } from "@/components/gear-section"
import { SetupSection } from "@/components/setup-section"
import { StatsSection } from "@/components/stats-section"
import { MarqueeSection } from "@/components/marquee-section"
import { Footer } from "@/components/footer"
import { getSiteConfig } from "@/lib/site-config"

export default async function Home() {
  const config = await getSiteConfig()

  return (
    <main className="min-h-screen bg-background relative noise">
      <HeroSection config={config.hero} />
      <MarqueeSection />
      <StatsSection stats={config.stats} />
      <SocialLinks socialLinks={config.socialLinks} />
      <GearSection gear={config.gear} fragrances={config.fragrances} />
      <SetupSection setup={config.setup} />
      <Footer config={config.footer} />
    </main>
  )
}
