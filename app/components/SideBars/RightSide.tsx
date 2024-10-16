'use client'
import { IconButton } from '@/app/components/buttons/Icon'
import { GithubIcon, LinkedinIcon } from '@/app/components/icons'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function RightSideBar() {
  return (
    <div className="hidden lg:block h-screen w-[15%] border-l border-primary-350 sticky top-0 bottom-0 right-0">
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-col h-screen">
          <div className="h-[94px] px-10 flex items-center" />
          <div className="flex-grow px-10 flex items-center">
            <div className="flex gap-8 flex-col">
              <Link
                href={'https://github.com/lucasdafonsecadepaula'}
                target="_blank"
              >
                <IconButton
                  tooltipText="GITHUB"
                  tooltipPos="right"
                  variant="secondary"
                >
                  <GithubIcon size={28} />
                </IconButton>
              </Link>
              <Link
                href={'https://www.linkedin.com/in/lucas-da-fonseca-de-paula/'}
                target="_blank"
              >
                <IconButton
                  tooltipText="LINKEDIN"
                  tooltipPos="right"
                  variant="secondary"
                >
                  <LinkedinIcon size={28} />
                </IconButton>
              </Link>
            </div>
          </div>
          <div className="h-32 px-10 flex items-center" />
        </div>
      </motion.div>
    </div>
  )
}
