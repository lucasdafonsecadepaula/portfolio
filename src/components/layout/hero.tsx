import * as motion from 'motion/react-client'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

const rise = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
}

const ease = [0.2, 0.7, 0.2, 1] as const

function Reveal({
  delay = 0,
  className,
  children,
}: {
  delay?: number
  className?: string
  children: React.ReactNode
}) {
  return (
    <motion.div
      className={className}
      variants={rise}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

const traces = [
  { d: 'M40,70 H190 V230 H370', duration: '4.4s', delay: '0s' },
  { d: 'M486,44 V168 H310 V330', duration: '5.6s', delay: '0.6s', violet: true },
  { d: 'M60,352 H228 V492 H428 V626', duration: '6.2s', delay: '1.3s' },
  { d: 'M448,528 H268 V684', duration: '3.8s', delay: '0.3s', violet: true },
  { d: 'M20,608 H146 V726', duration: '4.9s', delay: '2s' },
]

const nodes = [
  { cx: 190, cy: 230, violet: false, delay: '0.1s' },
  { cx: 370, cy: 230, violet: false, delay: '0.9s' },
  { cx: 310, cy: 168, violet: true, delay: '0.5s' },
  { cx: 486, cy: 168, violet: true, delay: '1.6s' },
  { cx: 228, cy: 492, violet: false, delay: '1.1s' },
  { cx: 428, cy: 492, violet: false, delay: '0.2s' },
  { cx: 268, cy: 528, violet: true, delay: '1.9s' },
  { cx: 146, cy: 608, violet: false, delay: '0.7s' },
]

const blips = [
  { cx: 90, cy: 150, delay: '0.4s' },
  { cx: 500, cy: 450, delay: '2.2s' },
  { cx: 170, cy: 700, delay: '1.4s' },
]

function CircuitTraces() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[1%] top-[9%] z-0 hidden h-[82%] w-[min(44%,580px)] select-none lg:block"
    >
      <svg viewBox="0 0 520 760" className="block h-full w-full overflow-visible">
        {traces.map((trace) => (
          <path key={`line-${trace.d}`} className="circuit-line" d={trace.d} />
        ))}
        {traces.map((trace) => (
          <path
            key={`pulse-${trace.d}`}
            className={`circuit-pulse${trace.violet ? ' violet' : ''}`}
            d={trace.d}
            style={{
              animationDuration: trace.duration,
              animationDelay: trace.delay,
            }}
          />
        ))}
        {nodes.map((node) => (
          <circle
            key={`${node.cx}-${node.cy}`}
            className="circuit-node"
            cx={node.cx}
            cy={node.cy}
            r={3.5}
            style={{
              color: node.violet ? 'var(--violet)' : 'var(--cyan)',
              animationDelay: node.delay,
            }}
          />
        ))}
        {blips.map((blip) => (
          <circle
            key={`${blip.cx}-${blip.cy}`}
            className="circuit-blip"
            cx={blip.cx}
            cy={blip.cy}
            r={2.5}
            style={{ animationDelay: blip.delay }}
          />
        ))}
      </svg>
    </div>
  )
}

export function Hero() {
  const t = useTranslations('Hero')

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -bottom-56 -right-40 h-[520px] w-[520px] rounded-full bg-[var(--cyan)] opacity-30 blur-[90px]" />
        <div className="grid-overlay absolute inset-0 opacity-30" />
        <div className="absolute inset-0 [background:radial-gradient(ellipse_100%_80%_at_30%_30%,transparent_20%,hsl(var(--background))_96%)]" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-2%] top-1/2 z-0 -translate-y-[52%] select-none font-display text-[58vw] font-extrabold leading-none text-transparent opacity-40 [-webkit-text-stroke:1px_var(--line-strong)] lg:text-[46vw] lg:opacity-60"
      >
        LP
      </div>

      <CircuitTraces />

      <Reveal className="relative z-10 px-5 pt-24 sm:px-8 sm:pt-28 lg:px-12 lg:pt-32">
        <div className="flex items-center gap-3 font-mono text-[13px] uppercase tracking-[0.14em] text-muted-foreground">
          <span className="block h-px w-7 bg-[var(--violet)]" />
          {t('kicker')}
        </div>
      </Reveal>

      <h1 className="relative z-10 px-5 pt-5 font-display sm:px-8 lg:px-12">
        <Reveal delay={0.08}>
          <span className="block text-[28px] font-semibold leading-[1.05] tracking-[-0.02em] text-muted-foreground sm:text-4xl lg:text-[52px]">
            {t('line1')}
          </span>
        </Reveal>
        <Reveal delay={0.16}>
          <span className="block text-[44px] font-bold leading-none tracking-[-0.03em] sm:text-6xl lg:text-[88px]">
            {t('line2')}
          </span>
        </Reveal>
        <Reveal delay={0.24}>
          <span className="grad-text block pb-2 text-[72px] font-bold leading-[0.92] tracking-[-0.04em] sm:text-[104px] lg:text-[150px]">
            {t('line3')}
          </span>
        </Reveal>
      </h1>

      <Reveal
        delay={0.34}
        className="relative z-10 flex flex-col items-start gap-7 px-5 pb-10 pt-14 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10 lg:px-12 lg:pb-14 lg:pt-16"
      >
        <p className="max-w-[320px] text-base leading-[1.7] text-muted-foreground">
          {t('description')}
        </p>

        <Link
          href="#about"
          className="hidden shrink-0 flex-col items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground lg:flex"
        >
          <span>{t('learnMore')}</span>
          <span className="scroll-drip relative block h-11 w-px overflow-hidden bg-gradient-to-b from-muted-foreground to-transparent" />
        </Link>

        <Link href="#contact" className="apple-button w-full sm:w-auto">
          {t('getInTouch')}
          <svg
            viewBox="0 0 24 24"
            className="size-[17px] fill-none stroke-current stroke-[1.8]"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </Reveal>
    </section>
  )
}
