import LogoLoop from "../../component/LogoLoop/LogoLoop";
import Title from "../../component/Title/Title";
import { motion } from "framer-motion";
const SKILL_BADGES = [
  { src: "https://cdn.simpleicons.org/react/61DAFB", name: "React" },
  { src: "https://cdn.simpleicons.org/typescript/3178C6", name: "TypeScript" },
  { src: "https://cdn.simpleicons.org/go/00ADD8", name: "Go" },
  { src: "https://cdn.simpleicons.org/express/000000", name: "Express.js" },
  { src: "https://cdn.simpleicons.org/tanstack/FF4154", name: "TanStack" },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpHj4UwTW4ANSlNjzQOiiOqfDa6kal9RpF0A&s",
    name: "Zustand",
  },
  { src: "https://cdn.simpleicons.org/redux/764ABC", name: "Redux" },
  { src: "https://cdn.simpleicons.org/tailwindcss/06B6D4", name: "Tailwind" },
  { src: "https://cdn.simpleicons.org/html5/E34F26", name: "HTML" },
  //   { src: "https://cdn.simpleicons.org/css3/1572B6", name: "CSS" },
  { src: "https://cdn.simpleicons.org/shadcnui/000000", name: "shadcn" },
  { src: "https://cdn.simpleicons.org/mui/007FFF", name: "MUI" },
  { src: "https://cdn.simpleicons.org/mongodb/47A248", name: "MongoDB" },
  { src: "https://cdn.simpleicons.org/postgresql/4169E1", name: "SQL" },
  { src: "https://cdn.simpleicons.org/mysql/4479A1", name: "MySQL" },
  { src: "https://cdn.simpleicons.org/nextdotjs/000000", name: "Next.js" },
];
export const Skill = () => {
  return (
    <div className="w-full py-12 md:py-20">
      <div className="flex flex-col gap-12 md:gap-16">
        <section className="flex flex-col gap-8" aria-label="Skills">
          <Title content="Skills" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <LogoLoop logos={SKILL_BADGES} />
          </motion.div>
        </section>
      </div>
    </div>
  );
};
