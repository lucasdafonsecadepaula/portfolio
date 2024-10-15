'use client'
import archofficeLogo from '@/app/assets/imgs/archoffice.png'
import axisLogo from '@/app/assets/imgs/axis.png'
import smartNXLogo from '@/app/assets/imgs/smart-nx.png'
import versatusLogo from '@/app/assets/imgs/versatus.png'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AppearFromBottom } from '../AppearFromBottom'

function ComponaiesLogosStatic() {
  return (
    <>
      <div>
        <Image
          src={smartNXLogo}
          height={32}
          alt="SmartNX Logo"
          className="grayscale invert-[50%]"
        />
      </div>
      <div>
        <Image
          src={archofficeLogo}
          height={32}
          alt="ArchOffice Logo"
          className="grayscale invert-[50%]"
        />
      </div>
      <div>
        <Image
          src={axisLogo}
          height={32}
          alt="Axis Logo"
          className="grayscale invert-[50%]"
        />
      </div>
      <div>
        <Image
          src={versatusLogo}
          height={32}
          alt="Versatus Logo"
          className="grayscale invert-[50%]"
        />
      </div>
    </>
  )
}

function ComponaiesLogosCarousel({ screenWidth }: { screenWidth: number }) {
  return (
    <div className="w-full overflow-hidden">
      <motion.div
        className="flex w-[400%]"
        animate={{ x: [0, -(screenWidth * 2)] }}
        transition={{
          repeat: Infinity,
          duration: 10, // Set your speed here
          ease: 'linear',
        }}
      >
        <div className="w-1/2 h-32 flex items-center justify-center">
          <Image
            src={axisLogo}
            height={24}
            alt="Axis Logo"
            className="grayscale invert-[50%]"
          />
        </div>
        <div className="w-1/2 h-32 flex items-center justify-center">
          <Image
            src={versatusLogo}
            height={24}
            alt="Versatus Logo"
            className="grayscale invert-[50%]"
          />
        </div>
        <div className="w-1/2 h-32 flex items-center justify-center">
          <Image
            src={archofficeLogo}
            height={24}
            alt="ArchOffice Logo"
            className="grayscale invert-[50%]"
          />
        </div>
        <div className="w-1/2 h-32 flex items-center justify-center">
          <Image
            src={smartNXLogo}
            height={24}
            alt="SmartNX Logo"
            className="grayscale invert-[50%]"
          />
        </div>
        <div className="w-1/2 h-32 flex items-center justify-center">
          <Image
            src={axisLogo}
            height={24}
            alt="Axis Logo"
            className="grayscale invert-[50%]"
          />
        </div>
        <div className="w-1/2 h-32 flex items-center justify-center">
          <Image
            src={versatusLogo}
            height={24}
            alt="Versatus Logo"
            className="grayscale invert-[50%]"
          />
        </div>
        <div className="w-1/2 h-32 flex items-center justify-center">
          <Image
            src={archofficeLogo}
            height={24}
            alt="ArchOffice Logo"
            className="grayscale invert-[50%]"
          />
        </div>
        <div className="w-1/2 h-32 flex items-center justify-center">
          <Image
            src={smartNXLogo}
            height={24}
            alt="SmartNX Logo"
            className="grayscale invert-[50%]"
          />
        </div>
      </motion.div>
    </div>
  )
}

export function CompaniesLogos() {
  const [screenWidth, setScreenWidth] = useState(0)

  useEffect(() => {
    setScreenWidth(window.innerWidth)
  }, [])

  return (
    <div>
      <AppearFromBottom
        delay={0.4}
        className="flex items-center justify-around md:py-10"
      >
        {screenWidth > 768 ? (
          <ComponaiesLogosStatic />
        ) : (
          <ComponaiesLogosCarousel screenWidth={screenWidth} />
        )}
      </AppearFromBottom>
    </div>
  )
}
