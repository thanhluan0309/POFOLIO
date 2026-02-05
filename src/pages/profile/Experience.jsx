import { motion } from "framer-motion";
import Title from "../../component/Title/Title";
import LogoLoop from "../../component/LogoLoop/LogoLoop";
import CircularGallery from "../../component/Card/CircleGalleryCard";
import Biz from "../../assets/img/biztikpii.png";
import MALL from "../../assets/img/mall.png";
import DashboardAdmin from "../../assets/img/dashboard.png";
import DashboardGroup from "../../assets/img/dashboard2.png";
import GROUP from "../../assets/img/group.png";
import GREMASYEDIT from "../../assets/img/SystemEditGremsy.png";
import MUSIC from "../../assets/img/MUSIC.png";

/** Skill logos: React, TypeScript, Go, Express, TanStack, Zustand, Redux, Tailwind, HTML, CSS, shadcn, MUI, MongoDB, SQL, MySQL, Next.js (Simple Icons CDN) */
const SKILL_BADGES = [
  { src: "https://cdn.simpleicons.org/react/61DAFB", name: "React" },
  { src: "https://cdn.simpleicons.org/typescript/3178C6", name: "TypeScript" },
  { src: "https://cdn.simpleicons.org/go/00ADD8", name: "Go" },
  { src: "https://cdn.simpleicons.org/express/000000", name: "Express.js" },
  { src: "https://cdn.simpleicons.org/tanstack/FF4154", name: "TanStack" },
  { src: "https://cdn.simpleicons.org/zustand/443E3E", name: "Zustand" },
  { src: "https://cdn.simpleicons.org/redux/764ABC", name: "Redux" },
  { src: "https://cdn.simpleicons.org/tailwindcss/06B6D4", name: "Tailwind" },
  { src: "https://cdn.simpleicons.org/html5/E34F26", name: "HTML" },
  { src: "https://cdn.simpleicons.org/css3/1572B6", name: "CSS" },
  { src: "https://cdn.simpleicons.org/shadcnui/000000", name: "shadcn" },
  { src: "https://cdn.simpleicons.org/mui/007FFF", name: "MUI" },
  { src: "https://cdn.simpleicons.org/mongodb/47A248", name: "MongoDB" },
  { src: "https://cdn.simpleicons.org/postgresql/4169E1", name: "SQL" },
  { src: "https://cdn.simpleicons.org/mysql/4479A1", name: "MySQL" },
  { src: "https://cdn.simpleicons.org/nextdotjs/000000", name: "Next.js" },
];

const PROJECTS = [
  { img: Biz, name: "BizTik" },
  { img: MALL, name: "Mall" },
  { img: DashboardAdmin, name: "Admin Console" },
  // { img: GROUP, name: "TeamScore" },
  { img: DashboardGroup, name: "ExpenseFlow" },
  { img: GREMASYEDIT, name: "Gremsy" },
  { img: MUSIC, name: "SoundSpace" },
];

const container = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 + i * 0.05 },
  }),
};

const card = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

function Experience() {
  return (
    <div className="w-full py-12 md:py-20">
      <div className="flex flex-col gap-12 md:gap-16">
        <section className="flex flex-col gap-8" aria-label="Experience">
          <Title content="Experience" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="w-full h-[60vh] min-h-[360px] rounded-xl overflow-hidden"
          >
            <CircularGallery
              items={PROJECTS.map((p) => ({ image: p.img, text: p.name }))}
              bend={3}
              textColor="#FFEE91"
              borderRadius={0.05}
              font="bold 24px 'Roboto Mono', monospace"
            />
          </motion.div>
        </section>
      </div>
    </div>
  );
}

export default Experience;
