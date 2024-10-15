'use client'
import euaImage from '@/app/assets/imgs/estados-unidos.png'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Drawer } from '../Drawer'

export function TopBar() {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full py-5 flex justify-between px-4 items-center border-b border-primary-350"
    >
      <div className="">
        <a
          href=""
          className="bg-primary-250 text-primary-750 py-3 px-4 rounded-2xl flex items-center justify-center gap-4"
        >
          <Image src={euaImage} height={22} width={22} alt="eua" />
          English Version Here
        </a>
      </div>
      <div>
        <Drawer />
      </div>
    </motion.div>
  )
}
