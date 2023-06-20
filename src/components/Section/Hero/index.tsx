import { motion } from "framer-motion";
import Lottie from "react-lottie";
import teamWorkAnimationLottie from "../../../assets/lottie/business-team.json";
import { useEffect, useRef } from "react";
import { stackIcons } from "../../icons/stackIcons";

const Text = {
  pt: {
    title: {
      first: "Não só um",
      last: "DESENVOLVEDOR FRONT-END",
      animationWords: ['DESENVOLVEDOR REACT', 'DESENVOLVEDOR FRONT-END']
    },
    description: `Desenvolver é só uma parte do processo, devemos entender claramente as
    dores do usuário final e manter um time unido com um propósito único
    para entregar excelência.`,
    button: "Me Contate",
  },
  en: {
    title: {
      first: "Not just a",
      last: "FRONT-END DEVELOPER",
      animationWords: ['REACT DEVELOPER', 'FRONT-END DEVELOPER',]
    },
    description: `Developing is just a part of the process, we must clearly understand
    the pain of the end user and keep a team together with a single
    purpose to deliver excellence.`,
    button: "Contact me",
  },
} as const;

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const HeroSection = ({ lang }: { lang: keyof typeof Text }) => {
  const intervalRef = useRef<NodeJS.Timer | null>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const intRef = useRef<number>(0)

  useEffect(() => {
    const run = () => {
      let iteration = 0
      const animationWords = Text[lang].title.animationWords
      const wordIndex = intRef.current;
      if (!titleRef.current) return;
      if (intervalRef.current) clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        if (!titleRef.current) return
        titleRef.current.innerText = animationWords[wordIndex].split("").map((letter: any, index: any) => {
          if (index < iteration) {
            return animationWords[wordIndex][index];
          }
          return letters[Math.floor(Math.random() * 26)]
        }).join("");

        if (iteration >= animationWords[wordIndex].length) {
          if (intervalRef.current) clearInterval(intervalRef.current)
        }

        iteration += 1 / 2;
      }, 20)

      if (intRef.current === 0) {
        intRef.current = 1
      } else {
        intRef.current = 0
      }
    }

    if (!titleRef.current) return
    titleRef.current.addEventListener('mouseover', run);

    const timeToTime = setInterval(run, 6000)

    return () => {
      if (timeToTime) clearInterval(timeToTime)
    }
  }, [lang])


  return (
    <section
      id="hero"
      className="min-h-screen w-full flex items-center justify-center sm:px-10"
    >
      <div className="sm:px-8 z-10 md:mr-80 sm:w-[910px] pb-24 sm:pb-0 px-2">
        <motion.h1
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.5,
            duration: 0.75,
          }}
          className="sm:text-4xl leading-[110%] tracking-tighter"
        >
          {Text[lang].title.first}
        </motion.h1>

        <motion.h1
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.5,
            duration: 0.75,
          }}
          className="font-black block text-xl sm:text-5xl leading-[110%] tracking-tighter break-all" data-value={Text[lang].title.last} ref={titleRef}
        >
          {Text[lang].title.last}
        </motion.h1>

        <motion.p
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 1,
            duration: 0.75,
          }}
          className="sm:max-w-lg mt-8 text-md sm:text-xl break-words"
        >
          {Text[lang].description}
        </motion.p>

        <ul className="hidden sm:flex translate-y-20 gap-2 sm:gap-16">{stackIcons.map((icon, index) => (
          <motion.li
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 0.7 + (0.1 * index),
              duration: 0.75,
            }}
            title={icon.title} 
            key={icon.title} 
            className="rounded-full sm:p-1 flex items-center justify-center"
            >
              {icon.icon}
            </motion.li>
        ))}
        </ul>

      </div>

      <div className="absolute bottom-0 right-0 opacity-80 flex justify-end overflow-hidden">
        <motion.div
          initial={{ x: '100%', y: 40, opacity: 0 }}
          animate={{ x: 30, y: 40, opacity: 1 }}
          transition={{
            delay: 1.25,
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
      </div>
    </section>
  );
};

export default HeroSection;
