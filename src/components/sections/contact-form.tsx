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
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import emailjs from '@emailjs/browser'
import { toast } from 'sonner'

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
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
    <section className="bg-background py-20" id="contact">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
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
