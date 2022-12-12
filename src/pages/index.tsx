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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header lang="pt" />

      <main>
        <HeroSection lang="pt" />
        <AboutSection lang="pt" />
        <ProjectsSection lang="pt" />
        <ContactSection lang="pt" />
      </main>

      <Footer lang="pt" />
    </div>
  );
}
