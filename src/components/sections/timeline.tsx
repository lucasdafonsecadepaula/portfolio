'use client'
import { motion, useInView } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { timelineData } from '@/data/timeline'
import { TimelineContent } from './timeline-content'
import { MobileTimelineItem } from './mobile-timeline-item'

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
          <h2 className="text-2xl font-bold text-foreground">{t('title')}</h2>
          <p className="mt-2 text-base text-muted-foreground">{t('subtitle')}</p>
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

                <TimelineContent currentData={timelineData[activeIndex]} />
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
