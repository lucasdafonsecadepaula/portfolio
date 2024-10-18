'use client'
import archofficeLogo from '@/src/assets/imgs/archoffice.png'
import axisLogo from '@/src/assets/imgs/axis.png'
import smartNXLogo from '@/src/assets/imgs/smart-nx.png'
import versatusLogo from '@/src/assets/imgs/versatus.png'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useLayoutEffect, useState } from 'react'
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
  const [windowWidth, setWindowWidth] = useState(0)

  // Function to handle window resize
  const handleResize = () => {
    setWindowWidth(window.innerWidth)
  }

  useLayoutEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [])

  useEffect(() => {
    // Add event listener for window resize
    window.addEventListener('resize', handleResize)

    // Cleanup function to remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div>
      <AppearFromBottom
        delay={0.4}
        className="flex items-center justify-around md:py-10"
      >
        {windowWidth > 768 ? (
          <ComponaiesLogosStatic />
        ) : (
          <ComponaiesLogosCarousel screenWidth={windowWidth} />
        )}
      </AppearFromBottom>
    </div>
  )
}
