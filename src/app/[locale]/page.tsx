/* eslint-disable camelcase */
import { ContactSection } from '@/src/components/ContactSection'
import { Hero } from '@/src/components/Hero'
import { JobExperiencesSection } from '@/src/components/JobExperiencesSection'
import { MyStackSection } from '@/src/components/MyStackSection'
import { TimelineSection } from '@/src/components/TimelineSection'
import { unstable_setRequestLocale } from 'next-intl/server'

type Props = {
  params: { locale: string }
}

export default function Home({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale)

  return (
    <div className="2xl:px-[8vw]">
      <Hero />
      <div className="overflow-y-hidden">
        <TimelineSection />
      </div>
      <JobExperiencesSection />
      <MyStackSection />
      <ContactSection />
    </div>
  )
}
