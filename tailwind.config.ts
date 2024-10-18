import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-0': 'var(--primary-0)',
        'primary-50': 'var(--primary-50)',
        'primary-100': 'var(--primary-100)',
        'primary-150': 'var(--primary-150)',
        'primary-200': 'var(--primary-200)',
        'primary-250': 'var(--primary-250)',
        'primary-300': 'var(--primary-300)',
        'primary-350': 'var(--primary-350)',
        'primary-400': 'var(--primary-400)',
        'primary-450': 'var(--primary-450)',
        'primary-500': 'var(--primary-500)',
        'primary-550': 'var(--primary-550)',
        'primary-600': 'var(--primary-600)',
        'primary-650': 'var(--primary-650)',
        'primary-700': 'var(--primary-700)',
        'primary-750': 'var(--primary-750)',
        'primary-800': 'var(--primary-800)',
        'primary-850': 'var(--primary-850)',
        'primary-900': 'var(--primary-900)',
        'primary-950': 'var(--primary-950)',
        'primary-1000': 'var(--primary-1000)',
      },
    },
  },
  plugins: [],
}
export default config
