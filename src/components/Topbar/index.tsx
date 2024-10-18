'use client'
import euaImage from '@/src/assets/imgs/estados-unidos.png'
import brImage from '@/src/assets/imgs/brasil.png'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Drawer } from '../Drawer'
import { useTranslations } from 'next-intl'
import { Link } from '@/src/i18n/routing'

export function TopBar() {
  const t = useTranslations('HomePage')

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full py-5 flex justify-between md:justify-end px-4 items-center border-b border-primary-350"
    >
      <div className="">
        <Link
          href="/"
          locale={t('TopBar.Version.Locale') as 'pt' | 'en' | undefined}
          className="bg-primary-250 text-primary-750 py-3 px-4 rounded-2xl flex items-center justify-center gap-4"
        >
          <Image
            src={t('TopBar.Version.Locale') === 'en' ? euaImage : brImage}
            height={22}
            width={22}
            alt="eua"
          />
          {t('TopBar.Version.Text')}
        </Link>
      </div>
      <div className="md:hidden">
        <Drawer />
      </div>
    </motion.div>
  )
}
