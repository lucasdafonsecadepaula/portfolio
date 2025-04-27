import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { TimelineItem } from '@/data/timeline'

interface MobileTimelineItemProps {
  data: TimelineItem
}

export function MobileTimelineItem({ data }: MobileTimelineItemProps) {
  const t = useTranslations('Timeline')

  return (
    <div className="w-full flex flex-col gap-6 p-6 border-b border-border last:border-b-0">
      {/* Year and Company Header */}
      <div className="flex flex-col gap-2">
        <span
          className="text-4xl font-bold text-transparent tracking-tighter"
          style={{
            WebkitTextStroke: '1.5px rgb(156 163 175)',
          }}
        >
          {data.year}
        </span>
        <h4 className={`text-3xl font-bold tracking-tight ${data.companyColor}`}>
          {data.company}
        </h4>
      </div>

      {/* Description */}
      <p className="text-base text-muted-foreground leading-relaxed">
        {t(`descriptions.${data.descriptionKey}`)}
      </p>

      {/* Images */}
      <div className="flex flex-col gap-4">
        {data.images.map((image, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-xl shadow-lg aspect-[16/9] h-[200px]"
          >
            <Image
              src={image}
              alt={`${data.company} project image ${index + 1}`}
              fill
              className="object-cover rounded-xl"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
    </div>
  )
} 