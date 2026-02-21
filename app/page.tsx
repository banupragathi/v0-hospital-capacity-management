import { LandingNav } from "@/components/landing/landing-nav"
import { HeroVideo } from "@/components/landing/hero-video"
import { WhoWeAre } from "@/components/landing/who-we-are"
import { OurMission } from "@/components/landing/our-mission"
import { HowWeWork } from "@/components/landing/how-we-work"
import { LandingFooter } from "@/components/landing/landing-footer"

export default function LandingPage() {
  return (
    <main>
      <LandingNav />
      <HeroVideo />
      <WhoWeAre />
      <OurMission />
      <HowWeWork />
      <LandingFooter />
    </main>
  )
}
