import Image from "next/image";
import meJpg from "../../../../public/me-3.png";

const Text = {
  pt: {
    title: "Sobre",
    subTitle: "Meu nome é Lucas de Paula,",
    description: `Sou um desenvolvedor web autodidata e empreendedor, comecei a
    desenvolver aplicações para a web em 2018 quando decidi criar a
    minha propria startup. A ideia não deu certo, contudo em 1 ano de
    desenvolvimento de uma aplicação full stack sozinho me fez perceber
    o quanto eu sou apaixonado por criar ideias e tirar do papel.`,
    softSkillsTitle: "Soft Skills",
    firstSoftSkillTitle: "Visão Panorâmica",
    firstSoftSkillDescription: `Entender o todo e como cada parte se relaciona com o todo é uma
    das minhas maiores habilidades. E isso me ajuda a ter uma visão
    ampla de como o projeto deve ser desenvolvido.`,
    secondSoftSkillTitle: "Team Player",
    secondSoftSkillDescription: `Por já ter liderado alguns times, sei que o caminho correto se
    torna errado se o seu time não estiver de acordo. Portanto a
    colaboração é a chave para o sucesso.`,
    thirdSoftSkillTitle: "Criatividade",
    thirdSoftSkillDescription: `Por amar livros, filmes e musicas consigo ver o mundo de uma forma
    diferente. E isso me ajuda a criar soluções inovadoras.`,
    hardSkillsTitle: "Hard Skills",
    firstHardSkillTitle: "HTML, CSS e JS",
    firstHardSkillDescription: `Esses formam a base do desenvolvimento web, portanto sou um
    especialista.`,
    secondHardSkillTitle: "React e Typescript",
    secondHardSkillDescription: `Esses conquistaram meu coração, tenho conhecimento avançado e sou
    um entusiasta da biblioteca e linguagem.`,
    thirdHardSkillTitle: "Node Js e Socket Io",
    thirdHardSkillDescription: `Não sou um especialista em backend, contudo já construi muitas
    aplicações com essa dupla.`,
  },
  en: {
    title: "About",
    subTitle: "My name is Lucas de Paula,",
    description: `I'm a self-taught web developer and entrepreneur, I started
    develop web applications in 2018 when I decided to create my own
    startup. The idea did not work out, however in 1 year of development
    of a full stack application by myself made me realize how passionate
    I am about creating ideas and getting them off the paper.`,
    softSkillsTitle: "Soft Skills",
    firstSoftSkillTitle: "Panoramic View",
    firstSoftSkillDescription: `Understanding the whole and how each part relates to the whole is
    a of my greatest skills. And it helps me get a vision of how the
    project should be developed.`,
    secondSoftSkillTitle: "Team Player",
    secondSoftSkillDescription: `Having already led some teams, I know that the right path becomes
    wrong if your team doesn't agree. Therefore the collaboration
    is the key to success.`,
    thirdSoftSkillTitle: "Creativity",
    thirdSoftSkillDescription: `Because I love books, movies and music I can see the world in a
    different way. And that helps me create innovative solutions.`,
    hardSkillsTitle: "Hard Skills",
    firstHardSkillTitle: "HTML, CSS e JS",
    firstHardSkillDescription: `These form the basis of web development, so I'm an expert.`,
    secondHardSkillTitle: "React e Typescript",
    secondHardSkillDescription: `These won my heart, I have advanced knowledge.`,
    thirdHardSkillTitle: "Node Js e Socket Io",
    thirdHardSkillDescription: `I'm not a backend expert, but I've built many applications
    with this duo.`,
  },
} as const;
const AboutSection = ({ lang }: { lang: keyof typeof Text }) => {
  return (
    <section id="about" className="flex flex-col items-center p-8">
      <div>
        <h2 className="text-4xl text-center font-bold mb-16">
          {Text[lang].title}
        </h2>
      </div>
      <div className="flex flex-col items-center rounded-md text-black bg-gradient-to-b from-[#FFF] to-[#FFF] sm:flex-row drop-shadow-2xl">
        <Image
          className="h-40 w-40 mt-8 rounded-full sm:rounded-md sm:h-80 sm:w-40 sm:mt-0 object-cover"
          src={meJpg}
          alt="Lucas de Paula"
        />
        <div className="flex flex-col justify-center p-8">
          <h3 className="text-xl mb-8">{Text[lang].subTitle}</h3>
          <p className="max-w-lg">{Text[lang].description}</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-3xl text-left font-bold flex self-start mb-4">
          {Text[lang].softSkillsTitle}
        </h3>

        <div className="text-center flex flex-col gap-8 md:flex-row basis-1/3">
          <div className="flex flex-col items-center bg-white text-black rounded-md gap-2 p-4 max-w-sm flex-1 drop-shadow-2xl hover:scale-[1.05] transition ease-in-out">
            <Image src="/eye2.svg" height={50} width={50} alt="" />
            <h4 className="text-lg">{Text[lang].firstSoftSkillTitle}</h4>
            <p className="p-2">{Text[lang].firstSoftSkillDescription}</p>
          </div>

          <div className="flex flex-col items-center bg-white text-black rounded-md gap-2 p-4 max-w-sm flex-1 drop-shadow-2xl hover:scale-[1.05] transition ease-in-out">
            <Image src="/team2.svg" height={50} width={50} alt="" />
            <h4 className="text-lg">{Text[lang].secondSoftSkillTitle}</h4>
            <p className="p-2">{Text[lang].secondSoftSkillDescription}</p>
          </div>

          <div className="flex flex-col items-center bg-white text-black rounded-md gap-2 p-4 max-w-sm flex-1 drop-shadow-2xl hover:scale-[1.05] transition ease-in-out">
            <Image src="/bulb2.svg" height={50} width={50} alt="" />
            <h4 className="text-lg">{Text[lang].thirdHardSkillTitle}</h4>
            <p className="p-2">{Text[lang].thirdHardSkillDescription}</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-3xl text-left font-bold flex self-start mb-4">
          {Text[lang].hardSkillsTitle}
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
            <h4 className="text-lg">{Text[lang].firstHardSkillTitle}</h4>
            <p className="p-2">{Text[lang].firstHardSkillDescription}</p>
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
            <h4 className="text-lg">{Text[lang].secondHardSkillTitle}</h4>
            <p className="p-2">{Text[lang].secondHardSkillDescription}</p>
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
            <h4 className="text-lg">{Text[lang].thirdHardSkillTitle}</h4>
            <p className="p-2">{Text[lang].thirdHardSkillDescription}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
