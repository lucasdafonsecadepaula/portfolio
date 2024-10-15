'use client'
import archofficeLogo from '@/app/assets/imgs/archoffice.png'
import smartNxLogo from '@/app/assets/imgs/smart-nx.png'
import { BusinessCenterIcon } from '@/app/components/icons'
import { motion } from 'framer-motion'
import Image from 'next/image'
import type { ReactNode } from 'react'
import { Section } from '../Section'

interface JobWrapperProps {
  companyLogo: ReactNode
  companyName: string
  companyTextUrl: string
  companyUrl: string
  companyMainFunction: string
  companyDate: string
  children?: ReactNode
}

interface JobFunctionProps {
  title: string
  body: ReactNode
}

function JobFunction({ body, title }: JobFunctionProps) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="p-4 bg-[#050505] rounded-xl border border-primary-250"
    >
      <p className="font-semibold text-primary-800 text-[18px]">{title}</p>
      <div className="pt-2 text-primary-700 text-[17px]">{body}</div>
    </motion.div>
  )
}

function JobWrapper({
  companyLogo,
  companyDate,
  companyMainFunction,
  companyName,
  companyTextUrl,
  companyUrl,
  children,
}: JobWrapperProps) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="flex flex-col gap-8 w-full bg-primary-100 border border-primary-250 rounded-xl p-[30px]"
    >
      <div className="flex justify-between">
        <div className="flex gap-4">
          <div className="w-[60px] h-[60px] bg-[#19191a] flex items-center justify-center border border-primary-350 rounded-xl p-1">
            {companyLogo}
          </div>
          <div>
            <p className="text-[22px] text-primary-800 font-semibold">
              {companyName}
            </p>
            <p className="text-[12px] md:hidden">{companyMainFunction}</p>
            <a
              target="_blank"
              href={companyUrl}
              className="text-[#999999] hover:text-[#cccccc] underline"
            >
              {companyTextUrl}
            </a>
          </div>
          <div className="hidden md:block">
            <p className="text-[#999999] border border-primary-250 bg-[#0F0F10] rounded-2xl px-2 py-1">
              {companyMainFunction}
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-[24px] font-semibold text-primary-800">
            {companyDate}
          </p>
        </div>
      </div>
      {children}
    </motion.div>
  )
}

export function JobExperiencesSection() {
  return (
    <Section
      icon={<BusinessCenterIcon size={28} />}
      title="Minhas experiências"
      description="Navegando por ambientes diversos com adaptabilidade e profissionalismo."
    >
      <div className="flex flex-col gap-14">
        <JobWrapper
          companyMainFunction="Arquitetura de Sistemas"
          companyName="ArchOffice"
          companyUrl="https://www.archoffice.tech/"
          companyTextUrl="archoffice.tech"
          companyDate="2023"
          companyLogo={
            <Image src={archofficeLogo} width={100} alt="Image of Nandi" />
          }
        >
          <JobFunction
            title="Desenvolvedor Front-end"
            body={
              <>
                Atuei como desenvolvedor front-end líder, contribuindo
                significativamente para diversos projetos de empresas
                terceirizadas em diferentes setores e utilizando uma variedade
                de tecnologias.
                <div className="p-2" />
                Iniciei minha jornada colaborando com a Axis Mobfintech, onde
                desenvolvi projetos do zero e mantive bibliotecas privadas
                exclusivas da empresa. Entre os projetos destacados, trabalhei
                na apresentação em tempo real de dashboards de compras
                realizadas e no cadastro de POS (pontos de venda). Todos os
                projetos na Axis foram desenvolvidos com React e TypeScript,
                permitindo uma interface interativa e responsiva.
                <div className="p-2" />
                Além disso, colaborei com a Spdata em dois projetos de gestão
                hospitalar utilizando Vue.js, onde fiz integrações com sistemas
                governamentais, enfrentando desafios técnicos e regulatórios.
                <div className="p-2" />
                Uma das minhas maiores contribuições foi para a Versatus HPC,
                onde desenvolvi a maior parte do projeto Kosen Energy, voltado
                para previsões meteorológicas e precificação. Este projeto
                apresentou um nicho muito específico, e o maior desafio foi a
                criação desacoplada dos elementos das telas de relatórios, que
                incluíam diversos gráficos e filtros. Cada tela foi projetada
                para ser gerada dinamicamente via API, permitindo que todos os
                componentes do front-end fossem criados de forma modular.
              </>
            }
          />
          <JobFunction
            title="UX Designer"
            body={
              <>
                Aceitei o desafio de me aprofundar no universo de UX e, em
                alguns projetos, atuei como UX Designer, reestruturando telas
                para melhorar a usabilidade e alinhar o design às necessidades
                dos usuários finais. Em projetos da Axis Mobfintech, fiz ajustes
                de UX, mas o maior destaque foi minha atuação no projeto da
                Versatus HPC. Lá, sugeri e implementei alterações significativas
                na aplicação, que foram altamente elogiadas pelo product owner,
                principalmente pela forma como as mudanças otimizaram a
                experiência do usuário e trouxeram melhorias visíveis na
                navegabilidade.
              </>
            }
          />
        </JobWrapper>
        <JobWrapper
          companyName="SmartNX"
          companyMainFunction="Solução Omnichannel"
          companyUrl="https://www.smartnx.com/"
          companyTextUrl="smartnx.com"
          companyDate="2020-2022"
          companyLogo={
            <Image
              src={smartNxLogo}
              width={100}
              alt="Image of Nandi"
              className="grayscale invert-[50%]"
            />
          }
        >
          <JobFunction
            title="Desenvolvedor Front-end"
            body={
              <>
                Contribuí para o desenvolvimento do NxSuite, uma plataforma SAAS
                de chatbot que otimiza a criação de fluxos de atendimento
                automáticos, conectando negócios e clientes de maneira
                eficiente. Iniciei no time de atendimento ao cliente em tempo
                real, desenvolvendo uma interface dinâmica com React JS e
                WebSocket, utilizando a biblioteca Socket.IO. Além de
                desenvolver, implementei melhorias no layout da interface,
                resultando em uma experiência de atendimento mais intuitiva e
                eficiente para os usuários.
                <div className="p-2" />
                Posteriormente, fui promovido para os times de integração e
                dados, onde liderava a implementação de integrações com APIs
                externas de parceiros, como a VTEX, além de desenvolver
                interfaces que suportavam a visualização e o upload de grandes
                volumes de dados. Durante esse período, mentoriei dois
                desenvolvedores estagiários, acompanhando seu progresso até que
                fossem promovidos a desenvolvedores juniores.
                <div className="p-2" />
                Realizei uma refatoração significativa no código do projeto,
                aplicando o paradigma funcional e utilizando metodologias como
                DRY e KISS, focando em funções puras e imutabilidade. Além
                disso, introduzi a metodologia de Atomic Design no projeto,
                melhorando a consistência dos componentes. Também identifiquei e
                corrigi um comportamento que causava diversas re-renderizações
                desnecessárias ao utilizar a biblioteca Ant Design, otimizando a
                performance da aplicação. Adicionalmente, encontrei uma
                vulnerabilidade de SQL Injection no sistema e contribuí
                diretamente para a sua resolução, garantindo maior segurança
                para os dados dos usuários.
              </>
            }
          />
        </JobWrapper>
      </div>
    </Section>
  )
}
