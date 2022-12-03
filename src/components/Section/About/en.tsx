import Image from "next/image";
import meJpg from "../../../../public/me-3.png";

const AboutSection = () => {
  return (
    <section id="about" className="flex flex-col items-center p-8">
      <div>
        <h2 className="text-4xl text-center font-bold mb-16">About</h2>
      </div>
      <div className="flex flex-col items-center rounded-md text-black bg-gradient-to-b from-[#FFF] to-[#FFF] sm:flex-row drop-shadow-2xl">
        <Image
          className="h-40 w-40 mt-8 rounded-full sm:rounded-md sm:h-80 sm:w-40 sm:mt-0 object-cover"
          src={meJpg}
          alt="Lucas de Paula"
        />
        <div className="flex flex-col justify-center p-8">
          <h3 className="text-xl mb-8">My name is Lucas de Paula,</h3>
          <p className="max-w-lg">
            {`I'm`} a self-taught web developer and entrepreneur, I started
            develop web applications in 2018 when I decided to create my own
            startup. The idea did not work out, however in 1 year of development
            of a full stack application by myself made me realize how passionate
            I am about creating ideas and getting them off the paper.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-3xl text-left font-bold flex self-start mb-4">
          Soft Skills
        </h3>

        <div className="text-center flex flex-col gap-8 md:flex-row basis-1/3">
          <div className="flex flex-col items-center bg-white text-black rounded-md gap-2 p-4 max-w-sm flex-1 drop-shadow-2xl hover:scale-[1.05] transition ease-in-out">
            <Image src="/eye2.svg" height={50} width={50} alt="" />
            <h4 className="text-lg">Panoramic view</h4>
            <p className="p-2">
              Understanding the whole and how each part relates to the whole is
              a of my greatest skills. And it helps me get a vision of how the
              project should be developed.
            </p>
          </div>

          <div className="flex flex-col items-center bg-white text-black rounded-md gap-2 p-4 max-w-sm flex-1 drop-shadow-2xl hover:scale-[1.05] transition ease-in-out">
            <Image src="/team2.svg" height={50} width={50} alt="" />
            <h4 className="text-lg">Team Player</h4>
            <p className="p-2">
              Having already led some teams, I know that the right path becomes
              wrong if your team {`doesn't`} agree. Therefore the collaboration
              is the key to success.
            </p>
          </div>

          <div className="flex flex-col items-center bg-white text-black rounded-md gap-2 p-4 max-w-sm flex-1 drop-shadow-2xl hover:scale-[1.05] transition ease-in-out">
            <Image src="/bulb2.svg" height={50} width={50} alt="" />
            <h4 className="text-lg">Creativity</h4>
            <p className="p-2">
              Because I love books, movies and music I can see the world in a
              different way. And that helps me create innovative solutions.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-3xl text-left font-bold flex self-start mb-4">
          Hard Skills
        </h3>

        <div className="text-center flex flex-col gap-8 md:flex-row basis-1/3">
          <div className="flex flex-col items-center bg-white text-black rounded-md gap-2 p-4 max-w-sm flex-1 drop-shadow-2xl hover:scale-[1.05] transition ease-in-out">
            <div className="flex">
              <Image src="/html5.svg" height={50} width={50} alt="html5 icon" />
              <Image
                src="/js.svg"
                height={50}
                width={50}
                alt="javascript icon"
              />
              <Image src="/css.svg" height={50} width={50} alt="css icon" />
            </div>
            <h4 className="text-lg">HTML, CSS e JS</h4>
            <p className="p-2">
              These form the basis of web development, so {`I'm`} an expert.
            </p>
          </div>

          <div className="flex flex-col items-center bg-white text-black rounded-md gap-2 p-4 max-w-sm flex-1 drop-shadow-2xl hover:scale-[1.05] transition ease-in-out">
            <div className="flex">
              <Image
                src="/react.svg"
                height={50}
                width={50}
                alt="react js icon"
              />
              <Image
                src="/ts.svg"
                height={50}
                width={50}
                alt="typescript icon"
              />
            </div>
            <h4 className="text-lg">React e Typescript</h4>
            <p className="p-2">
              These won my heart, I have advanced knowledge.
            </p>
          </div>

          <div className="flex flex-col items-center bg-white text-black rounded-md gap-2 p-4 max-w-sm flex-1 drop-shadow-2xl hover:scale-[1.05] transition ease-in-out">
            <div className="flex">
              <Image
                src="/node.svg"
                height={50}
                width={50}
                alt="node js icon"
              />
              <Image
                src="/socket.svg"
                height={50}
                width={50}
                alt="socket io icon"
              />
            </div>
            <h4 className="text-lg">Node Js e Socket Io</h4>
            <p className="p-2">
              {`I'm`} not a backend expert, but {`I've`} built many applications
              with this duo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
