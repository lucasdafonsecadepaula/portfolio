import Image from "next/image";

const Text = {
  pt: {
    created: "Criado por",
  },
  en: {
    created: "Created by",
  },
} as const;

const Footer = ({ lang }: { lang: keyof typeof Text }) => {
  return (
    <footer className="border-t-[1px] mt-10 ">
      <a className="flex items-center gap-4 justify-center pb-4 mt-4 ">
        {Text[lang].created}{" "}
        <span>
          <Image
            className="rounded-full"
            src="/me.jpg"
            alt="Lucas de Paula"
            width={36}
            height={36}
          />
        </span>
      </a>
    </footer>
  );
};

export default Footer;
