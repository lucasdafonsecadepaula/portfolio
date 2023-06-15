import { motion } from "framer-motion";
import Lottie from "react-lottie";
import teamWorkAnimationLottie from "../../../assets/lottie/business-team.json";

const Text = {
  pt: {
    title: {
      first: "Não só um",
      last: "Desenvolvedor Web",
    },
    description: `Desenvolver é só uma parte do processo, devemos entender claramente as
    dores do usuário final e manter um time unido com um propósito único
    para entregar excelência.`,
    button: "Me Contate",
  },
  en: {
    title: {
      first: "Not just a",
      last: "Web Developer",
    },
    description: `Developing is just a part of the process, we must clearly understand
    the pain of the end user and keep a team together with a single
    purpose to deliver excellence.`,
    button: "Contact me",
  },
} as const;

const HeroSection = ({ lang }: { lang: keyof typeof Text }) => {
  return (
    <section
      id="hero"
      className="min-h-screen w-full flex items-center justify-center sm:px-10"
    >
      <div className="px-8 z-10 md:mr-80">
        <motion.h1
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.5,
            duration: 0.75,
          }}
          className="text-3xl sm:text-6xl leading-[110%] tracking-tighter"
        >
          {Text[lang].title.first}{" "}
          <span className="font-black">{Text[lang].title.last}</span>
        </motion.h1>

        <motion.p
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.75,
            duration: 0.75,
          }}
          className="max-w-lg mt-8 text-md sm:text-xl"
        >
          {Text[lang].description}
        </motion.p>
        {/* <motion.button
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.75,
            duration: 0.75,
          }}
          className="cursor-pointer p-2 bg-tertiary rounded-md mt-8 sm:text-lg"
        >
          <a href="#contact">{Text[lang].button}</a>
        </motion.button> */}
      </div>
      <div className="absolute bottom-0 right-0 opacity-80 flex justify-end">
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 1,
            duration: 0.75,
          }}
          className="md:h-1/2 md:w-1/2 sm:h-96 sm:w-96"
        >
          <Lottie
            speed={0.6}
            options={{
              loop: true,
              autoplay: true,
              animationData: teamWorkAnimationLottie,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            }}
            height="100%"
            width="100%"
          />
        </motion.div>
        <div className="absolute top-0 bottom-0 left-0 right-0" />
      </div>
    </section>
  );
};

export default HeroSection;
