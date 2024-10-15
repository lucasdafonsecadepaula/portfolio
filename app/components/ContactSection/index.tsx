import { MailIcon } from '../icons'
import { Section } from '../Section'

export function ContactSection() {
  return (
    <Section
      icon={<MailIcon size={28} />}
      title="Me contate"
      description="Aberto a propostas, duvidas sobre programação e se voce já trabalhou
        comigo deixa uma mensagem para entrar como testemunho."
    >
      <div className="flex flex-col items-center justify-center gap-4 p-4">
        <div className="grid grid-cols-2 gap-4 p-4 pb-2 w-full">
          <div>
            <label className="hidden" htmlFor="name">
              Nome
            </label>
            <input
              id="name"
              type="text"
              placeholder="Name"
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
              className="w-full p-4 bg-primary-150 text-[16px] text-primary-850 rounded-lg appearance-none border-2 border-primary-150 focus:outline-none focus:border-primary-300"
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-8 p-4 pt-0">
          <div>
            <label className="hidden" htmlFor="mensage">
              Mensagem
            </label>
            <textarea
              id="mensage"
              placeholder="Mensagem"
              rows={5}
              className="w-full p-4 bg-primary-150 text-[16px] text-primary-850 rounded-lg appearance-none border-2 border-primary-150 focus:outline-none focus:border-primary-300"
            />
          </div>
          <button className="w-full py-3 bg-[#121212] rounded-xl flex items-center justify-center gap-2 fill-primary-750 text-primary-750 outline outline-1 outline-[#19191a] hover:outline-primary-500">
            <MailIcon size={22} />
            Envie sua mensagem
          </button>
        </div>
      </div>
    </Section>
  )
}
