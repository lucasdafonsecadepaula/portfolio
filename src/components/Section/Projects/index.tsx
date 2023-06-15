import { motion } from "framer-motion";
import Image from "next/image";
import { BsFillArrowRightCircleFill, BsGithub } from "react-icons/bs";
import movieNightImg from "../../../../public/movie-night2.png";
import notWhatsImg from "../../../../public/not-whats-project.png";

const Text = {
  pt: {
    title: "Projetos",
    projects: [
      {
        title: "Movie Night",
        description: `Aplicação criada com React e Styled-components, utilizando o Atomic Design System para criação dos componentes. A aplicação consome a API do The Movie Database para exibir os filmes e suas informações.`,
        website: "https://movienight-new.vercel.app/",
        repository: "https://github.com/lucasdafonsecadepaula/movie-night",
        image: movieNightImg,
      },
      {
        title: "Not Whats",
        description: `Aplicação criada com React, Typescript, Tailwindcss, Nodejs e Socket IO. A aplicação utiliza o WebSocket criado para enviar e receber mensagens em tempo real.`,
        website: "https://not-whats-web.vercel.app/",
        repository: "https://github.com/lucasdafonsecadepaula/not-whats-web",
        image: notWhatsImg,
      },
    ],
    goToWebsite: "Ir para o site",
    repository: "Repositório",
  },
  en: {
    title: "Projects",
    projects: [
      {
        title: "Movie Night",
        description: `Application created with React and Styled-components, using the
        Atomic Design System to create components. The application consumes
        The Movie Database API to display movies and their information.`,
        website: "https://movienight-new.vercel.app/",
        repository: "https://github.com/lucasdafonsecadepaula/movie-night",
        image: movieNightImg,
      },
      {
        title: "Not Whats",
        description: `Application created with React, Typescript, Tailwindcss, Nodejs and Socket IO. The application uses the created WebSocket to send and receive messages in real time.`,
        website: "https://not-whats-web.vercel.app/",
        repository: "https://github.com/lucasdafonsecadepaula/not-whats-web",
        image: notWhatsImg,
      },
    ],
    goToWebsite: "Go to website",
    repository: "Repository",
  },
} as const;

const ProjectsSection = ({ lang }: { lang: keyof typeof Text }) => {
  return (
    <section id="projects" className="flex flex-col items-center pb-8 pt-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 1 } }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl text-center font-bold mb-16">
          {Text[lang].title}
        </h2>
      </motion.div>

      <div className="flex flex-col gap-4">
        {Text[lang].projects.map(
          ({ title, description, image, website, repository }) => (
            <>
              <motion.div
                initial={{ opacity: 0, y: 200 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
                viewport={{ once: true }}
                className="flex flex-col items-center rounded-md sm:flex-row drop-shadow-md bg-white mx-8"
              >
                <Image
                  className="h-auto w-full rounded-md sm:h-auto sm:w-80 sm:mt-0 object-cover"
                  src={image}
                  alt="Lucas de Paula"
                />
                <div className="flex flex-col justify-center mx-4">
                  <h3 className="text-xl p-4">{title}</h3>
                  <p className="max-w-lg p-4 pt-0">{description}</p>
                  <div className="max-w-lg flex justify-end gap-4 p-2">
                    <a
                      className="text-blue-400 underline flex items-center gap-2"
                      href={website}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <BsFillArrowRightCircleFill />
                      {Text[lang].goToWebsite}
                    </a>
                    <a
                      className="text-blue-400 underline flex items-center gap-2"
                      href={repository}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <BsGithub />
                      {Text[lang].repository}
                    </a>
                  </div>
                </div>
              </motion.div>
            </>
          )
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
