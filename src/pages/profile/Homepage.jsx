import { useEffect, useContext, useRef, useCallback } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { ScrollContainerContext } from "../../component/Base/Base";
import Profile from "./Profile";
import { SkillsSection, ExperienceSection } from "./Experience";
import ContactPage from "./Contact";
import TypingCode from "../../component/Typing/Json";
import "./style.css";
import Title from "../../component/Title/Title";

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

function CodeIntroSection() {
  const scrollContainerRef = useContext(ScrollContainerContext);
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    root: scrollContainerRef,
    margin: "0px 0px -80px 0px",
  });
  const scrollToExperience = useCallback(() => {
    document
      .getElementById("experience")
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div ref={ref} className="flex flex-col gap-2">
      <Title content="Information" />
      <div className="flex items-center gap-2">
        <span className="typography-caption uppercase tracking-wider text-primaryLight/70 font-mono">
          me.js
        </span>
        <span
          className="h-px flex-1 max-w-24 bg-border/60"
          aria-hidden="true"
        />
      </div>
      {inView && (
        <TypingCode
          isVisible={false}
          setIsVisible={() => {}}
          onViewMore={scrollToExperience}
          autoShow
        />
      )}
    </div>
  );
}

function HomeSection({ id, children, index = 0 }) {
  return (
    <motion.section
      id={id}
      className="home-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={sectionVariants}
      custom={index}
    >
      <div className="section-inner">{children}</div>
    </motion.section>
  );
}

export default function HomePage() {
  const scrollContainerRef = useContext(ScrollContainerContext);
  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
    layoutEffect: false,
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HomeSection id="profile" index={0}>
        <Profile />
      </HomeSection>

      <HomeSection id="code-intro" index={1}>
        <CodeIntroSection />
      </HomeSection>

      <HomeSection id="skills" index={2}>
        <SkillsSection />
      </HomeSection>

      <HomeSection id="experience" index={3}>
        <ExperienceSection />
      </HomeSection>

      <HomeSection id="contact" index={4}>
        <ContactPage />
      </HomeSection>

      <motion.div className="progress" style={{ scaleX }} aria-hidden="true" />
    </>
  );
}
