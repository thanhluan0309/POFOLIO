import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import Title from "../../component/Title/Title";
import LogoLoop from "../../component/LogoLoop/LogoLoop";
import Biz from "../../assets/img/biztikpii.png";
import MALL from "../../assets/img/mall.png";
import DashboardAdmin from "../../assets/img/dashboard.png";
import DashboardGroup from "../../assets/img/dashboard2.png";
import GREMASYEDIT from "../../assets/img/SystemEditGremsy.png";
import MUSIC from "../../assets/img/MUSIC.png";

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
  { src: "https://cdn.simpleicons.org/shadcnui/000000", name: "shadcn" },
  { src: "https://cdn.simpleicons.org/mui/007FFF", name: "MUI" },
  { src: "https://cdn.simpleicons.org/mongodb/47A248", name: "MongoDB" },
  { src: "https://cdn.simpleicons.org/postgresql/4169E1", name: "SQL" },
  { src: "https://cdn.simpleicons.org/mysql/4479A1", name: "MySQL" },
  { src: "https://cdn.simpleicons.org/nextdotjs/000000", name: "Next.js" },
];

const PROJECTS = [
  {
    img: Biz,
    name: "BizTik",
    category: "Social Commerce",
    tags: ["React", "Go", "MongoDB"],
    desc: "End-to-end social commerce platform connecting brands with creators — real-time analytics, campaign management, and influencer marketplace.",
  },
  {
    img: MALL,
    name: "ShopFlow",
    category: "E-Commerce Platform",
    tags: ["Next.js", "TypeScript", "Stripe"],
    desc: "Multi-vendor marketplace with live inventory tracking, automated order fulfillment, and integrated payment processing.",
  },
  {
    img: DashboardAdmin,
    name: "Admin Console",
    category: "Enterprise Dashboard",
    tags: ["React", "TanStack", "Tailwind"],
    desc: "Role-based analytics dashboard with real-time data visualization, user management, and fully configurable reporting modules.",
  },
  {
    img: DashboardGroup,
    name: "ExpenseFlow",
    category: "FinTech App",
    tags: ["React", "Redux", "PostgreSQL"],
    desc: "Collaborative expense tracker with smart split algorithms, monthly budgeting, and multi-currency support for teams.",
  },
  {
    img: GREMASYEDIT,
    name: "Gremsy Suite",
    category: "Industrial Control System",
    tags: ["React", "WebSocket", "Go"],
    desc: "Real-time gimbal camera control interface for enterprise drone operations, deployed across hardware production environments.",
  },
  {
    img: MUSIC,
    name: "SoundSpace",
    category: "Media Platform",
    tags: ["React", "Express", "MongoDB"],
    desc: "Music streaming and discovery platform with curated playlists, social features, and an AI-powered recommendation engine.",
  },
];

/* ─── Project Carousel ─── */

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0, scale: 0.97 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir) => ({ x: dir < 0 ? "100%" : "-100%", opacity: 0, scale: 0.97 }),
};

function ProjectCarousel({ projects }) {
  const [[active, direction], setPage] = useState([0, 0]);
  const n = projects.length;

  const paginate = useCallback((dir) => {
    setPage(([cur]) => [((cur + dir) % n + n) % n, dir]);
  }, [n]);

  const goTo = useCallback((i) => {
    setPage(([cur]) => [i, i >= cur ? 1 : -1]);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paginate]);

  const project = projects[active];

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Slide container */}
      <div
        className="relative w-full h-[48vh] min-h-[280px] md:h-[60vh] md:min-h-[400px] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
        role="region"
        aria-label="Project showcase"
        aria-live="polite"
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={active}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 280, damping: 32, mass: 0.8 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) paginate(1);
              else if (info.offset.x > 60) paginate(-1);
            }}
            className="absolute inset-0"
          >
            {/* Image */}
            <img
              src={project.img}
              alt={project.name}
              className="w-full h-full object-cover"
              draggable={false}
            />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface/95 via-surface/25 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-surface/55 via-transparent to-transparent" />

            {/* Counter badge */}
            <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-surface/65 backdrop-blur-sm border border-primaryMed/30 font-mono text-caption text-primaryMed">
              {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </div>

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
              <motion.p
                key={`cat-${active}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="typography-caption uppercase tracking-widest text-primaryLight/70 mb-1"
              >
                {project.category}
              </motion.p>
              <motion.h3
                key={`name-${active}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.13 }}
                className="text-heading-2 font-bold text-primaryPale mb-1.5"
              >
                {project.name}
              </motion.h3>
              <motion.p
                key={`desc-${active}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="typography-body-sm text-primaryPale/65 max-w-lg mb-3 hidden sm:block"
              >
                {project.desc}
              </motion.p>
              <motion.div
                key={`tags-${active}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.22 }}
                className="flex flex-wrap gap-1.5"
              >
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full font-mono bg-primaryMed/12 text-primaryMed border border-primaryMed/25"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Arrow buttons */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-surface/70 backdrop-blur-sm border border-primaryMed/30 text-primaryMed hover:bg-primaryMed/20 flex items-center justify-center transition-colors z-10"
          aria-label="Previous project"
        >
          <i className="fas fa-chevron-left text-body-sm" aria-hidden="true" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-surface/70 backdrop-blur-sm border border-primaryMed/30 text-primaryMed hover:bg-primaryMed/20 flex items-center justify-center transition-colors z-10"
          aria-label="Next project"
        >
          <i className="fas fa-chevron-right text-body-sm" aria-hidden="true" />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 py-1">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === active
                ? "w-6 h-1.5 bg-primaryMed"
                : "w-1.5 h-1.5 bg-primaryMed/30 hover:bg-primaryMed/50"
            }`}
            aria-label={`Project ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Exported Sections ─── */

