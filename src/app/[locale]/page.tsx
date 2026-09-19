import { Hero } from '@/components/layout/hero'
import { Ticker } from '@/components/layout/ticker'
import { AboutMeSection } from '@/components/sections/about-us'
import { ContactFormSection } from '@/components/sections/contact-form'
import { ServicesSection } from '@/components/sections/services'
import { TimelineSection } from '@/components/sections/timeline'

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <AboutMeSection />
      <TimelineSection />
      <ServicesSection />
      <ContactFormSection />
    </>
  )
}
