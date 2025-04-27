export interface TimelineItem {
  year: string
  company: string
  companyColor: string
  bgPattern: string
  descriptionKey: string
  images: string[]
}

export const timelineData: TimelineItem[] = [
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