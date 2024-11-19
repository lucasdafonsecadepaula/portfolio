'use client'
import { motion } from 'framer-motion'
import { ArrowUp } from './components/ArrowUp'
import { TopLeftImage } from './components/TopLeftImage'
import { IconButton } from '../buttons/Icon'
import { SchoolIcon } from '../icons'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/src/i18n/routing'
import { FileText, HomeIcon, MailIcon } from 'lucide-react'

export function LeftSideBar() {
  const t = useTranslations('HomePage')

  const pathname = usePathname()

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
              <Link href="/">
                <IconButton
                  isActive={pathname === '/'}
                  tooltipText={t('LeftSideBar.Tooltip.Home')}
                >
                  <HomeIcon size={28} />
                </IconButton>
              </Link>
              <Link href="/curriculum">
                <IconButton
                  isActive={pathname === '/curriculum'}
                  tooltipText={t('LeftSideBar.Tooltip.Curriculum')}
                >
                  <FileText size={28} />
                </IconButton>
              </Link>
              <Link href="/articles">
                <IconButton
                  isActive={pathname === '/articles'}
                  tooltipText={t('LeftSideBar.Tooltip.Articles')}
                >
                  <SchoolIcon size={28} />
                </IconButton>
              </Link>

              <Link href="/#contact">
                <IconButton
                  isActive={pathname === '/#contact'}
                  tooltipText={t('LeftSideBar.Tooltip.Contact')}
                >
                  <MailIcon size={28} />
                </IconButton>
              </Link>
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
