import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Stack } from "@/components/Stack";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Navbar />
      <section id="hero">
        <Hero />
      </section>
      <About />
      <Stack />
      <Projects />
      <Contact />
    </main>
  );
}