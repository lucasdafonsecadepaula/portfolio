import Image from "next/image";
import { BsFillArrowRightCircleFill, BsGithub } from "react-icons/bs";
import movieNight from "../../../../public/movie-night2.png";

const Text = {
  pt: {
    title: "Projetos",
    firstProjectTitle: "Movie Night",
    firstProjectDescription: `Aplicação criada com React e Styled-components, utilizando o Atomic
    Design System para criação dos componentes. A aplicação consome a
    API do The Movie Database para exibir os filmes e suas informações.`,
    goToWebsite: "Ir para o site",
    repository: "Repositório",
  },
  en: {
    title: "Projects",
    firstProjectTitle: "Movie Night",
    firstProjectDescription: `Application created with React and Styled-components, using the
    Atomic Design System to create components. The application consumes
    The Movie Database API to display movies and their information.`,
    goToWebsite: "Go to website",
    repository: "Repository",
  },
} as const;

const ProjectsSection = ({ lang }: { lang: keyof typeof Text }) => {
  return (
    <section id="projects" className="flex flex-col items-center pb-8 pt-16">
      <div>
        <h2 className="text-4xl text-center font-bold mb-16">
          {Text[lang].title}
        </h2>
      </div>
      <div className="flex flex-col items-center rounded-md sm:flex-row drop-shadow-2xl bg-white text-black mx-8">
        <Image
          className="h-auto w-full rounded-md sm:h-auto sm:w-80 sm:mt-0 object-cover"
          src={movieNight}
          alt="Lucas de Paula"
        />
        <div className="flex flex-col justify-center mx-4">
          <h3 className="text-xl p-4">{Text[lang].firstProjectTitle}</h3>
          <p className="max-w-lg p-4 pt-0">
            {Text[lang].firstProjectDescription}
          </p>
          <div className="max-w-lg flex justify-end gap-4 p-2">
            <a
              className="text-blue-400 underline flex items-center gap-2"
              href="https://movienight-new.vercel.app/"
              target="_blank"
              rel="noreferrer"
            >
              <BsFillArrowRightCircleFill />
              {Text[lang].goToWebsite}
            </a>
            <a
              className="text-blue-400 underline flex items-center gap-2"
              href="https://movienight-new.vercel.app/"
              target="_blank"
              rel="noreferrer"
            >
              <BsGithub />
              {Text[lang].repository}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
