// Tiny hand-drawn SVG glyphs, one per service. They animate via the parent's
// `group` + `data-active="true"` state (transform / dash-offset only).
const base =
  'transition-all duration-700 [transition-timing-function:cubic-bezier(.2,.7,.2,1)]'
const draw = `${base} [stroke-dasharray:1] [stroke-dashoffset:0]`

function Svg({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-full"
    >
      {children}
    </svg>
  )
}

export type GlyphKey =
  | 'responsiveDesign'
  | 'backendSolutions'
  | 'performance'
  | 'uxui'
  | 'webApps'
  | 'refactoring'

const glyphs: Record<GlyphKey, React.ReactNode> = {
  responsiveDesign: (
    <Svg>
      <rect
        x="4"
        y="9"
        width="30"
        height="21"
        rx="2.5"
        pathLength={1}
        className={draw}
      />
      <path d="M13 37h12M19 30v7" />
      <rect
        x="34"
        y="20"
        width="10"
        height="18"
        rx="2"
        className={`${base} fill-[var(--background)] group-data-[active=true]:-translate-x-4 group-data-[active=true]:-translate-y-2`}
      />
    </Svg>
  ),
  backendSolutions: (
    <Svg>
      {[10, 21, 32].map((y, i) => (
        <g key={y}>
          <rect x="6" y={y} width="36" height="8" rx="2" />
          <circle
            cx="13"
            cy={y + 4}
            r="1.4"
            fill="currentColor"
            className={`${base} group-data-[active=true]:translate-x-[22px]`}
            style={{ transitionDelay: `${i * 90}ms` }}
          />
        </g>
      ))}
    </Svg>
  ),
  performance: (
    <Svg>
      <path d="M8 34a17 17 0 1 1 32 0" pathLength={1} className={draw} />
      <g
        className={`${base} origin-[24px_34px] -rotate-[65deg] group-data-[active=true]:rotate-[62deg]`}
      >
        <path d="M24 34L24 19" />
      </g>
      <circle cx="24" cy="34" r="2" fill="currentColor" />
    </Svg>
  ),
  uxui: (
    <Svg>
      <path
        d="M6 38C14 38 14 12 24 12s10 26 18 26"
        pathLength={1}
        className={`${base} [stroke-dasharray:1] [stroke-dashoffset:.35] group-data-[active=true]:[stroke-dashoffset:0]`}
      />
      <rect x="4" y="36" width="4" height="4" fill="var(--background)" />
      <rect x="40" y="36" width="4" height="4" fill="var(--background)" />
      <rect x="22" y="10" width="4" height="4" fill="var(--background)" />
      <path
        d="M30 24l9 3.5-4 1.6-1.6 4z"
        fill="currentColor"
        className={`${base} group-data-[active=true]:translate-x-1 group-data-[active=true]:translate-y-1`}
      />
    </Svg>
  ),
  webApps: (
    <Svg>
      <rect x="5" y="8" width="38" height="32" rx="3" />
      <path d="M5 16h38" />
      <rect
        x="10"
        y="21"
        width="10"
        height="14"
        rx="1.5"
        className={`${base} [transform-box:fill-box] origin-bottom group-data-[active=true]:scale-y-[.6]`}
      />
      <rect
        x="25"
        y="21"
        width="13"
        height="5"
        rx="1.5"
        className={`${base} [transform-box:fill-box] origin-left group-data-[active=true]:scale-x-[.6]`}
      />
      <rect
        x="25"
        y="30"
        width="13"
        height="5"
        rx="1.5"
        className={`${base} [transform-box:fill-box] origin-left group-data-[active=true]:scale-x-[1.2]`}
      />
    </Svg>
  ),
  refactoring: (
    <Svg>
      <path
        d="M16 14L6 24l10 10"
        className={`${base} group-data-[active=true]:-translate-x-1.5`}
      />
      <path
        d="M32 14l10 10-10 10"
        className={`${base} group-data-[active=true]:translate-x-1.5`}
      />
      <path
        d="M27 12L21 36"
        className={`${base} [transform-box:fill-box] origin-center group-data-[active=true]:rotate-[14deg]`}
      />
    </Svg>
  ),
}

export function ServiceGlyph({ name }: { name: GlyphKey }) {
  return glyphs[name]
}
