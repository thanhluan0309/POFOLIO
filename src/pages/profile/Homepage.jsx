import { useEffect, useContext } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ScrollContainerContext } from "../../component/Base/Base";
import Profile from "./Profile";
import Experience from "./Experience";
import ContactPage from "./Contact";
import "./style.css";

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

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

      <HomeSection id="experience" index={1}>
        <Experience />
      </HomeSection>

      <HomeSection id="contact" index={2}>
        <ContactPage />
      </HomeSection>

      <motion.div className="progress" style={{ scaleX }} aria-hidden="true" />
    </>
  );
}
