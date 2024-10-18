import { Divider } from '@/src/components/Divider'
import { AnimatedCounter } from '../AnimatedCounter'
import { AppearFromBottom } from '../AppearFromBottom'
import { useTranslations } from 'next-intl'

export function Stats() {
  const t = useTranslations('HomePage')

  return (
    <AppearFromBottom delay={0.5}>
      <Divider />
      <div className="flex items-center justify-around py-[34px]">
        <div className="flex flex-col text-center items-center justify-center">
          <span className="font-bold lg:text-[42px] text-[32px] leading-[42px] text-white">
            <AnimatedCounter from={0} to={3} />+
          </span>
          <span>{t('HeroSection.atributes.1')}</span>
        </div>
        <div className="flex flex-col text-center items-center justify-center">
          <span className="font-bold lg:text-[42px] text-[32px] leading-[42px] text-white">
            <AnimatedCounter from={0} to={4} />+
          </span>
          <span>{t('HeroSection.atributes.2')}</span>
        </div>
        <div className="flex flex-col text-center items-center justify-center">
          <span className="font-bold lg:text-[42px] text-[32px] leading-[42px] text-white">
            <AnimatedCounter from={0} to={10} />+
          </span>
          <span>{t('HeroSection.atributes.3')}</span>
        </div>
      </div>
      <Divider />
    </AppearFromBottom>
  )
}
