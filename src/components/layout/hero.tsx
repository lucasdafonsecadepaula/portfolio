'use client'
import { cn } from '@/lib/utils'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { Underline } from '../ui/underline'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const fadeInRight = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
}

const AnimatedTitle = () => {
  const t = useTranslations('Hero')
  return (
    <motion.h1
      className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl tracking-wide"
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.8 }}
    >
      {t('title')}{' '}
      <span className="relative inline-block">
        {t('title-last-word')}
        <span className="absolute inset-x-0 bottom-1/2 z-[-1]">
          <Underline />
        </span>
      </span>
    </motion.h1>
  )
}

const AnimatedDescription = () => {
  const t = useTranslations('Hero')
  return (
    <motion.p
      className="mt-6 md:mt-8 text-base md:text-lg leading-7 md:leading-8 text-muted-foreground tracking-normal"
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {t('description')}
    </motion.p>
  )
}

const ActionButtons = () => {
  const t = useTranslations('Hero')
  return (
    <motion.div
      className="mt-10 md:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-x-6"
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <Link
        href="#contact"
        className="apple-button w-full sm:w-auto text-center px-5 py-3"
      >
        {t('getInTouch')}
      </Link>
      <Link
        href="#about"
        className="text-sm font-semibold leading-6 text-foreground hover:text-opacity-80 transition-colors"
      >
        {t('learnMore')}{' '}
        <span aria-hidden="true" className="ml-1">
          →
        </span>
      </Link>
    </motion.div>
  )
}

const CompanyLogos = () => {
  const logos = [
    {
      url: 'arch-logo-2.png',
      style: 'invert scale-75 translate-y-1 hover:scale-90',
    },
    {
      url: 'axis-logo-2.png',
      style: 'invert scale-90 translate-y-1 hover:scale-105',
    },
    {
      url: 'kosen-logo-2.png',
      style: 'scale-110 -translate-y-1 hover:scale-135',
    },
    {
      url: 'smart-logo-2.png',
      style: 'scale-110 -translate-y-1 hover:scale-135',
    },
    {
      url: 'versatus-logo-2.png',
      style: 'scale-110 -translate-y-1 hover:scale-135',
    },
  ]

  return (
    <motion.div
      className="mt-12 md:mt-16"
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <p className="text-sm text-muted-foreground">Trusted by</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center h-16 w-full relative"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={`/${logo.url}`}
                alt={`${logo.url.split('-')[0]} logo`}
                width={120}
                height={40}
                className={cn(
                  'max-h-8 w-auto object-contain opacity-70 hover:opacity-100 transition-all duration-300',
                  logo.style,
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

const HeroContent = () => {
  return (
    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg lg:flex-shrink-0">
      <AnimatedTitle />
      <AnimatedDescription />
      <ActionButtons />
      <CompanyLogos />
    </div>
  )
}

const HeroImage = () => {
  return (
    <motion.div
      className="mx-auto mt-12 md:mt-16 lg:mt-0"
      variants={fadeInRight}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <div className="relative hidden lg:block">
        <Image
          src="/profile-image.png"
          alt="Developer profile"
          width={600}
          height={600}
          className="w-full max-w-[500px] rounded-2xl shadow-xl ring-1 ring-gray-900/10 hidden"
        />
        <DotLottieReact
          width={600}
          height={600}
          src="/hero.lottie"
          loop
          autoplay
        />
      </div>
    </motion.div>
  )
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-background font-cuprum">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
        <HeroContent />
        <HeroImage />
      </div>
    </section>
  )
}
