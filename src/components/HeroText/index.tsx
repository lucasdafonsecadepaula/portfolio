/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useTranslations } from 'next-intl'
import { useEffect, useRef } from 'react'

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function HeroText() {
  const intervalRef = useRef<any>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const intRef = useRef<number>(0)
  const t = useTranslations('HomePage')

  useEffect(() => {
    const run = () => {
      let iteration = 0
      const animationWords = [
        t('HeroSection.h1.lg-1'),
        t('HeroSection.h1.lg-2'),
      ]
      const wordIndex = intRef.current

      if (!titleRef?.current) return
      if (intervalRef.current) clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        if (!titleRef.current) return
        titleRef.current.innerText = animationWords[wordIndex]
          .split('')
          .map((letter: any, index: any) => {
            if (index < iteration) {
              return animationWords[wordIndex][index]
            }
            return letters[Math.floor(Math.random() * 26)]
          })
          .join('')

        if (iteration >= animationWords[wordIndex].length) {
          if (intervalRef.current) clearInterval(intervalRef.current)
        }

        iteration += 1 / 2
      }, 20)

      if (intRef.current === 0) {
        intRef.current = 1
      } else {
        intRef.current = 0
      }
    }

    if (!titleRef.current) return
    titleRef.current.addEventListener('mouseover', run)

    const timeToTime = setInterval(run, 6000)

    return () => {
      if (timeToTime) clearInterval(timeToTime)
    }
  }, [t])

  return (
    <div
      className="font-bold lg:text-[36px] text-[24px] leading-[42px] text-white"
      data-value={'DESENVOLVEDOR FRONT-END'}
      ref={titleRef}
    >
      DESENVOLVEDOR FRONT-END
    </div>
  )
}
