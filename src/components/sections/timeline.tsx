'use client'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

// Animation variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
}

const letter = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

// Timeline data with added colors and background patterns
const timelineData = [
  {
    year: '2022',
    company: 'SmartNX',
    companyColor: 'text-primary',
    bgPattern: '/smartnx-bg.png',
    descriptionKey: 'smartnx',
    images: ['/smartnx-screen-1.png', '/smartnx-screen-2.png'],
  },
  {
    year: '2023',
    company: 'SPDATA',
    companyColor: 'text-[#00969E]',
    bgPattern: '/spdata-bg.png',
    descriptionKey: 'spdata',
    images: ['/spdata-screen-1.png', '/spdata-screen-2.png'],
  },
  {
    year: '2024',
    company: 'Axis Mobfintech',
    companyColor: 'text-[#FE5300]',
    bgPattern: '/axis-bg.png',
    descriptionKey: 'axis',
    images: ['/axis-screen-1.png', '/axis-screen-2.png'],
  },
  {
    year: '2025',
    company: 'Versatus',
    companyColor: 'text-green-500',
    bgPattern: '/kosen-bg.png',
    descriptionKey: 'versatus',
    images: ['/kosen-screen-1.png', '/kosen-screen-2.png'],
  },
]

// Animated text component for years and companies with dynamic color
const AnimatedText = ({
  text,
  className,
}: {
  text: string
  className?: string
}) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={text}
      className={`flex tracking-wide ${className || ''}`}
      variants={container}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {text.split('').map((char, i) => (
        <motion.span key={i} variants={letter} className="inline-block">
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  </AnimatePresence>
)

// Timeline content component
const TimelineContent = ({ activeIndex }: { activeIndex: number }) => {
  const t = useTranslations('Timeline')
  const currentData = timelineData[activeIndex]

  return (
    <div className="w-full flex flex-col md:flex-row justify-between gap-4 md:gap-8 lg:gap-16 px-4 md:px-0">
      {/* Text Column - Vertical layout with year, company, description */}
      <div className="w-full md:w-1/2 flex flex-col p-4 md:p-8">
        {/* Year with outline text */}
        <div className="mb-2 md:mb-6">
          <span
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-transparent tracking-tighter"
            style={{
              WebkitTextStroke: '1.5px rgb(156 163 175)',
            }}
          >
            <AnimatedText text={currentData.year} />
          </span>
        </div>

        {/* Company name with dynamic color */}
        <div className="mb-4 md:mb-10">
          <h4
            className={`text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight ${currentData.companyColor}`}
          >
            <AnimatedText text={currentData.company} />
          </h4>
        </div>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed tracking-wide">
          {t(`descriptions.${currentData.descriptionKey}`)}
        </p>
      </div>

      {/* Images Column - Two images stacked vertically */}
      <div className="w-full md:w-1/2 flex flex-col gap-4 md:gap-8 p-4 md:p-8 mb-8 md:mb-16">
        {currentData.images.map((image, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl aspect-[16/9] h-[200px] sm:h-[250px] md:h-[300px]"
          >
            <Image
              src={image}
              alt={`${currentData.company} project image ${index + 1}`}
              fill
              className="object-cover rounded-xl"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// Mobile Timeline Item component
const MobileTimelineItem = ({ data }: { data: typeof timelineData[0] }) => {
  const t = useTranslations('Timeline')
  
  return (
    <div className="w-full flex flex-col gap-6 p-6 border-b border-border last:border-b-0">
      {/* Year and Company Header */}
      <div className="flex flex-col gap-2">
        <span
          className="text-4xl font-bold text-transparent tracking-tighter"
          style={{
            WebkitTextStroke: '1.5px rgb(156 163 175)',
          }}
        >
          {data.year}
        </span>
        <h4 className={`text-3xl font-bold tracking-tight ${data.companyColor}`}>
          {data.company}
        </h4>
      </div>

      {/* Description */}
      <p className="text-base text-muted-foreground leading-relaxed">
        {t(`descriptions.${data.descriptionKey}`)}
      </p>

      {/* Images */}
      <div className="flex flex-col gap-4">
        {data.images.map((image, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-xl shadow-lg aspect-[16/9] h-[200px]"
          >
            <Image
              src={image}
              alt={`${data.company} project image ${index + 1}`}
              fill
              className="object-cover rounded-xl"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function TimelineSection() {
  const t = useTranslations('Timeline')
  const [activeIndex, setActiveIndex] = useState(0)
  const [showSidebars, setShowSidebars] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 'some' })

  // Show sidebars after delay when component is in view
  useEffect(() => {
    if (isInView && !showSidebars) {
      const timer = setTimeout(() => {
        setShowSidebars(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isInView, showSidebars])

  // Handle scroll to update active index
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('scroll-section')
      if (!section) return

      const scrollTop = window.scrollY
      const sectionTop = section.offsetTop
      const scrollInside = scrollTop - sectionTop

      // Calculate which segment we're in (500vh / 4 = 125vh per segment)
      const sectionHeight = window.innerHeight * 5
      const partHeight = sectionHeight / 5

      if (scrollInside >= 0 && scrollInside <= sectionHeight) {
        const index = Math.floor(scrollInside / partHeight)
        setActiveIndex(Math.min(index, 3)) // Prevent index overflow
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Get current background pattern
  const currentBgPattern = timelineData[activeIndex].bgPattern

  return (
    <>
      {/* Mobile Version */}
      <div className="md:hidden mt-16">
        <div className="text-center mb-8 px-4">
          <h2 className="text-2xl font-bold text-foreground">
            {t('title')}
          </h2>
          <p className="mt-2 text-base text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>
        
        <div className="flex flex-col">
          {timelineData.map((data, index) => (
            <MobileTimelineItem key={index} data={data} />
          ))}
        </div>
      </div>

      {/* Desktop Version */}
      <div className="hidden md:block h-[500vh]" id="scroll-section">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="w-full h-full bg-background">
            <div className="w-full h-full flex flex-row">
              {/* Left sidebar */}
              <div className="hidden md:block h-full overflow-hidden opacity-75 flex-grow">
                {showSidebars && (
                  <motion.div
                    key={currentBgPattern + '-left'}
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 0.5, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="h-full bg-repeat"
                    style={{ backgroundImage: `url('${currentBgPattern}')` }}
                  ></motion.div>
                )}
              </div>

              {/* Main content */}
              <div className="w-full md:w-auto flex-shrink-0 h-full flex flex-col items-center pt-8 md:pt-20 max-w-full md:max-w-7xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-8 md:mb-12 mx-auto px-4 w-full"
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground sm:text-4xl">
                    {t('title')}
                  </h2>
                  <p className="mt-2 md:mt-4 text-base md:text-lg text-muted-foreground">
                    {t('subtitle')}
                  </p>
                </motion.div>

                <TimelineContent activeIndex={activeIndex} />
              </div>

              {/* Right sidebar */}
              <div className="hidden md:block h-full opacity-75 flex-grow">
                {showSidebars && (
                  <motion.div
                    key={currentBgPattern + '-right'}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 0.5, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="h-full bg-repeat"
                    style={{ backgroundImage: `url('${currentBgPattern}')` }}
                  ></motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Invisible element to trigger InView */}
          <div ref={ref} className="absolute bottom-0 w-2 h-2"></div>
        </div>
      </div>
    </>
  )
}
