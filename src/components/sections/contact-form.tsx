'use client'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import emailjs from '@emailjs/browser'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.email({ message: 'Please enter a valid email address.' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' }),
})

export function ContactFormSection() {
  const t = useTranslations('Contact')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    if (!formRef.current) return

    emailjs
      .sendForm(
        'service_7k0uu2o',
        'template_3rosprc',
        formRef.current,
        'e6RFGTnjZxKQST0fP',
      )
      .then(() => {
        setIsSubmitting(false)
        form.reset()
        toast.success(t('form.success'))
      })
      .catch(() => {
        setIsSubmitting(false)
        toast.error(t('form.error'))
      })
  }

  return (
    <section
      id="contact"
      className="relative border-t border-[var(--line)] bg-card/50 px-5 py-28 sm:px-8 lg:px-12 lg:py-36"
    >
      <div className="mx-auto grid max-w-[1180px] items-start gap-14 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="eyebrow mb-5">04 · Contact</div>
          <h2 className="font-display text-4xl font-bold leading-[1.08] tracking-tight lg:text-[44px]">
            {t('title')}
          </h2>
          <p className="mt-5 max-w-[460px] text-[17px] leading-relaxed text-muted-foreground">
            {t('subtitle')}
          </p>
        </motion.div>
        <motion.div
          className="rounded-[20px] border border-[var(--line)] bg-card p-7 sm:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <Form {...form}>
            <form
              ref={formRef}
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.name')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('form.namePlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.email')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('form.emailPlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.message')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('form.messagePlaceholder')}
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? t('form.sending') : t('form.submit')}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  )
}
