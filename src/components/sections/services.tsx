import { Card, CardContent } from '@/components/ui/card'
import * as motion from 'motion/react-client'
import { useTranslations } from 'next-intl'

export function ServicesSection() {
  const t = useTranslations('Services')

  const services = [
    {
      title: t('services.responsiveDesign.title'),
      description: t('services.responsiveDesign.description'),
    },
    {
      title: t('services.backendSolutions.title'),
      description: t('services.backendSolutions.description'),
    },
    {
      title: t('services.performance.title'),
      description: t('services.performance.description'),
    },
    {
      title: t('services.uxui.title'),
      description: t('services.uxui.description'),
    },
    {
      title: t('services.webApps.title'),
      description: t('services.webApps.description'),
    },
    {
      title: t('services.refactoring.title'),
      description: t('services.refactoring.description'),
    },
  ]

  return (
    <section className="py-44 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full shadow-md hover:shadow-lg relative accent-shard hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
