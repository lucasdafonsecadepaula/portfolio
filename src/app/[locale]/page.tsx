import { Hero } from '@/components/layout/hero'
import { AboutMeSection } from '@/components/sections/about-us'
import { ContactFormSection } from '@/components/sections/contact-form'
import { FigmaPortfolioSection } from '@/components/sections/figma-portfolio'
import { ServicesSection } from '@/components/sections/services'
import { TimelineSection } from '@/components/sections/timeline'
import { Marquee } from '@/components/ui/marquee'

export default function Home() {
  return (
    <>
      <Hero />
      <AboutMeSection />
      <TimelineSection />
      <ServicesSection />
      <FigmaPortfolioSection />
      <Marquee />
      <ContactFormSection />
    </>
  )
}
