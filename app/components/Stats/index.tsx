import { Divider } from '@/app/components/Divider'
import { AnimatedCounter } from '../AnimatedCounter'
import { AppearFromBottom } from '../AppearFromBottom'

export function Stats() {
  return (
    <AppearFromBottom delay={0.5}>
      <Divider />
      <div className="flex items-center justify-around py-[34px]">
        <div className="flex flex-col text-center items-center justify-center">
          <span className="font-bold lg:text-[42px] text-[32px] leading-[42px] text-white">
            <AnimatedCounter from={0} to={3} />+
          </span>
          <span>Anos de experiência</span>
        </div>
        <div className="flex flex-col text-center items-center justify-center">
          <span className="font-bold lg:text-[42px] text-[32px] leading-[42px] text-white">
            <AnimatedCounter from={0} to={4} />+
          </span>
          <span>Empresas que contribuí</span>
        </div>
        <div className="flex flex-col text-center items-center justify-center">
          <span className="font-bold lg:text-[42px] text-[32px] leading-[42px] text-white">
            <AnimatedCounter from={0} to={10} />+
          </span>
          <span>Projetos desenvolvidos</span>
        </div>
      </div>
      <Divider />
    </AppearFromBottom>
  )
}
