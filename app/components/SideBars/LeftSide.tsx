'use client'
import { IconButton } from '@/app/components/buttons/Icon'
import { RocketLauchIcon, SchoolIcon } from '@/app/components/icons'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUp } from './components/ArrowUp'
import { ContactButton } from './components/ContactButton'
import { HomeButton } from './components/HomeButton'
import { TopLeftImage } from './components/TopLeftImage'

export function LeftSideBar() {
  return (
    <div className="hidden lg:block h-screen w-[15%] border-r border-primary-350 sticky top-0 bottom-0 left-0">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-col h-screen">
          <div className="h-[89px] px-10 flex justify-end items-center">
            <TopLeftImage />
          </div>

          <div className="flex-grow px-10 flex items-center justify-end">
            <div className="flex gap-8 flex-col">
              <HomeButton />
              <Link href={'/articles'}>
                <IconButton tooltipText="ARTIGOS">
                  <SchoolIcon size={28} />
                </IconButton>
              </Link>
              <Link href={'/projects'}>
                <IconButton tooltipText="PROJETOS">
                  <RocketLauchIcon size={28} />
                </IconButton>
              </Link>
              <ContactButton />
            </div>
          </div>

          <div className="h-32 px-10 flex items-center justify-end">
            <ArrowUp />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
