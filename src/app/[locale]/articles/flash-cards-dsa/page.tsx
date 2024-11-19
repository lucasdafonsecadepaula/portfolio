/* eslint-disable camelcase */
import { CardStack } from '@/src/components/CardStack'
import { FooterSection } from '@/src/components/FooterSection'
import { LeftSideBar } from '@/src/components/SideBars/LeftSide'
import { RightSideBar } from '@/src/components/SideBars/RightSide'
import { TopBar } from '@/src/components/Topbar'
import { unstable_setRequestLocale } from 'next-intl/server'
import Accordion from './clientAcordion'

type Props = {
  params: { locale: string }
}
const CARDS = [
  {
    id: 0,
    name: 'Manu Arora',
    designation: 'Senior Software Engineer',
    content: (
      <p>
        These cards are amazing, I want to use them in my project. Framer motion
        is a godsend ngl tbh fam 🙏
      </p>
    ),
  },
  {
    id: 1,
    name: 'Elon Musk',
    designation: 'Senior Shitposter',
    content: (
      <p>
        I dont like this Twitter thing, deleting it right away because yolo.
        Instead, I would like to call it X.com so that it can easily be confused
        with adult sites.
      </p>
    ),
  },
  {
    id: 2,
    name: 'Tyler Durden',
    designation: 'Manager Project Mayhem',
    content: (
      <p>
        The first rule of Fight Club is that you do not talk about fight club.
        The second rule of Fight club is that you DO NOT TALK about fight club.
      </p>
    ),
  },
]

export default function Home({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale)

  return (
    <div className="min-h-screen w-full flex">
      <LeftSideBar />

      <div className="w-full flex flex-col">
        <TopBar />
        <div className="2xl:px-[8vw] h-full flex flex-col">
          <h1 className="text-3xl font-bold py-8 pl-4">
            Flashcards - Data Structure and Algorigthm
          </h1>
          <div className="flex-grow flex items-center justify-center w-full">
            <CardStack items={CARDS} />
          </div>

          <div className="mt-auto w-full">
            <Accordion />
          </div>
        </div>
        <FooterSection />
      </div>
      <RightSideBar />
    </div>
  )
}
