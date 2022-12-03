import Head from "next/head";
import Footer from "../components/Footer/en";
import Header from "../components/Header/en";
import AboutSection from "../components/Section/About/en";
import ContactSection from "../components/Section/Contact/en";
import HeroSection from "../components/Section/Hero/en";
import ProjectsSection from "../components/Section/Projects/en";

export default function Home() {
  return (
    <div className="font-custom bg-primary min-h-screen min-w-full text-white scroll-smooth">
      <Head>
        <title>Lucas de Paula</title>
        <meta name="description" content="Lucas de Paula, desenvolvedor web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
