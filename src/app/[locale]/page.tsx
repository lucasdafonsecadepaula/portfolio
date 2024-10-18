/* eslint-disable camelcase */
import { ContactSection } from '@/src/components/ContactSection'
import { FooterSection } from '@/src/components/FooterSection'
import { Hero } from '@/src/components/Hero'
import { JobExperiencesSection } from '@/src/components/JobExperiencesSection'
import { MyStackSection } from '@/src/components/MyStackSection'
import { LeftSideBar } from '@/src/components/SideBars/LeftSide'
import { RightSideBar } from '@/src/components/SideBars/RightSide'
import { TopBar } from '@/src/components/Topbar'
import { unstable_setRequestLocale } from 'next-intl/server'

type Props = {
  params: { locale: string }
}

export default function Home({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale)

  return (
    <div className="min-h-screen w-full flex">
      <LeftSideBar />
      <div className="w-full flex flex-col">
        <TopBar />
        <div className="2xl:px-[8vw]">
          <Hero />
          <JobExperiencesSection />
          <MyStackSection />
          <ContactSection />
        </div>
        <FooterSection />
      </div>
      <RightSideBar />
    </div>
  )
}
