import { useTranslations } from 'next-intl'
import Image from 'next/image'

type Logo = { src: string; alt: string } | { text: string }

const logos: Logo[] = [
  { src: '/smartnx-logo.png', alt: 'SmartNX' },
  { text: 'SPDATA' },
  { src: '/axis-logo.png', alt: 'Axis Mobfintech' },
  { src: '/versatus-logo.png', alt: 'Versatus' },
]

const item = 'transition-opacity duration-300 opacity-60 hover:opacity-100'

function TickerGroup({ hidden }: { hidden?: boolean }) {
  const t = useTranslations('Hero')
  return (
    <div
      aria-hidden={hidden || undefined}
      className="flex items-center gap-10 whitespace-nowrap pr-10 font-mono text-[12.5px] uppercase tracking-[0.1em] text-muted-foreground"
    >
      <span>{t('trustedBy')}</span>
      <span className="opacity-40">/</span>
      {logos.map((logo, i) => (
        <span key={i} className="flex items-center gap-10">
          {'src' in logo ? (
            <Image
              src={logo.src}
              alt={hidden ? '' : logo.alt}
              width={120}
              height={30}
              className={`h-[15px] w-auto brightness-0 invert ${item}`}
            />
          ) : (
            <span className={`hover:text-foreground ${item}`}>{logo.text}</span>
          )}
          <span className="opacity-40">/</span>
        </span>
      ))}
    </div>
  )
}

export function Ticker() {
  return (
    <div className="group/ticker relative z-10 overflow-hidden border-y border-[var(--line)] bg-background/60 py-4 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div className="ticker-track flex w-max items-center group-hover/ticker:[animation-play-state:paused]">
        <TickerGroup />
        <TickerGroup hidden />
        <TickerGroup hidden />
        <TickerGroup hidden />
      </div>
    </div>
  )
}
