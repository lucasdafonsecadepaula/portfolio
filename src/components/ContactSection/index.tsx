'use client'
import emailjs from '@emailjs/browser'
import { MailIcon } from '../icons'
import { Section } from '../Section'
import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

type ContactMessageProps = 'waiting' | 'sending' | 'success' | 'error'

export function ContactSection() {
  const t = useTranslations('HomePage')
  const formRef = useRef<HTMLFormElement>(null)
  const [contactMessageStatus, setContactMessageStatus] =
    useState<ContactMessageProps>('waiting')

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log('form submitted', formRef.current)
    if (formRef.current === null) return

    setContactMessageStatus('sending')
    emailjs
      .sendForm(
        'service_7k0uu2o',
        'template_3rosprc',
        formRef.current,
        'e6RFGTnjZxKQST0fP',
      )
      .then(() => {
        setContactMessageStatus('success')
      })
      .catch(() => {
        setContactMessageStatus('error')
        setTimeout(() => {
          setContactMessageStatus('waiting')
        }, 3000)
      })
  }

  return (
    <Section
      icon={<MailIcon size={28} />}
      title={t('ContactSection.title')}
      description={t('ContactSection.subtitle')}
    >
      <form
        id="contact"
        ref={formRef}
        onSubmit={onSubmit}
        className="flex w-full items-center justify-center"
      >
        <div className="flex flex-col items-center justify-center gap-4 p-4 w-full max-w-3xl">
          <div className="grid grid-cols-2 gap-4 p-4 pb-2 w-full">
            <div>
              <label className="hidden" htmlFor="name">
                {t('ContactSection.name')}
              </label>
              <input
                id="name"
                type="text"
                placeholder={t('ContactSection.name')}
                required
                name="name"
                className="w-full p-4 bg-primary-150 text-[16px] text-primary-850 rounded-lg appearance-none border-2 border-primary-150 focus:outline-none focus:border-primary-300"
              />
            </div>
            <div>
              <label className="hidden" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                required
                className="w-full p-4 bg-primary-150 text-[16px] text-primary-850 rounded-lg appearance-none border-2 border-primary-150 focus:outline-none focus:border-primary-300"
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-8 p-4 pt-0">
            <div>
              <label className="hidden" htmlFor="message">
                {t('ContactSection.message')}
              </label>
              <textarea
                id="message"
                placeholder={t('ContactSection.message')}
                required
                name="message"
                rows={5}
                className="w-full p-4 bg-primary-150 text-[16px] text-primary-850 rounded-lg appearance-none border-2 border-primary-150 focus:outline-none focus:border-primary-300"
              />
            </div>
            <button
              type="submit"
              disabled={contactMessageStatus !== 'waiting'}
              className="w-full py-3 bg-[#121212] rounded-xl flex items-center justify-center gap-2 fill-primary-750 text-primary-750 outline outline-1 outline-[#19191a] hover:outline-primary-500"
            >
              <MailIcon size={22} />
              {t(`ContactSection.button.${contactMessageStatus}`)}
            </button>
          </div>
        </div>
      </form>
    </Section>
  )
}
