import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AboutSection from "../components/Section/About";
import ContactSection from "../components/Section/Contact";
import HeroSection from "../components/Section/Hero";
import ProjectsSection from "../components/Section/Projects";

export default function Home() {
  return (
    <div className="font-custom bg-primary min-h-screen min-w-full text-white scroll-smooth">
      <Head>
        <title>Lucas de Paula</title>
        <meta name="description" content="Lucas de Paula, desenvolvedor web" />
        <meta name="keywords" content="lucasdafonsecadepaula" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header lang="en" />

      <main className="">
        <HeroSection lang="en" />
        <AboutSection lang="en" />
        <ProjectsSection lang="en" />
        <ContactSection lang="en" />
      </main>

      <Footer lang="en" />
    </div>
  );
}
