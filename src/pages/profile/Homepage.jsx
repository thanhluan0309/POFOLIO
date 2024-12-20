// Photos from https://citizenofnowhe.re/lines-of-the-city
import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Profile from "./Profile";
import EXPERIENCE from "./Experience";
import ContactPage from "./Contact";
import "./style.css";

function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

const Breadcumbs = [
  {
    name: "My CV",
    content: <Profile></Profile>,
  },
  {
    name: "EXPERIENCE",
    content: <EXPERIENCE></EXPERIENCE>,
  },
  {
    name: "Contact",
    content: <ContactPage></ContactPage>,
  },
];
function Image({ id, Content, name }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 0);

  return (
    <div className="flex flex-col justify-start mb-52">
      {/* <h2 class="text-4xl font-bold text-white text-center underline decoration-4 decoration-purple-600 hover:decoration-blue-500 transition-all duration-300">
        {name}
      </h2> */}

      <section ref={ref}>{Content}</section>
    </div>
  );
}

export default function HomePage() {
  const { scrollYProgress } = useScroll();
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
      {Breadcumbs.map((item, index) => (
        <Image Content={item?.content} name={item?.name} />
      ))}
      <motion.div className="progress" style={{ scaleX }} />
    </>
  );
}
