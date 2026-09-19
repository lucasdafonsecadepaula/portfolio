export interface TimelineItem {
  year: string
  company: string
  /** Brand accent (hex) used sparingly: dot, glow, hairline, hover. */
  accent: string
  descriptionKey: string
  /** Only technologies explicitly mentioned in the description copy. */
  stack: string[]
  images: string[]
}

export const timelineData: TimelineItem[] = [
  {
    year: '2022',
    company: 'SmartNX',
    accent: '#a78bfa',
    descriptionKey: 'smartnx',
    stack: ['React', 'WebSocket', 'VTEX', 'Atomic Design'],
    images: ['/smartnx-screen-1.png', '/smartnx-screen-2.png'],
  },
  {
    year: '2023',
    company: 'SPDATA',
    accent: '#00b4bd',
    descriptionKey: 'spdata',
    stack: ['Vue.js', 'Government APIs'],
    images: ['/spdata-screen-1.png', '/spdata-screen-2.png'],
  },
  {
    year: '2024',
    company: 'Axis Mobfintech',
    accent: '#ff6a2a',
    descriptionKey: 'axis',
    stack: ['React', 'TypeScript', 'Pix', 'QR Code'],
    images: ['/axis-screen-1.png', '/axis-screen-2.png'],
  },
  {
    year: '2025',
    company: 'Versatus',
    accent: '#34d399',
    descriptionKey: 'versatus',
    stack: ['Interactive charts', 'Component architecture'],
    images: ['/kosen-screen-1.png', '/kosen-screen-2.png'],
  },
]
