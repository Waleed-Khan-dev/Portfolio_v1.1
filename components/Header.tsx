import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import gsap from "gsap";

import useScrollListener from "hooks/useScrollListener";
import { useSection } from "context/section";

const navLinks = [
  {
    url: "#whoami",
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z" />
      </svg>
    ),
    text: "Who am I?",
  },
  {
    url: "#projects",
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path d="m7.375 16.781 1.25-1.562L4.601 12l4.024-3.219-1.25-1.562-5 4a1 1 0 0 0 0 1.562l5 4zm9.25-9.562-1.25 1.562L19.399 12l-4.024 3.219 1.25 1.562 5-4a1 1 0 0 0 0-1.562l-5-4zm-1.649-4.003-4 18-1.953-.434 4-18z" />
      </svg>
    ),
    text: "Projects",
  },
  {
    url: "#contact",
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path d="M20.563 3.34a1.002 1.002 0 0 0-.989-.079l-17 8a1 1 0 0 0 .026 1.821L8 15.445v6.722l5.836-4.168 4.764 2.084a1 1 0 0 0 1.399-.85l1-15a1.005 1.005 0 0 0-.436-.893zm-2.466 14.34-5.269-2.306L16 9.167l-7.649 4.25-2.932-1.283 13.471-6.34-.793 11.886z" />
      </svg>
    ),
    text: "Contact",
  },
];

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { currentSection } = useSection();
  const [navClassList, setNavClassList] = useState<any>([]);
  const scroll = useScrollListener();

  const mainRef = useRef(null);
  const themeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    gsap.fromTo(
      mainRef.current,
      { top: -120 },
      { top: 0, duration: 0.7, delay: 1, ease: "Power0.easeNone" }
    );
  }, []);

  // update theme button aria-label according to theme value
  useEffect(() => {
    const themeBtn = themeBtnRef.current;
    if (themeBtn) {
      themeBtn.ariaLabel = theme ?? "light";
    }
  }, [theme]);

  // update classList of nav on scroll
  useEffect(() => {
    const _classList = [];

    if (scroll.y > 150 && scroll.y - scroll.lastY > 0)
      _classList.push("!shadow-md");

    setNavClassList(_classList);
  }, [scroll.y, scroll.lastY]);

  return (
    <header className="md:flex">
      <div
        ref={mainRef}
        className={`main-nav lower-glassmorphism bg-bglight dark:bg-bgdark z-30 top-0 shadow-sm fixed duration-400 px-4 sm:px-8 h-16 w-full ${navClassList.join(
          " "
        )}`}
      >
        <div className="w-full h-full mx-auto max-w-6xl flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold text-carrigreen  sm:text-4xl md:hover:text-white dark:md:hover:text-carrigreen focus-visible:outline-marrsgreen dark:focus-visible:outline-carrigreen"
          >
            MWK
            <span className="text-white">.dev</span>
          </Link>
          <nav className="flex items-center">
            <div className="glassmorphism md:bg-transparent md:dark:bg-transparent md:backdrop-blur-none fixed md:static bottom-4 z-30 left-1/2 md:left-auto transform -translate-x-1/2 md:transform-none bg-bglight dark:bg-carddark dark:text-textlight w-11/12 rounded drop-shadow-lg md:drop-shadow-none">
              <ul className="flex justify-evenly items-center py-1">
                {navLinks.map((navLink) => (
                  <li key={navLink.url}>
                    <a
                      href={navLink.url}
                      className={`text-sm md:text-lg flex flex-col items-center w-[4.5rem] md:w-auto dark:fill-textlight md:mr-6 md:hover:text-marrsgreen md:dark:hover:text-carrigreen link-outline ${
                        currentSection === navLink.text.toLocaleLowerCase() &&
                        "text-marrsgreen dark:text-carrigreen fill-marrsgreen dark:fill-carrigreen"
                      }`}
                    >
                      <span className="md:hidden">{navLink.svg}</span>
                      <span className="whitespace-nowrap">{navLink.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
