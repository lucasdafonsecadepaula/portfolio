'use client'
import { Magnetic } from '@/components/motion/magnetic'
import { Toaster } from '@/components/ui/sonner'
import { duration, ease } from '@/lib/motion'
import { cn } from '@/lib/utils'
import emailjs from '@emailjs/browser'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useReducedMotion,
} from 'motion/react'
import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

const EMAIL = 'lucasdafonsecadepaula@gmail.com'
const LINKS = [
  {
    label: 'LinkedIn',
    handle: 'in/lucas-da-fonseca-de-paula',
    href: 'https://www.linkedin.com/in/lucas-da-fonseca-de-paula/',
  },
  {
    label: 'GitHub',
    handle: '@lucasdafonsecadepaula',
    href: 'https://github.com/lucasdafonsecadepaula',
  },
]
const MAX = 1000

type Status = 'idle' | 'sending' | 'success' | 'error'
type Values = { name: string; email: string; message: string }

const Arrow = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 16 16"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <path d="M4 12 12 4M5.5 4H12v6.5" />
  </svg>
)

function Burst() {
  const dots = Array.from({ length: 14 }, (_, i) => {
    const a = (i / 14) * Math.PI * 2
    const r = 46 + (i % 3) * 14
    return { x: Math.cos(a) * r, y: Math.sin(a) * r * 0.7, c: i % 2 }
  })
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute size-1.5 rounded-full"
          style={{ background: d.c ? 'var(--cyan)' : 'var(--violet)' }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: d.x, y: d.y, opacity: 0, scale: 0.4 }}
          transition={{ duration: 0.9, ease: ease.out }}
        />
      ))}
    </span>
  )
}

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string
  label: string
  error?: string
  hint?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="group/field relative">
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <label
          htmlFor={id}
          className={cn(
            'font-mono text-[11px] uppercase tracking-[0.18em] transition-colors',
            error
              ? 'text-[oklch(0.75_0.17_20)]'
              : 'text-muted-foreground group-focus-within/field:text-[var(--violet)]',
          )}
        >
          {label}
        </label>
        {hint}
      </div>
      <div className="relative">
        {children}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-[var(--violet)] to-[var(--cyan)] shadow-[0_0_14px_var(--violet)] transition-transform duration-500 [transition-timing-function:cubic-bezier(.2,.7,.2,1)] group-focus-within/field:scale-x-100 motion-reduce:transition-none"
        />
      </div>
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: duration.fast, ease: ease.out }}
            className="overflow-hidden pt-2 text-[13px] text-[oklch(0.75_0.17_20)]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

const inputCls =
  'block w-full border-0 border-b border-[var(--line-strong)] bg-transparent px-0 py-2.5 text-[17px] text-foreground outline-none focus:outline-none focus-visible:outline-none focus-visible:shadow-none focus-visible:ring-0 transition-colors placeholder:text-muted-foreground/50 aria-invalid:border-[oklch(0.75_0.17_20/0.6)] disabled:opacity-60'

