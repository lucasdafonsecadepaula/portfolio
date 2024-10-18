import type { ReactNode } from 'react'
import { Divider } from '../Divider'

interface RootProps {
  icon: ReactNode
  title: string
  description: string
  children: ReactNode
}

export function Section({ icon, title, description, children }: RootProps) {
  return (
    <section className="w-full py-14 md:px-6">
      <div className="flex items-center gap-4 fill-white pl-6">
        {icon}
        <h3 className="text-primary-1000 text-[28px] font-bold font-sans">
          {title}
        </h3>
      </div>
      <h5 className="py-2 pl-6 text-[18px] text-primary-700">{description}</h5>
      <div className="py-8">
        <Divider />
      </div>

      {children}
    </section>
  )
}
