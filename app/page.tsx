'use client'
import { ContactSection } from './components/ContactSection'
import { FooterSection } from './components/FooterSection'
import { Hero } from './components/Hero'
import { JobExperiencesSection } from './components/JobExperiencesSection'
import { MyStackSection } from './components/MyStackSection'
import { LeftSideBar } from './components/SideBars/LeftSide'
import { RightSideBar } from './components/SideBars/RightSide'
import { TopBar } from './components/Topbar'

export default function Home() {
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
