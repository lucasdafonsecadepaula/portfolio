import Image from "next/image";
import meJpg from "../../../../public/me-3.png";

const AboutSection = () => {
  return (
    <section id="about" className="flex flex-col items-center p-8">
      <div>
        <h2 className="text-4xl text-center font-bold mb-16">Sobre</h2>
      </div>
      <div className="flex flex-col items-center rounded-md text-black bg-gradient-to-b from-[#FFF] to-[#FFF] sm:flex-row drop-shadow-2xl">
        <Image
          className="h-40 w-40 mt-8 rounded-full sm:rounded-md sm:h-80 sm:w-40 sm:mt-0 object-cover"
          src={meJpg}
          alt="Lucas de Paula"
        />
        <div className="flex flex-col justify-center p-8">
          <h3 className="text-xl mb-8">Meu nome é Lucas de Paula,</h3>
          <p className="max-w-lg">
            Sou um desenvolvedor web autodidata e empreendedor, comecei a
            desenvolver aplicações para a web em 2018 quando decidi criar a
            minha propria startup. A ideia não deu certo, contudo em 1 ano de
            desenvolvimento de uma aplicação full stack sozinho me fez perceber
            o quanto eu sou apaixonado por criar ideias e tirar do papel.
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
            <h4 className="text-lg">Visão Panorâmica</h4>
            <p className="p-2">
              Entender o todo e como cada parte se relaciona com o todo é uma
              das minhas maiores habilidades. E isso me ajuda a ter uma visão
              ampla de como o projeto deve ser desenvolvido.
            </p>
          </div>

          <div className="flex flex-col items-center bg-white text-black rounded-md gap-2 p-4 max-w-sm flex-1 drop-shadow-2xl hover:scale-[1.05] transition ease-in-out">
            <Image src="/team2.svg" height={50} width={50} alt="" />
            <h4 className="text-lg">Team Player</h4>
            <p className="p-2">
              Por já ter liderado alguns times, sei que o caminho correto se
              torna errado se o seu time não estiver de acordo. Portanto a
              colaboração é a chave para o sucesso.
            </p>
          </div>

          <div className="flex flex-col items-center bg-white text-black rounded-md gap-2 p-4 max-w-sm flex-1 drop-shadow-2xl hover:scale-[1.05] transition ease-in-out">
            <Image src="/bulb2.svg" height={50} width={50} alt="" />
            <h4 className="text-lg">Criatividade</h4>
            <p className="p-2">
              Por amar livros, filmes e musicas consigo ver o mundo de uma forma
              diferente. E isso me ajuda a criar soluções inovadoras.
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
              Esses formam a base do desenvolvimento web, portanto sou um
              especialista.
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
              Esses conquistaram meu coração, tenho conhecimento avançado e sou
              um entusiasta da biblioteca e linguagem.
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
              Não sou um especialista em backend, contudo já construi muitas
              aplicações com essa dupla.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
