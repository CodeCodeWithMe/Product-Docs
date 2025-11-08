"use client";

import Contact from "./components/contact";
import { Footer } from "./components/footer";
import Projects from "./components/projects";

const Home = () => {
  return (
    <>
      <main className="container mx-auto divide-y border-x px-0">
        {/* <Hero /> */}
        <div className="grid divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0"></div>
        <div className="h-8 bg-dashed" />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </>
  );
};

export default Home;
