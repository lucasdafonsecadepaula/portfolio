import Image from "next/image";
import { BsFillArrowRightCircleFill, BsGithub } from "react-icons/bs";
import movieNight from "../../../../public/movie-night2.png";

const ProjectsSection = () => {
  return (
    <section id="projects" className="flex flex-col items-center pb-8 pt-16">
      <div>
        <h2 className="text-4xl text-center font-bold mb-16">Projects</h2>
      </div>
      <div className="flex flex-col items-center rounded-md sm:flex-row drop-shadow-2xl bg-white text-black mx-8">
        <Image
          className="h-auto w-full rounded-md sm:h-auto sm:w-80 sm:mt-0 object-cover"
          src={movieNight}
          alt="Lucas de Paula"
        />
        <div className="flex flex-col justify-center mx-4">
          <h3 className="text-xl p-4">Movie Night</h3>
          <p className="max-w-lg p-4 pt-0">
            Application created with React and Styled-components, using the
            Atomic Design System to create components. The application consumes
            The Movie Database API to display movies and their information.
          </p>
          <div className="max-w-lg flex justify-end gap-4 p-2">
            <a
              className="text-blue-400 underline flex items-center gap-2"
              href="https://movienight-new.vercel.app/"
              target="_blank"
              rel="noreferrer"
            >
              <BsFillArrowRightCircleFill />
              Go to website
            </a>
            <a
              className="text-blue-400 underline flex items-center gap-2"
              href="https://movienight-new.vercel.app/"
              target="_blank"
              rel="noreferrer"
            >
              <BsGithub />
              Repository
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
