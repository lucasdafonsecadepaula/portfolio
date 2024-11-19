'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface AccordionItemProps {
  title: string
  content: string
  isOpen: boolean
  onClick: () => void
}

const AccordionItem = ({
  title,
  content,
  isOpen,
  onClick,
}: AccordionItemProps) => {
  return (
    <div className="border-b border-primary-400">
      <button
        className="w-full flex justify-between items-center p-4"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-primary-800">{title}</span>
        <ChevronDown
          className={`w-5 h-5 text-primary-800 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-40' : 'max-h-0'
        }`}
      >
        <div className="p-4 bg-primary-200 font-light">{content}</div>
      </div>
    </div>
  )
}

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(-1)

  const items = [
    {
      title: 'What is flashcards?',
      content:
        'Flashcards are a learning tool used for memorization and active recall, typically consisting of two sides. One side contains a question, term, or prompt, while the other side provides the answer or an explanation. They are widely used for studying languages, exam preparation, or learning new concepts, as the process of repeatedly testing oneself with flashcards helps reinforce knowledge and improve memory retention.',
    },
    {
      title: 'How it work?',
      content:
        'Apresentaremos um card para voce com uma pergunta, voce responde a pergunta mentalmente, depois voce confere a resposta, e clica em facil, medio, ou dificil, apartir dai salvaremos suas respostar em localstorage com uma data e conseguiremos alterar a taxa com qual mostramos esse card novamente para voce.',
    },
  ]

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <div className="w-full bg-primary-100 text-primary-800 max-w-2xl mx-auto rounded-lg border border-primary-400 divide-y divide-primary-400">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  )
}

export default Accordion
