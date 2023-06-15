import classNames from "classnames";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import BrazilianFlag from "../icons/BrazilianFlag";
import EnglishFlag from "../icons/EnglishFlag";

const Text = {
  pt: {
    language: "English Version",
    flag: <EnglishFlag />,
    about: "Sobre",
    projects: "Projetos",
    contact: "Contato",
    link: "/en",
  },
  en: {
    language: "Versão em português",
    flag: <BrazilianFlag />,
    about: "About",
    projects: "Projects",
    contact: "Contact",
    link: "/",
  },
} as const;

const Header = ({ lang }: { lang: keyof typeof Text }) => {
  const [isOpenHamburgerMenu, setIsOpenHamburgerMenu] = useState(false);

  useEffect(() => {
    const closeHamburgerMenu = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpenHamburgerMenu(false);
      }
    };

    document.addEventListener("keydown", closeHamburgerMenu);

    return () => {
      document.removeEventListener("keydown", closeHamburgerMenu);
    };
  }, []);

  const gotTo = (section: "hero" | "about" | "projects" | "contact") => {
    setIsOpenHamburgerMenu(false);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={classNames(
        "z-20 flex justify-between fixed top-0 py-3 w-full",
        "bg-primary drop-shadow-md items-center lg:px-40"
      )}
    >
      <div>
        <a
          onClick={() => gotTo("hero")}
          className="font-bold p-1 cursor-pointer focus:after:w-full focus:after:left-[0%] hover:after:w-full hover:after:left-[0%] relative ease-[cubic-bezier(0.25,0.8,0.25,1)] duration-[400ms] transition-[color] border-[none] after:content-[''] after:pointer-events-none after:absolute after:w-[0%] after:h-0.5 after:bg-tertiary after:ease-[cubic-bezier(0.25,0.8,0.25,1)] after:duration-[400ms] after:transition-[width,left] after:left-2/4 after:-bottom-0.5"
        >
          Lucas
        </a>
      </div>
      <div className="flex gap-6 mr-4">
        <button
          className="order-2 sm:hidden"
          onClick={() => setIsOpenHamburgerMenu(true)}
        >
          <GiHamburgerMenu fontSize={24} />
        </button>
        <ul
          className={classNames(
            "flex-col fixed top-0 left-0",
            "h-screen w-screen z-30 bg-primary justify-center items-center",
            "sm:flex sm:flex-row sm:relative sm:h-auto sm:w-auto gap-6",
            `${isOpenHamburgerMenu ? "flex" : "sm:flex hidden"}`
          )}
        >
          <span
            className="absolute top-0 left-0 p-4 sm:hidden"
            onClick={() => setIsOpenHamburgerMenu(false)}
          >
            <GrClose id="close-hamburgermenu-icon" />
          </span>
          <li>
            <Link
              href={Text[lang].link}
              className="flex items-center p-1 gap-2 cursor-pointer font-bold focus:after:w-full focus:after:left-[0%] hover:after:w-full hover:after:left-[0%] relative ease-[cubic-bezier(0.25,0.8,0.25,1)] duration-[400ms] transition-[color] border-[none] after:content-[''] after:pointer-events-none after:absolute after:w-[0%] after:h-0.5 after:bg-tertiary after:ease-[cubic-bezier(0.25,0.8,0.25,1)] after:duration-[400ms] after:transition-[width,left] after:left-2/4 after:-bottom-0.5"
            >
              {Text[lang].flag}
              {Text[lang].language}
            </Link>
          </li>
          <li>
            <a
              onClick={() => gotTo("about")}
              className="cursor-pointer p-1 z-50 font-bold focus:after:w-full focus:after:left-[0%] hover:after:w-full hover:after:left-[0%] relative ease-[cubic-bezier(0.25,0.8,0.25,1)] duration-[400ms] transition-[color] border-[none] after:content-[''] after:pointer-events-none after:absolute after:w-[0%] after:h-0.5 after:bg-tertiary after:ease-[cubic-bezier(0.25,0.8,0.25,1)] after:duration-[400ms] after:transition-[width,left] after:left-2/4 after:-bottom-0.5"
            >
              {Text[lang].about}
            </a>
          </li>
          <li>
            <a
              onClick={() => gotTo("projects")}
              className="font-bold p-1 cursor-pointer focus:after:w-full focus:after:left-[0%] hover:after:w-full hover:after:left-[0%] relative ease-[cubic-bezier(0.25,0.8,0.25,1)] duration-[400ms] transition-[color] border-[none] after:content-[''] after:pointer-events-none after:absolute after:w-[0%] after:h-0.5 after:bg-tertiary after:ease-[cubic-bezier(0.25,0.8,0.25,1)] after:duration-[400ms] after:transition-[width,left] after:left-2/4 after:-bottom-0.5"
            >
              {Text[lang].projects}
            </a>
          </li>
          <li className="sm:hidden">
            <a
              onClick={() => gotTo("contact")}
              className="cursor-pointer p-2 bg-tertiary rounded-md order-1 text-primary"
            >
              {Text[lang].contact}
            </a>
          </li>
        </ul>
        {/* )} */}
        <a
          onClick={() => gotTo("contact")}
          className="cursor-pointer py-2 px-4 bg-tertiary rounded-md order-1 text-primary"
        >
          {Text[lang].contact}
        </a>
      </div>
    </header>
  );
};

export default Header;
