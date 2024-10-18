'use client'
import {
  AwsIcon,
  JestIcon,
  NextJsIcon,
  NodeJsIcon,
  ReactJsIcon,
  StacksIcon,
  TypescriptIcon,
} from '@/src/components/icons'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Section } from '../Section'
import { useTranslations } from 'next-intl'

interface StackWrapperProps {
  icon: ReactNode
  title: string
  body: string
  delay?: number
}

function StackWrapper({ icon, body, title, delay = 0 }: StackWrapperProps) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay }}
      viewport={{ once: true }}
      className="flex flex-col gap-4 w-full bg-primary-100 border border-primary-250 rounded-xl p-2 lg:p-[30px]"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-[60px] h-[60px] bg-[#19191a] border border-primary-350 rounded-xl p-1">
          {icon}
        </div>
        <p className="lg:text-[22px] text-[18px] font-semibold text-primary-800">
          {title}
        </p>
      </div>
      <div>
        <p className="text-[#999999] p-2">{body}</p>
      </div>
    </motion.div>
  )
}

export function MyStackSection() {
  const t = useTranslations('HomePage')

  return (
    <Section
      icon={<StacksIcon size={28} />}
      title={t('MyStackSection.title')}
      description={t('MyStackSection.subtitle')}
    >
      <div className="grid md:grid-cols-2 gap-4 p-4">
        <StackWrapper
          icon={<ReactJsIcon size={40} />}
          title="ReactJS"
          body={t('MyStackSection.reactjs')}
          delay={0}
        />
        <StackWrapper
          icon={<TypescriptIcon size={40} />}
          title="TypeScript"
          body={t('MyStackSection.typescript')}
          delay={0.1}
        />
        <StackWrapper
          icon={
            <div className="dark:invert">
              <NextJsIcon size={40} />
            </div>
          }
          title="NextJS"
          body={t('MyStackSection.nextjs')}
          delay={0.2}
        />
        <StackWrapper
          icon={<NodeJsIcon size={40} />}
          title="NodeJS"
          body={t('MyStackSection.nodejs')}
          delay={0.3}
        />
        <StackWrapper
          icon={
            <div className="bg-white rounded-lg p-1">
              <AwsIcon size={40} />
            </div>
          }
          title="AWS"
          body={t('MyStackSection.aws')}
          delay={0.4}
        />
        <StackWrapper
          icon={<JestIcon size={40} />}
          title="Jest"
          body={t('MyStackSection.jest')}
          delay={0.5}
        />
      </div>
    </Section>
  )
}
