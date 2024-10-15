'use client'
import {
  AwsIcon,
  JestIcon,
  NextJsIcon,
  NodeJsIcon,
  ReactJsIcon,
  StacksIcon,
  TypescriptIcon,
} from '@/app/components/icons'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Section } from '../Section'

interface StackWrapperProps {
  icon: ReactNode
  title: string
  body: string
  delay?: number
}

function StackWrapper({ icon, body, title, delay = 0 }: StackWrapperProps) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay }}
      viewport={{ once: true }}
      className="flex flex-col gap-4 w-full bg-primary-100 border border-primary-250 rounded-xl p-2 lg:p-[30px]"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-[60px] h-[60px] bg-[#19191a] border border-primary-350 rounded-xl p-1">
          {icon}
        </div>
        <p className="lg:text-[22px] text-[18px] font-semibold text-primary-800">
          {title}
        </p>
      </div>
      <div>
        <p className="text-[#999999] p-2">{body}</p>
      </div>
    </motion.div>
  )
}

export function MyStackSection() {
  return (
    <Section
      icon={<StacksIcon size={28} />}
      title="Minha Stack"
      description="Comprometido em se manter atualizado com as últimas tendências e
          técnicas de desenvolvimento."
    >
      <div className="grid md:grid-cols-2 gap-4 p-4">
        <StackWrapper
          icon={<ReactJsIcon size={40} />}
          title="ReactJS"
          body="React é a biblioteca para interfaces de usuário nativas e web."
          delay={0}
        />
        <StackWrapper
          icon={<TypescriptIcon size={40} />}
          title="TypeScript"
          body="O TypeScript estende o JavaScript adicionando tipos à linguagem."
          delay={0.1}
        />
        <StackWrapper
          icon={
            <div className="dark:invert">
              <NextJsIcon size={40} />
            </div>
          }
          title="NextJS"
          body="Usado por algumas das maiores empresas do mundo, o Next.js permite que você crie aplicativos web de alta qualidade com o poder dos componentes React."
          delay={0.2}
        />
        <StackWrapper
          icon={<NodeJsIcon size={40} />}
          title="NodeJS"
          body="Node.js® é um ambiente de execução JavaScript gratuito, de código aberto e multiplataforma que permite aos desenvolvedores criar servidores, aplicativos da web, ferramentas de linha de comando e scripts."
          delay={0.3}
        />
        <StackWrapper
          icon={
            <div className="bg-white rounded-lg p-1">
              <AwsIcon size={40} />
            </div>
          }
          title="AWS"
          body="AWS, é uma plataforma de serviços de computação em nuvem oferecida pela Amazon."
          delay={0.4}
        />
        <StackWrapper
          icon={<JestIcon size={40} />}
          title="Jest"
          body="Jest é um poderoso Framework de Testes em JavaScript com um foco na simplicidade."
          delay={0.5}
        />
      </div>
    </Section>
  )
}
