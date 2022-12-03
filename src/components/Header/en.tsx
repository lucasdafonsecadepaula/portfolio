import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import BrazilianFlag from "../icons/BrazilianFlag";

const Header = () => {
  return (
    <header className="z-20 flex justify-between fixed top-0 py-3 w-full bg-primary drop-shadow-2xl items-center lg:px-40 border-b-[1px]">
      <div>
        <a href="#hero" className="font-bold cursor-pointer p-2 ml-4">
          Lucas
        </a>
      </div>
      <div className="flex gap-4 mr-4">
        <button className="order-2 peer sm:hidden">
          <GiHamburgerMenu fontSize={24} />
        </button>
        <ul
          className="hidden peer-focus:flex flex-col fixed top-0 left-0 
          h-screen w-screen z-30 bg-primary justify-center items-center
          sm:flex sm:flex-row sm:relative sm:h-auto sm:w-auto gap-6
          "
        >
          <span className="absolute top-0 left-0 p-4 sm:hidden">
            <GrClose color="#fff" />
          </span>
          <li>
            <Link
              href="/"
              className="flex items-center gap-2 cursor-pointe p-2"
            >
              Português
              <BrazilianFlag />
            </Link>
          </li>
          <li>
            <a href="#about" className="cursor-pointer p-2">
              About
            </a>
          </li>
          <li>
            <a href="#projects" className="cursor-pointer p-2">
              Projects
            </a>
          </li>
        </ul>
        <a
          href="#contact"
          className="cursor-pointer p-2 bg-tertiary rounded-md order-1"
        >
          Contact
        </a>
      </div>
    </header>
  );
};

export default Header;
