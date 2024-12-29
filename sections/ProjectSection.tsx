import Image from "next/image";
import { useEffect, useRef } from "react";
import { RoughNotation } from "react-rough-notation";
import { useTheme } from "next-themes";
import coin from ".././public/projects/coin.png";
import portfo from ".././public/projects/portfolio.png";
import comsats from ".././public/projects/comsats.png";

import ProjectCard from "@/components/ProjectCard";
import { useSection } from "context/section";
import useOnScreen from "hooks/useOnScreen";
import useScrollActive from "hooks/useScrollActive";

import terminalPortfolio from "public/projects/terminal-portfolio.webp";
import haruFashion from "public/projects/haru-fashion.webp";
import haruApi from "public/projects/haru-api.webp";
import astroPaper from "public/projects/astro-paper.webp";
import Fyp from "public/2.png";
import house from "public/3.png";
import blog from "public/4.png";

const ProjectSection: React.FC = () => {
  const { theme } = useTheme();

  const sectionRef = useRef<HTMLDivElement>(null);

  const elementRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useOnScreen(elementRef);

  // Set active link for project section
  const projectSection = useScrollActive(sectionRef);
  const { onSectionChange } = useSection();
  useEffect(() => {
    projectSection && onSectionChange!("projects");
  }, [projectSection]);

  return (
    <section ref={sectionRef} id="projects" className="section">
      <div className="project-title text-center">
        <RoughNotation
          type="underline"
          color={`${theme === "light" ? "rgb(0, 122, 122)" : "rgb(5 206 145)"}`}
          strokeWidth={2}
          order={1}
          show={isOnScreen}
        >
          <h2 className="section-heading">Projects</h2>
        </RoughNotation>
      </div>
      <span className="project-desc text-center block mb-4" ref={elementRef}>
        “Talk is cheap. Show me the code”? I got you. <br />
        Here are some of my projects you shouldn't misss
      </span>
      <div className="flex flex-wrap">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} index={index} project={project} />
        ))}
      </div>
      <div className="others text-center mb-16">
        Other projects can be explored in{" "}
        <a
          href="https://github.com/Waleed-Khan-dev"
          className="font-medium underline link-outline text-marrsgreen dark:text-carrigreen whitespace-nowrap"
        >
          my github profile
        </a>
      </div>
    </section>
  );
};

const projects = [
  {
    title: "Comsats accommodation platform",
    type: "Full Stack",
    image: (
      <Image
        src={house}
        sizes="100vw"
        fill
        alt="Haru API"
        className="transition-transform duration-500 hover:scale-110 object-cover"
      />
    ),
    desc: "Led the development of a university accommodation finder using React.js and Tailwind CSS, to assist students in discovering nearby housing options and room shares • Engineered a seamless integration with Google Maps API to provide students with accurate location • Architected a secure user authentication system with Firebase, allowing users to create personalized accounts for posting and responding to rental and room-sharing ads",
    tags: ["Solidity", "Next.js", "Hardhat", "Smart Contract"],
    liveUrl: "https://realtor-v2.vercel.app/",
    codeUrl: "https://github.com/Waleed-Khan-dev/Comsats-House",
    bgColor: "bg-[#C5E4E7]",
  },
  {
    title: "Personal Portfolio",
    type: "Frontend",
    image: (
      <Image
        src={portfo}
        sizes="100vw"
        fill
        alt="Terminal Portfolio"
        className="transition-transform duration-500 hover:scale-110 object-cover"
      />
    ),
    desc: "My perfolio website in new version developed with React and TypeScript. In this project, Tailwindcss library is used for styling.",
    tags: ["Next.js", "TypeScript", "Tailwindcsss"],
    liveUrl: "",
    codeUrl: "https://github.com/Waleed-Khan-dev/Portfolio_v1.1",
    bgColor: "bg-[#B4BEE0]",
  },
];

export default ProjectSection;
