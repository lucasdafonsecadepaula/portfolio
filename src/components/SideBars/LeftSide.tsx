'use client'
import { motion } from 'framer-motion'
import { ArrowUp } from './components/ArrowUp'
import { ContactButton } from './components/ContactButton'
import { HomeButton } from './components/HomeButton'
import { TopLeftImage } from './components/TopLeftImage'
import { IconButton } from '../buttons/Icon'
import { RocketLauchIcon, SchoolIcon } from '../icons'
import { useTranslations } from 'next-intl'
import { Link } from '@/src/i18n/routing'

export function LeftSideBar() {
  const t = useTranslations('HomePage')

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
              <HomeButton tooltipText={t('LeftSideBar.Tooltip.Home')} />
              <Link href="/articles">
                <IconButton tooltipText={t('LeftSideBar.Tooltip.Articles')}>
                  <SchoolIcon size={28} />
                </IconButton>
              </Link>
              <Link href="/projects">
                <IconButton tooltipText={t('LeftSideBar.Tooltip.Projects')}>
                  <RocketLauchIcon size={28} />
                </IconButton>
              </Link>
              <ContactButton tooltipText={t('LeftSideBar.Tooltip.Contact')} />
            </div>
          </div>

          <div className="h-32 px-10 flex items-center justify-end">
            <ArrowUp tooltipText={t('LeftSideBar.Tooltip.GoBack')} />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
