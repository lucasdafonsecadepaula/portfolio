'use client'
import archofficeLogo from '@/src/assets/imgs/archoffice.png'
import smartNxLogo from '@/src/assets/imgs/smart-nx.png'
import { BusinessCenterIcon } from '@/src/components/icons'
import { motion } from 'framer-motion'
import Image from 'next/image'
import type { ReactNode } from 'react'
import { Section } from '../Section'
import { useTranslations } from 'next-intl'

interface JobWrapperProps {
  companyLogo: ReactNode
  companyName: string
  companyTextUrl: string
  companyUrl: string
  companyMainFunction: string
  companyDate: string
  children?: ReactNode
}

interface JobFunctionProps {
  title: string
  body: ReactNode
}

function JobFunction({ body, title }: JobFunctionProps) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="p-4 bg-[#050505] rounded-xl border border-primary-250"
    >
      <p className="font-semibold text-primary-800 text-[18px]">{title}</p>
      <div className="pt-2 text-primary-700 text-[17px]">{body}</div>
    </motion.div>
  )
}

function JobWrapper({
  companyLogo,
  companyDate,
  companyMainFunction,
  companyName,
  companyTextUrl,
  companyUrl,
  children,
}: JobWrapperProps) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="flex flex-col gap-8 w-full bg-primary-100 border border-primary-250 rounded-xl p-[30px]"
    >
      <div className="flex justify-between">
        <div className="flex gap-4">
          <div className="w-[60px] h-[60px] bg-[#19191a] flex items-center justify-center border border-primary-350 rounded-xl p-1">
            {companyLogo}
          </div>
          <div>
            <p className="text-[22px] text-primary-800 font-semibold">
              {companyName}
            </p>
            <p className="text-[12px] md:hidden">{companyMainFunction}</p>
            <a
              target="_blank"
              href={companyUrl}
              className="text-[#999999] hover:text-[#cccccc] underline"
            >
              {companyTextUrl}
            </a>
          </div>
          <div className="hidden md:block">
            <p className="text-[#999999] border border-primary-250 bg-[#0F0F10] rounded-2xl px-2 py-1">
              {companyMainFunction}
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-[14px] sm:text-[24px] font-semibold text-primary-800">
            {companyDate}
          </p>
        </div>
      </div>
      {children}
    </motion.div>
  )
}

export function JobExperiencesSection() {
  const t = useTranslations('HomePage')
  return (
    <Section
      icon={<BusinessCenterIcon size={28} />}
      title={t('JobExperiencesSection.title')}
      description={t('JobExperiencesSection.subtitle')}
    >
      <div className="flex flex-col gap-14">
        <JobWrapper
          companyMainFunction={t('JobExperiencesSection.job-1.sector')}
          companyName="ArchOffice"
          companyUrl="https://www.archoffice.tech/"
          companyTextUrl="archoffice.tech"
          companyDate="01/2023 - Atual"
          companyLogo={
            <Image src={archofficeLogo} width={100} alt="archlogo" />
          }
        >
          <JobFunction
            title={t('JobExperiencesSection.job-1.cargo-1')}
            body={t.rich('JobExperiencesSection.job-1.cargo-1-description', {
              break: () => <div className="p-2" />,
            })}
          />
          <JobFunction
            title={t('JobExperiencesSection.job-1.cargo-2')}
            body={t.rich('JobExperiencesSection.job-1.cargo-2-description', {
              break: () => <div className="p-2" />,
            })}
          />
        </JobWrapper>
        <JobWrapper
          companyName="SmartNX"
          companyMainFunction={t('JobExperiencesSection.job-2.sector')}
          companyUrl="https://www.smartnx.com/"
          companyTextUrl="smartnx.com"
          companyDate="02/2022 - 11/2022"
          companyLogo={
            <Image
              src={smartNxLogo}
              width={100}
              alt="smart logo"
              className="grayscale invert-[50%]"
            />
          }
        >
          <JobFunction
            title={t('JobExperiencesSection.job-2.cargo-1')}
            body={t.rich('JobExperiencesSection.job-2.cargo-1-description', {
              break: () => <div className="p-2" />,
            })}
          />
        </JobWrapper>
      </div>
    </Section>
  )
}
