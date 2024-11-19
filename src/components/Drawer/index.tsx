'use client'
import profilePic from '@/src/assets/imgs/me.png'
import {
  CloseIcon,
  GithubIcon,
  HomeIcon,
  LinkedinIcon,
  MailIcon,
  MenuIcon,
  SchoolIcon,
} from '@/src/components/icons'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, type ReactNode } from 'react'
import ReactDOM from 'react-dom'
import { twMerge } from 'tailwind-merge'
import { Divider } from '../../components/Divider'
import { scrollTo } from '@/src/utils/scrollTo'
import { useTranslations } from 'next-intl'
import NextLink from 'next/link'
import { Link } from '@/src/i18n/routing'

interface DrawerContentProps {
  closeDrawer: () => void
  isClosing: boolean
}

interface CustomButtonProps {
  onClick?: () => void
  isActive: boolean
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

function CustomButton({
  children,
  isActive,
  onClick,
  variant = 'primary',
}: CustomButtonProps) {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        'w-full rounded-lg flex items-center px-4 py-6 gap-3',
        'fill-primary-700 hover:fill-primary-900 hover:text-primary-900',
        isActive ? 'fill-primary-1000 text-primary-1000 bg-primary-200' : '',
        variant === 'secondary'
          ? 'bg-primary-100 outline outline-1 outline-primary-200'
          : '',
      )}
    >
      {children}
    </button>
  )
}

const DrawerContent = ({ isClosing, closeDrawer }: DrawerContentProps) => {
  const t = useTranslations('HomePage')

  return (
    <div className="fixed inset-0 z-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isClosing ? 0 : 1 }}
        transition={{ ease: 'easeInOut', duration: 0.4 }}
        className="fixed inset-0 bg-white/5"
        onClick={closeDrawer}
      />

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isClosing ? '100%' : 0 }}
        transition={{ ease: 'easeInOut', duration: 0.4 }}
        className="fixed top-0 right-0 h-full bg-primary-50 w-[70%] shadow-lg"
      >
        <div className="p-4 flex justify-between">
          <div className="rounded-full border-[5px] border-primary-350 overflow-hidden h-16 w-16">
            <Link href="/">
              <Image src={profilePic} width={68} height={68} alt="Lucas" />
            </Link>
          </div>
          <button className="fill-white" onClick={closeDrawer}>
            <CloseIcon size={28} />
          </button>
        </div>
        <Divider />
        <div className="p-4 flex flex-col gap-2">
          <CustomButton onClick={scrollTo(0)} isActive={true}>
            <HomeIcon size={28} />
            {t('TopBar.Drawer.Home')}
          </CustomButton>

          <Link href="/articles">
            <CustomButton isActive={false}>
              <SchoolIcon size={28} />
              {t('TopBar.Drawer.Articles')}
            </CustomButton>
          </Link>

          <CustomButton onClick={scrollTo(0)} isActive={false}>
            <MailIcon size={28} />
            {t('TopBar.Drawer.Contact')}
          </CustomButton>
        </div>
        <Divider />
        <div className="p-4 flex flex-col gap-2">
          <NextLink
            href="https://github.com/lucasdafonsecadepaula"
            target="_blank"
          >
            <CustomButton
              onClick={scrollTo(0)}
              isActive={true}
              variant="secondary"
            >
              <GithubIcon size={28} />
              Github
            </CustomButton>
          </NextLink>
          <NextLink
            href="https://www.linkedin.com/in/lucas-da-fonseca-de-paula/"
            target="_blank"
          >
            <CustomButton
              onClick={scrollTo(0)}
              isActive={true}
              variant="secondary"
            >
              <LinkedinIcon size={28} />
              Linkedin
            </CustomButton>
          </NextLink>
        </div>
      </motion.div>
    </div>
  )
}

export function Drawer() {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  function openDrawer() {
    setIsOpen(true)
  }
  function closeDrawer() {
    setIsClosing(true)
    setTimeout(() => {
      setIsOpen(false)
      setIsClosing(false)
    }, 400)
  }

  return (
    <>
      <button onClick={openDrawer} className="fill-white mr-2">
        <MenuIcon size={28} />
      </button>

      {isOpen &&
        ReactDOM.createPortal(
          <DrawerContent isClosing={isClosing} closeDrawer={closeDrawer} />,
          document.body,
        )}
    </>
  )
}
