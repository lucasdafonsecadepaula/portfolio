import { ImageResponse } from 'next/og'
import { getTranslations } from 'next-intl/server'

export const ogSize = { width: 1200, height: 630 }

export async function renderOg(locale: string) {
  const t = await getTranslations({
    locale: locale === 'en' ? 'en' : 'pt',
    namespace: 'Metadata',
  })
  const violet = '#b78bff'
  const cyan = '#3fd0e0'

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px 72px',
        background: '#0f0d17',
        backgroundImage:
          'radial-gradient(circle at 82% 18%, rgba(160,110,255,0.55), rgba(15,13,23,0) 46%), radial-gradient(circle at 96% 92%, rgba(63,208,224,0.28), rgba(15,13,23,0) 40%)',
        color: '#f4f1fa',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 72,
            height: 72,
            borderRadius: 18,
            background: '#000',
            border: `2px solid ${violet}`,
            boxShadow: `0 0 40px ${violet}`,
            fontSize: 30,
            fontWeight: 700,
            color: '#fff',
          }}
        >
          LP
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: violet,
          }}
        >
          lucasdafonsecadepaula.vercel.app
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            fontSize: 132,
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: -4,
          }}
        >
          Lucas de Paula
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 28,
            fontSize: 48,
            fontWeight: 600,
            color: cyan,
          }}
        >
          {t('jobTitle')}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          height: 2,
          width: '100%',
          backgroundImage: `linear-gradient(90deg, ${violet}, ${cyan}, rgba(63,208,224,0))`,
        }}
      />
    </div>,
    ogSize,
  )
}