export function SkillsSection() {
  return (
    <section className="flex flex-col gap-8 w-full" aria-label="Skills">
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
  );
}

export function ExperienceSection() {
  return (
    <section className="flex flex-col gap-8 w-full" aria-label="Experience">
      <Title content="Experience" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5 }}
      >
        <ProjectCarousel projects={PROJECTS} />
      </motion.div>
    </section>
  );
}

/* ─── Key Achievements ─── */

const STATS = [
  { metric: 30, suffix: "%", label: "Faster UI Rendering" },
  { metric: 5,  suffix: "+", label: "Branches Secured" },
  { metric: 40, suffix: "%", label: "UX Engagement Boost" },
];

const ACHIEVEMENTS = [
  {
    icon: "fa-bolt",
    metric: 30, suffix: "%",
    title: "Optimized UI Rendering",
    desc: "Cut render times by 30% through memoization, lazy loading, and virtual DOM optimization across large-scale React dashboards.",
    color: "#E2852E",
  },
  {
    icon: "fa-robot",
    metric: null, suffix: "",
    title: "AI-Assisted Development",
    desc: "Integrated AI tools into the dev workflow — automating repetitive tasks, improving code quality, and cutting review cycles significantly.",
    color: "#ABE0F0",
  },
  {
    icon: "fa-shield-alt",
    metric: 5, suffix: "+",
    title: "Multi-Branch Access Control",
    desc: "Architected a centralized role-based access system, securing operations and data integrity across multiple regional branches.",
    color: "#F5C857",
  },
  {
    icon: "fa-chart-line",
    metric: 40, suffix: "%",
    title: "UX-Driven Engagement Lift",
    desc: "Ran A/B experiments and redesigned key user flows, directly contributing to a 40% uplift in engagement and session depth.",
    color: "#FFEE91",
  },
];

function AnimatedMetric({ value, suffix = "", duration = 1.5, className = "", style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const prefersReduced = useReducedMotion();
  const displayRef = useRef(null);

  useEffect(() => {
    const el = displayRef.current;
    if (!el) return;
    if (!inView) return;

    if (prefersReduced) {
      el.textContent = `${value}${suffix}`;
      return;
    }

    const start = performance.now();
    let frame;
    const tick = (now) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = `${Math.round(eased * value)}${suffix}`;
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, suffix, duration, prefersReduced]);

  return (
    <span ref={ref} className={className} style={style}>
      <span ref={displayRef}>0{suffix}</span>
    </span>
  );
}

function AchievementCard({ achievement, index }) {
  const cardRef = useRef(null);
  const spotRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const spot = spotRef.current;
    if (!card || !spot) return;
    const rect = card.getBoundingClientRect();
    spot.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    spot.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
    spot.style.opacity = "1";
  };

  const handleMouseLeave = () => {
    if (spotRef.current) spotRef.current.style.opacity = "0";
  };

  return (
    <motion.div
      ref={cardRef}
      className="card-surface relative overflow-hidden p-6 flex flex-col gap-4 h-full group"
      initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={spotRef}
        className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
        style={{
          opacity: 0,
          background: `radial-gradient(320px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${achievement.color}12, transparent 55%)`,
        }}
        aria-hidden="true"
      />

      <div className="flex items-center justify-between">
        <div
          className="achievement-icon w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${achievement.color}22`, border: `1px solid ${achievement.color}55` }}
        >
          <i className={`fas ${achievement.icon} text-lg`} style={{ color: achievement.color }} aria-hidden="true" />
        </div>
        {achievement.metric != null && (
          <AnimatedMetric
            value={achievement.metric}
            suffix={achievement.suffix}
            className="text-4xl font-extrabold tracking-tight"
            style={{ color: achievement.color }}
          />
        )}
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="typography-heading-3 text-primaryLight">{achievement.title}</h3>
        <p className="typography-body-sm text-primaryPale/75 leading-relaxed">{achievement.desc}</p>
      </div>
    </motion.div>
  );
}

export function KeyAchievementsSection() {
  return (
    <section className="flex flex-col gap-10 w-full" aria-label="Key Achievements">
      <Title content="Key Achievements" />

      {/* Stats bar */}
      <motion.div
        className="grid grid-cols-3 gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {STATS.map(({ metric, suffix, label }) => (
          <motion.div
            key={label}
            className="card-surface p-5 flex flex-col items-center gap-1 text-center"
            variants={{
              hidden: { opacity: 0, y: 16, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
            }}
          >
            <AnimatedMetric
              value={metric}
              suffix={suffix}
              className="text-4xl md:text-5xl font-extrabold text-primaryMed tracking-tight"
            />
            <p className="typography-caption uppercase tracking-widest text-primaryPale/70">{label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Achievement cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {ACHIEVEMENTS.map((a, i) => (
          <AchievementCard key={a.title} achievement={a} index={i} />
        ))}
      </div>
    </section>
  );
}
