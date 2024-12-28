import type { GetStaticProps, NextPage } from "next";

import AppHead from "@/components/AppHead";
import Loader from "@/components/Loader";
import SkipToMain from "@/components/SkipToMain";
import Header from "@/components/Header";
import SocialLinks from "@/components/SocialLinks";
import HeroSection from "@/sections/HeroSection";
import AboutSection from "@/sections/AboutSection";
import ProjectSection from "@/sections/ProjectSection";
import BlogSection from "@/sections/BlogSection";
import ContactSection from "@/sections/ContactSection";
import Footer from "@/components/Footer";

import { getAllPosts } from "utils/api";
import { MdxMeta } from "../pages/blog/posts/[slug]";
import Services from "./../components/Services";

type Props = {
  blogPosts: MdxMeta[];
};

export const meta = {
  description:
    "M Waleed Khan is a full-stack developer . He is passionate about writing codes and developing web applications to solve real-life challenges.",
  author: "M Waleed Khan",
  type: "website",
  ogImage: `${process.env.NEXT_PUBLIC_URL}/satnaing-dev-og-new.png`,
  siteName: "M Waleed Khan",
  imageAlt: "M Waleed Khan portfolio website",
};

const Home: NextPage<Props> = ({ blogPosts }) => {
  return (
    <>
      <AppHead
        title="M Waleed Khan - A Full-stack Developer"
        url={`${process.env.NEXT_PUBLIC_URL}`}
        meta={meta}
      />
      <Loader>
        <span className="text-carrigreen text-bold text-6xl">
          M Waleed Khan
        </span>
        .dev
      </Loader>
      <div className="bg-bglight dark:bg-bgdark overflow-hidden">
        <div className="selection:bg-marrsgreen selection:text-bglight dark:selection:bg-carrigreen dark:selection:text-bgdark">
          <SkipToMain />
          <Header />
          <main id="main">
            <HeroSection />
            <AboutSection />
            <Services />
            <ProjectSection />
            <ContactSection />
          </main>
          <SocialLinks page="index" />
          <Footer />
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const blogPosts = getAllPosts([
    "coverImage",
    "coverImageAlt",
    "slug",
    "title",
    "excerpt",
    "datetime",
    "featured",
  ]);

  return {
    props: {
      blogPosts,
    },
  };
};

export default Home;
