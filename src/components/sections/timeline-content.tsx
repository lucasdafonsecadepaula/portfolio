import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { AnimatedText } from '../ui/animated-text'
import { TimelineItem } from '@/data/timeline'

interface TimelineContentProps {
  currentData: TimelineItem
}

export function TimelineContent({ currentData }: TimelineContentProps) {
  const t = useTranslations('Timeline')

  return (
    <div className="w-full flex flex-col md:flex-row justify-between gap-4 md:gap-8 lg:gap-16 px-4 md:px-0">
      {/* Text Column - Vertical layout with year, company, description */}
      <div className="w-full md:w-1/2 flex flex-col p-4 md:p-8">
        {/* Year with outline text */}
        <div className="mb-2 md:mb-6">
          <span
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-transparent tracking-tighter"
            style={{
              WebkitTextStroke: '1.5px rgb(156 163 175)',
            }}
          >
            <AnimatedText text={currentData.year} />
          </span>
        </div>

        {/* Company name with dynamic color */}
        <div className="mb-4 md:mb-10">
          <h4
            className={`text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight ${currentData.companyColor}`}
          >
            <AnimatedText text={currentData.company} />
          </h4>
        </div>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed tracking-wide">
          {t(`descriptions.${currentData.descriptionKey}`)}
        </p>
      </div>

      {/* Images Column - Two images stacked vertically */}
      <div className="w-full md:w-1/2 flex flex-col gap-4 md:gap-8 p-4 md:p-8 mb-8 md:mb-16">
        {currentData.images.map((image, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl aspect-[16/9] h-[200px] sm:h-[250px] md:h-[300px]"
          >
            <Image
              src={image}
              alt={`${currentData.company} project image ${index + 1}`}
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