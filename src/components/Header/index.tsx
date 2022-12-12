import classNames from "classnames";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import BrazilianFlag from "../icons/BrazilianFlag";
import EnglishFlag from "../icons/EnglishFlag";

const Text = {
  pt: {
    language: "English",
    flag: <EnglishFlag />,
    about: "Sobre",
    projects: "Projetos",
    contact: "Contato",
    link: "/en",
  },
  en: {
    language: "Português",
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
        "bg-primary drop-shadow-2xl items-center lg:px-40 border-b-[1px]"
      )}
    >
      <div>
        <a
          onClick={() => gotTo("hero")}
          className="font-bold cursor-pointer p-2 ml-4"
        >
          Lucas
        </a>
      </div>
      <div className="flex gap-4 mr-4">
        <button
          className="order-2 sm:hidden"
          onClick={() => setIsOpenHamburgerMenu(true)}
        >
          <GiHamburgerMenu fontSize={24} />
        </button>
        {/* {isOpenHamburgerMenu && ( */}
        <ul
          className={classNames(
            "flex-col fixed top-0 left-0",
            "h-screen w-screen z-30 bg-primary justify-center items-center",
            "sm:flex sm:flex-row sm:relative sm:h-auto sm:w-auto gap-6",
            `${isOpenHamburgerMenu ? "flex" : "sm:flex hidden"}`
          )}
        >
          <span
            className="absolute top-0 left-0 p-4 sm:hidden text-white"
            onClick={() => setIsOpenHamburgerMenu(false)}
          >
            <GrClose id="close-hamburgermenu-icon" />
          </span>
          <li>
            <Link
              href={Text[lang].link}
              className="flex items-center gap-2 cursor-pointe p-2 pb-0"
            >
              {Text[lang].language}
              {Text[lang].flag}
            </Link>
          </li>
          <li>
            <a
              onClick={() => gotTo("about")}
              className="cursor-pointer p-2 z-50"
            >
              {Text[lang].about}
            </a>
          </li>
          <li>
            <a onClick={() => gotTo("projects")} className="cursor-pointer p-2">
              {Text[lang].projects}
            </a>
          </li>
          <li className="sm:hidden">
            <a
              onClick={() => gotTo("contact")}
              className="cursor-pointer p-2 bg-tertiary rounded-md order-1"
            >
              {Text[lang].contact}
            </a>
          </li>
        </ul>
        {/* )} */}
        <a
          onClick={() => gotTo("contact")}
          className="cursor-pointer p-2 bg-tertiary rounded-md order-1"
        >
          {Text[lang].contact}
        </a>
      </div>
    </header>
  );
};

export default Header;
