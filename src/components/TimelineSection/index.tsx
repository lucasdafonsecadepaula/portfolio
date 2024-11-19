import Image from 'next/image'
import { Timeline } from '../Timeline'
import kosenLogo from '@/src/assets/imgs/kosen-logo.png'
import kosen1 from '@/src/assets/imgs/kosen-1.png'
import kosen2 from '@/src/assets/imgs/kosen-2.jpeg'
import kosen3 from '@/src/assets/imgs/kosen-3.jpeg'
import axis1 from '@/src/assets/imgs/axis-1.png'
import axis2 from '@/src/assets/imgs/axis-2.png'
import axis3 from '@/src/assets/imgs/axis-3.png'
import axis4 from '@/src/assets/imgs/axis-4.png'
import spdata1 from '@/src/assets/imgs/spdata.png'
import smartnx1 from '@/src/assets/imgs/smartnx-1.png'
import smartnx2 from '@/src/assets/imgs/smartnx-2.png'
import { AnimatedGrid } from '../AnimatedGrid'
import { useTranslations } from 'next-intl'
import { Section } from '../Section'
import { RocketLauchIcon } from '../icons'

export function TimelineSection() {
  const t = useTranslations('HomePage')

  const versatusRows = [
    [
      { src: kosenLogo, id: 0, className: 'object-scale-down' },
      { src: kosen1, id: 1, className: 'object-cover' },
    ],
    [
      { src: kosen2, id: 2, className: 'object-cover' },
      { src: kosen3, id: 3, className: 'object-cover' },
    ],
  ]

  const axisRows = [
    [
      { src: axis1, id: 0, className: 'object-cover' },
      { src: axis2, id: 1, className: 'object-cover' },
    ],
    [
      { src: axis3, id: 2, className: 'object-cover' },
      { src: axis4, id: 3, className: 'object-cover' },
    ],
  ]

  const smartRows = [
    [
      { src: smartnx1, id: 0, className: 'object-cover' },
      { src: smartnx2, id: 1, className: 'object-cover' },
    ],
  ]

  const data = [
    {
      title: (
        <div>
          <h4 className="">2024</h4>
          <h4 className="text-lg md:text-xl">Versatus - Kosen Energy</h4>
        </div>
      ),
      content: (
        <div>
          <p className="text-[18px] text-primary-800 mb-8">
            {t('TimelineSection.2024')}
          </p>
          <AnimatedGrid rows={versatusRows} />
        </div>
      ),
    },
    {
      title: (
        <div>
          <h4 className="">2023</h4>
          <h4 className="text-lg md:text-xl">Axis Mobfintech</h4>
        </div>
      ),
      content: (
        <div>
          <p className="text-[18px] text-primary-800 mb-8">
            {t('TimelineSection.2023-1')}
          </p>
          <AnimatedGrid rows={axisRows} />
        </div>
      ),
    },
    {
      title: (
        <div>
          <h4 className="">2023</h4>
          <h4 className="text-lg md:text-xl">SPDATA - CNES</h4>
        </div>
      ),
      content: (
        <div>
          <p className="text-[18px] text-primary-800 mb-8">
            {t('TimelineSection.2023-2')}
          </p>
          <div className="grid grid-cols-1 gap-4">
            <Image
              src={spdata1}
              alt="hero template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: (
        <div>
          <h4 className="">2022</h4>
          <h4 className="text-lg md:text-xl">SmartNX - NXSuite</h4>
        </div>
      ),
      content: (
        <div>
          <p className="text-[18px] text-primary-800 mb-8">
            {t('TimelineSection.2022')}
          </p>
          <AnimatedGrid rows={smartRows} />
        </div>
      ),
    },
  ]

  return (
    <Section
      icon={<RocketLauchIcon size={28} />}
      title={t('TimelineSection.title')}
      description={t('TimelineSection.subtitle')}
    >
      <Timeline data={data} />
    </Section>
  )
}
