import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

const About = dynamic(() => import("@/components/sections/About").then(mod => ({ default: mod.About })), {
  loading: () => <div className="h-96" />,
});
const Skills = dynamic(() => import("@/components/sections/Skills").then(mod => ({ default: mod.Skills })), {
  loading: () => <div className="h-96" />,
});
const Projects = dynamic(() => import("@/components/sections/Projects").then(mod => ({ default: mod.Projects })), {
  loading: () => <div className="h-96" />,
});
const Experience = dynamic(() => import("@/components/sections/Experience").then(mod => ({ default: mod.Experience })), {
  loading: () => <div className="h-96" />,
});
const Contact = dynamic(() => import("@/components/sections/Contact").then(mod => ({ default: mod.Contact })), {
  loading: () => <div className="h-96" />,
});

export default function Home() {
  return (
    <ErrorBoundary>
      <div className="flex flex-col gap-24 pb-24">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </div>
    </ErrorBoundary>
  );
}
