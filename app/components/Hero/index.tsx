'use client'
import { AppearFromBottom } from '../AppearFromBottom'
import { CompaniesLogos } from '../CompaniesLogos'
import { ContactMeButton } from '../ContactMeButton'
import { CoolEffect } from '../CoolEffect'
import { HeroText } from '../HeroText'
import { MyImage } from '../MyImage'
import { Stats } from '../Stats'

export function Hero() {
  return (
    <div className="pt-6 lg:pt-32 pb-14">
      <div className="lg:flex lg:w-full">
        <div className="flex lg:w-full items-center justify-center">
          <div className="relative lg:w-3/4 w-1/2 max-w-[280px] aspect-square">
            <CoolEffect />
            <MyImage fill sizes="100%" />
          </div>
        </div>
        <div className="pt-4 lg:pr-10 lg:pt-0 lg:flex lg:flex-col lg:justify-center">
          <AppearFromBottom className="font-bold text-center lg:text-left text-[22px] leading-[27px] text-[#999999]">
            Mais que um
          </AppearFromBottom>
          <AppearFromBottom
            delay={0.1}
            className="w-full text-center lg:text-left lg:w-[540px] whitespace-nowrap overflow-hidden text-ellipsis truncate"
          >
            <HeroText />
          </AppearFromBottom>

          <AppearFromBottom
            delay={0.2}
            className="text-[18px] px-4 md:px-16 text-pretty lg:text-left lg:px-0 leading-[28px] text-[#999999] pt-[22px]"
          >
            Desenvolver é apenas uma etapa. É essencial compreender
            profundamente as necessidades do usuário final para alcançar a
            excelência, prazer me chamo Lucas de Paula.
          </AppearFromBottom>

          <AppearFromBottom
            delay={0.3}
            className="w-full px-4 md:px-16 lg:px-0 flex gap-[20px] pt-[30px]"
          >
            <ContactMeButton />
          </AppearFromBottom>
        </div>
      </div>

      <div className="lg:px-6">
        <CompaniesLogos />
        <Stats />
      </div>
    </div>
  )
}
