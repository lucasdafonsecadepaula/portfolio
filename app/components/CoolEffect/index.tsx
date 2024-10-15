import { getRandomInt } from '@/app/utils/getRandomInt'
import { motion } from 'framer-motion'

const times = [0, 0.1, 0.2, 0.3]

export function CoolEffect() {
  const divArray = Array.from({ length: 36 })
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 grid grid-cols-6 grid-rows-6">
      {divArray.map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: times[getRandomInt(4)] }}
          className="bg-primary-50 h-full w-full z-50"
        ></motion.div>
      ))}
    </div>
  )
}
