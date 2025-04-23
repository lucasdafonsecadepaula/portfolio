'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
}

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
}

const SectionTitle = () => {
  const t = useTranslations('About')
  return (
    <motion.h2
      className="text-4xl sm:text-5xl font-black mb-10 sm:mb-12 text-center text-white"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.8 }}
    >
      {t('title')}
    </motion.h2>
  )
}

const ProfileImage = () => {
  return (
    <motion.div
      className="relative mx-auto mb-8 md:mb-0 max-w-md"
      variants={fadeInLeft}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <Image
        src="/profile-image.png"
        alt="Lucas de Paula profile photo"
        width={480}
        height={480}
        className="w-full rounded-3xl shadow-lg p-4"
      />
    </motion.div>
  )
}

const BioContent = () => {
  const t = useTranslations('About')
  const paragraphs = t.raw('bio')

  return (
    <motion.div
      variants={fadeInRight}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.8 }}
    >
      <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
        {t('subtitle')}
      </h3>
      {paragraphs.map((paragraph: string, index: number) => (
        <p
          key={index}
          className={`text-gray-300 ${
            index < paragraphs.length - 1 ? 'mb-4' : ''
          }`}
        >
          {paragraph}
        </p>
      ))}
    </motion.div>
  )
}

export function AboutMeSection() {
  return (
    <section
      id="about"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-foreground"
    >
      <div className="container mx-auto max-w-6xl">
        <SectionTitle />

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <ProfileImage />
          </div>
          <div>
            <BioContent />
          </div>
        </div>
      </div>
    </section>
  )
}