export function ContactFormSection() {
  const t = useTranslations('Contact')
  const reduce = useReducedMotion()
  const shake = useAnimationControls()
  const [status, setStatus] = useState<Status>('idle')
  const [copied, setCopied] = useState(false)
  const [invalidNote, setInvalidNote] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const schema = useMemo(
    () =>
      z.object({
        name: z
          .string()
          .trim()
          .min(2, { message: t('form.errors.nameMin') }),
        email: z.email({ message: t('form.errors.emailInvalid') }),
        message: z
          .string()
          .trim()
          .min(10, { message: t('form.errors.messageMin') })
          .max(MAX),
      }),
    [t],
  )

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: { name: '', email: '', message: '' },
  })
  const count = (useWatch({ control, name: 'message' }) ?? '').length

  useEffect(() => {
    if (status !== 'success') return
    const id = setTimeout(() => setStatus('idle'), 5000)
    return () => clearTimeout(id)
  }, [status])

  function onInvalid() {
    setInvalidNote(true)
    if (!reduce)
      shake.start({
        x: [0, -9, 8, -6, 4, -2, 0],
        transition: { duration: 0.45, ease: 'easeOut' },
      })
  }

  async function onSubmit() {
    if (status === 'sending' || !formRef.current) return
    setInvalidNote(false)
    // Honeypot: bots fill the hidden field; pretend success and send nothing.
    const trap = formRef.current.elements.namedItem(
      'website',
    ) as HTMLInputElement | null
    if (trap?.value) {
      reset()
      setStatus('success')
      return
    }
    setStatus('sending')
    try {
      await emailjs.sendForm(
        'service_7k0uu2o',
        'template_3rosprc',
        formRef.current,
        'e6RFGTnjZxKQST0fP',
      )
      reset()
      setStatus('success')
      toast.success(t('form.success'))
    } catch {
      setStatus('error')
      toast.error(t('form.error'))
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      toast.success(t('copied'))
      setTimeout(() => setCopied(false), 2200)
    } catch {
      toast.error(t('copyFailed'))
    }
  }

  const words = t('title').split(' ')
  const last = words.pop()
  const sending = status === 'sending'
  const err = (k: keyof Values) => errors[k]?.message

  return (
    <section
      id="contact"
      data-orb="0.92,320,0.4,1"
      aria-label={t('label')}
      className="relative overflow-hidden border-t border-[var(--line)] px-5 py-28 sm:px-8 lg:px-12 lg:py-40"
    >
      <Toaster position="bottom-right" theme="dark" />
      <div className="mx-auto grid max-w-[1180px] gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: duration.slow, ease: ease.out }}
        >
          <div className="eyebrow mb-6">{t('eyebrow')}</div>
          <h2 className="font-display text-[clamp(2.5rem,5.4vw,4.75rem)] font-bold leading-[0.95] tracking-[-0.035em] text-balance">
            {words.join(' ')} <span className="grad-text">{last}</span>
          </h2>
          <p className="mt-7 max-w-[440px] text-[17px] leading-relaxed text-muted-foreground">
            {t('subtitle')}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[12px] uppercase tracking-[0.14em] text-muted-foreground">
            <span className="flex items-center gap-2.5 text-foreground">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full rounded-full bg-emerald-400/70 motion-safe:animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              {t('availability')}
            </span>
          </div>

          <div className="mt-14 border-t border-[var(--line)]">
            <p className="eyebrow py-5">{t('direct')}</p>
            <ul className="border-t border-[var(--line)]">
              <li className="border-b border-[var(--line)]">
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label={t('copyEmail')}
                  className="group flex w-full items-center justify-between gap-4 rounded-sm py-4 text-left outline-none transition-colors hover:text-[var(--violet)] focus-visible:ring-2 focus-visible:ring-[var(--violet)]"
                >
                  <span className="min-w-0">
                    <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      Email
                    </span>
                    <span className="block truncate font-display text-lg sm:text-2xl">
                      {EMAIL}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground group-hover:text-foreground"
                  >
                    {copied ? '✓' : 'copy'}
                  </span>
                </button>
              </li>
              {LINKS.map((l) => (
                <li key={l.label} className="border-b border-[var(--line)]">
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${l.label}, ${t('opensNewTab')}`}
                    className="group flex items-center justify-between gap-4 rounded-sm py-4 outline-none transition-colors hover:text-[var(--violet)] focus-visible:ring-2 focus-visible:ring-[var(--violet)]"
                  >
                    <span className="min-w-0">
                      <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        {l.label}
                      </span>
                      <span className="block truncate font-display text-lg sm:text-2xl">
                        {l.handle}
                      </span>
                    </span>
                    <Arrow className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--violet)]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: duration.slow, delay: 0.12, ease: ease.out }}
        >
          <motion.form
            ref={formRef}
            animate={shake}
            noValidate
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            className="space-y-8 rounded-[20px] border border-[var(--line)] bg-[var(--surface-2)] p-7 backdrop-blur-sm sm:p-10"
          >
            <Field id="cf-name" label={t('form.name')} error={err('name')}>
              <input
                id="cf-name"
                type="text"
                autoComplete="name"
                placeholder={t('form.namePlaceholder')}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'cf-name-error' : undefined}
                disabled={sending}
                className={inputCls}
                {...register('name')}
              />
            </Field>
            <Field id="cf-email" label={t('form.email')} error={err('email')}>
              <input
                id="cf-email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder={t('form.emailPlaceholder')}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'cf-email-error' : undefined}
                disabled={sending}
                className={inputCls}
                {...register('email')}
              />
            </Field>
            <Field
              id="cf-message"
              label={t('form.message')}
              error={err('message')}
              hint={
                <span
                  aria-hidden="true"
                  className={cn(
                    'font-mono text-[11px] tabular-nums tracking-wider transition-colors',
                    count > MAX * 0.9
                      ? 'text-[oklch(0.75_0.17_20)]'
                      : 'text-muted-foreground/70',
                  )}
                >
                  {t('form.characters', { count, max: MAX })}
                </span>
              }
            >
              <textarea
                id="cf-message"
                rows={5}
                maxLength={MAX}
                placeholder={t('form.messagePlaceholder')}
                aria-invalid={!!errors.message}
                aria-describedby={
                  errors.message ? 'cf-message-error' : undefined
                }
                disabled={sending}
                className={cn(inputCls, 'resize-none')}
                {...register('message')}
              />
            </Field>

            {/* Honeypot: hidden from people and assistive tech */}
            <div
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
            >
              <label>
                Website
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  defaultValue=""
                />
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-2">
              <Magnetic strength={0.18}>
                <button
                  type="submit"
                  disabled={sending}
                  aria-disabled={sending}
                  className={cn(
                    'relative inline-flex h-14 min-w-[190px] items-center justify-center gap-2.5 rounded-full px-8 font-display text-[15px] font-semibold text-[oklch(0.15_0.03_290)] outline-none transition-[box-shadow,filter,background-color] duration-300 focus-visible:ring-2 focus-visible:ring-[var(--cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-wait',
                    status === 'success'
                      ? 'bg-emerald-400 shadow-[0_0_40px_-6px_oklch(0.8_0.2_160)]'
                      : status === 'error'
                        ? 'bg-[oklch(0.7_0.19_20)] shadow-[0_0_36px_-8px_oklch(0.65_0.22_20)]'
                        : 'bg-[var(--violet)] shadow-[0_0_36px_-8px_var(--violet)] hover:shadow-[0_0_50px_-4px_var(--violet)] hover:brightness-110',
                  )}
                >
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={status}
                      className="flex items-center gap-2.5"
                      initial={reduce ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0, y: -10 }}
                      transition={{ duration: 0.2, ease: ease.out }}
                    >
                      {sending && (
                        <span
                          aria-hidden="true"
                          className="size-4 rounded-full border-2 border-black/25 border-t-black/80 motion-safe:animate-spin"
                        />
                      )}
                      {status === 'success' && (
                        <svg
                          viewBox="0 0 24 24"
                          className="size-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <motion.path
                            d="M5 12.5 10 17.5 19 7"
                            initial={reduce ? false : { pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                          />
                        </svg>
                      )}
                      {sending
                        ? t('form.sending')
                        : status === 'success'
                          ? t('form.sent')
                          : status === 'error'
                            ? t('form.retry')
                            : t('form.submit')}
                    </motion.span>
                  </AnimatePresence>
                  {status === 'success' && !reduce && <Burst />}
                </button>
              </Magnetic>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {t('responseTime')}
              </p>
            </div>

            <div role="status" aria-live="polite" className="sr-only">
              {sending && t('form.statusSending')}
              {status === 'success' && t('form.success')}
              {invalidNote &&
                Object.keys(errors).length > 0 &&
                t('form.statusInvalid')}
            </div>
            <AnimatePresence>
              {status === 'error' && (
                <motion.p
                  role="alert"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-lg border border-[oklch(0.75_0.17_20/0.35)] bg-[oklch(0.75_0.17_20/0.08)] px-4 py-3 text-sm text-[oklch(0.82_0.12_20)]"
                >
                  {t('form.error')}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}
