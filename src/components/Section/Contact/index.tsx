import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import {
  BsFillEnvelopeFill,
  BsGithub,
  BsLinkedin,
  BsWhatsapp,
} from "react-icons/bs";
import { MdDone, MdOutlineErrorOutline, MdOutlineMail } from "react-icons/md";

type ContactMessageProps = "waiting" | "sending" | "success" | "error";

const Text = {
  pt: {
    title: "Contato",
    label: {
      name: "Nome",
      email: "Email",
      message: "Mensagem",
    },
    buttonStatus: {
      send: "Enviar",
      sending: "Enviando...",
      sent: "Enviado",
      error: "Falha ao enviar",
    },
  },
  en: {
    title: "Contact",
    label: {
      name: "Name",
      email: "Email",
      message: "Message",
    },
    buttonStatus: {
      send: "Send",
      sending: "Sending...",
      sent: "Sent",
      error: "Failed to send",
    },
  },
} as const;

const ContactSection = ({ lang }: { lang: "pt" | "en" }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [contactMessageStatus, setContactMessageStatus] =
    useState<ContactMessageProps>("waiting");

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("form submitted", formRef.current);
    if (formRef.current === null) return;

    setContactMessageStatus("sending");
    emailjs
      .sendForm(
        "service_7k0uu2o",
        "template_3rosprc",
        formRef.current,
        "e6RFGTnjZxKQST0fP"
      )
      .then((result) => {
        setContactMessageStatus("success");
      })
      .catch((error) => {
        setContactMessageStatus("error");
        setTimeout(() => {
          setContactMessageStatus("waiting");
        }, 3000);
      });
  };

  return (
    <section id="contact" className="flex flex-col items-center pb-8 pt-16">
      <div>
        <h2 className="text-4xl text-center font-bold mb-16">
          {Text[lang].title}
        </h2>
      </div>
      <div className="flex flex-col sm:flex-row sm:gap-20">
        <form
          ref={formRef}
          className="flex flex-col gap-14 px-10"
          onSubmit={onSubmit}
        >
          <div className="relative">
            <input
              name="name"
              required
              className="peer flex w-full rounded-md focus:border-tertiary focus:ring-tertiary focus:drop-shadow-md"
              type="text"
              id="name"
            />
            <label
              htmlFor="name"
              className="absolute top-[-26px] peer-focus:opacity-90 peer-focus:scale-95 transition-all"
            >
              {Text[lang].label.name}
            </label>
          </div>
          <div className="relative">
            <input
              name="email"
              required
              className="peer flex w-full rounded-md focus:border-tertiary focus:ring-tertiary focus:drop-shadow-md"
              type="email"
              id="email"
            />
            <label
              htmlFor="email"
              className="absolute top-[-26px] peer-focus:opacity-90 peer-focus:scale-95 transition-all"
            >
              {Text[lang].label.email}
            </label>
          </div>

          <div className="relative">
            <textarea
              name="message"
              required
              className="peer flex w-full rounded-md focus:border-tertiary focus:ring-tertiary focus:drop-shadow-md h-40 resize-none"
              id="message"
              rows={4}
              cols={50}
            />
            <label
              htmlFor="message"
              className="absolute top-[-26px] peer-focus:opacity-90 peer-focus:scale-95 transition-all"
            >
              {Text[lang].label.message}
            </label>
          </div>

          <button type="submit" disabled={contactMessageStatus !== "waiting"}>
            {contactMessageStatus === "waiting" && (
              <div className="w-full h-full p-2 bg-tertiary rounded-md flex justify-center items-center gap-4 text-primary">
                <BsFillEnvelopeFill />
                {Text[lang].buttonStatus.send}
              </div>
            )}
            {contactMessageStatus === "sending" && (
              <div className="w-full h-full p-2 bg-tertiary rounded-md flex justify-center items-center gap-4 text-primary">
                <AiOutlineLoading className="animate-spin" />
                {Text[lang].buttonStatus.sending}
              </div>
            )}
            {contactMessageStatus === "success" && (
              <div className="w-full h-full p-2 bg-[#21FA90] rounded-md flex justify-center items-center gap-4 text-primary">
                <MdDone />
                {Text[lang].buttonStatus.sent}
              </div>
            )}
            {contactMessageStatus === "error" && (
              <div className="w-full h-full p-2 bg-[#F45866] rounded-md flex justify-center items-center gap-4 text-primary">
                <MdOutlineErrorOutline />
                {Text[lang].buttonStatus.error}
              </div>
            )}
          </button>
        </form>
        <div className="px-6 pt-16 flex flex-col gap-8 overflow-hidden sm:pt-0 text-ellipsis">
          <a
            onClick={() => {
              navigator.clipboard.writeText("lucasdafonsecadepaula@gmail.com");
            }}
            className="flex flex-wrap items-center hover:scale-105 cursor-pointer sm:p-2 text-center"
            rel="noreferrer"
          >
            <MdOutlineMail className="mr-2" />
            <h4 className="text-lg text-center font-bold max-[365px]:text-xs">
              Email:&nbsp;
            </h4>
            <p className="text-sm max-[365px]:text-xs">
              lucasdafonsecadepaula@gmail.com
            </p>
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/lucas-da-fonseca-de-paula/"
            className="flex flex-wrap items-center hover:scale-105 cursor-pointer sm:p-2"
            rel="noreferrer"
          >
            <BsLinkedin className="mr-2 text-[14px]" />
            <h4 className="text-lg text-center font-bold max-[365px]:text-xs">
              Linkedin:&nbsp;
            </h4>
            <p className="text-sm max-[365px]:text-xs">
              lucas da fonseca de paula
            </p>
          </a>
          <a
            target="_blank"
            href="https://wa.me/5532991228037"
            className="flex flex-wrap items-center hover:scale-105 cursor-pointer sm:p-2"
            rel="noreferrer"
          >
            <BsWhatsapp className="mr-2" />
            <h4 className="text-lg text-center font-bold max-[365px]:text-xs">
              Whatsapp:&nbsp;
            </h4>
            <p className="text-sm max-[365px]:text-xs">+55 32 99122-8037</p>
          </a>
          <a
            target="_blank"
            href="https://github.com/lucasdafonsecadepaula"
            className="flex flex-wrap items-center hover:scale-105 cursor-pointer sm:p-2"
            rel="noreferrer"
          >
            <BsGithub className="mr-2" />
            <h4 className="text-lg text-center font-bold max-[365px]:text-xs">
              Github:&nbsp;
            </h4>
            <p className="text-sm max-[365px]:text-xs">lucasdafonsecadepaula</p>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
