import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import MyAvatar from "../../assets/img/avatar.png";
import ShinyText from "../../component/Title/ShinyText";
import ProfileCard from "../../component/Card/ProfileCard";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

function useMagnetic() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 350, damping: 28 });
  const springY = useSpring(y, { stiffness: 350, damping: 28 });

  const onMouseMove = useCallback(
    (e) => {
      if (prefersReduced || !ref.current) return;
      if (!window.matchMedia("(pointer: fine)").matches) return;
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - (rect.left + rect.width / 2)) * 0.28);
      y.set((e.clientY - (rect.top + rect.height / 2)) * 0.28);
    },
    [prefersReduced, x, y],
  );

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, style: { x: springX, y: springY }, onMouseMove, onMouseLeave };
}

function Profile() {
  const [enableTilt, setEnableTilt] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setEnableTilt(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const openResume = useCallback(() => {
    window.open(
      "https://drive.google.com/file/d/1MGAkJ4DySMoRr2Bv8NH_WUbDyuoIBaDS/view?usp=sharing",
      "_blank",
      "noopener,noreferrer",
    );
  }, []);

  const openAIChat = useCallback(() => {
    window.dispatchEvent(new CustomEvent("open-chat"));
  }, []);

  const resumeBtn = useMagnetic();
  const aiBtn = useMagnetic();

  return (
    <motion.div
      className="flex flex-col w-full"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {/* Mobile-only compact header — avatar + title in one row */}
      <motion.div
        variants={item}
        className="md:hidden flex items-center gap-4 pb-4"
      >
        <img
          src={MyAvatar}
          alt=""
          className="w-16 h-16 rounded-full object-cover border-2 border-primaryMed flex-shrink-0"
        />
        <div>
          <p className="typography-caption uppercase tracking-widest text-primaryLight/90">
            Full‑stack Developer
          </p>
          <h1 className="typography-heading-2">
            <span className="gradient-heading">Creative Developer</span>
          </h1>
        </div>
      </motion.div>

      {/* Layout grid — desktop: [card | text]; mobile: text only (avatar handled above) */}
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] items-center gap-6 md:gap-12 md:py-10">

        {/* ProfileCard — desktop only */}
        <motion.div variants={item} className="hidden md:flex justify-start">
          <ProfileCard
            avatarUrl={MyAvatar}
            name="Lê Trần Thành Luân"
            title="Creative Developer"
            handle="thanhluan"
            status="Available"
            contactText="Open my resume"
            showUserInfo
            enableTilt={enableTilt}
            onContactClick={openResume}
            className="max-w-[380px]"
          />
        </motion.div>

        {/* Text content */}
        <motion.div
          variants={container}
          className="flex flex-col gap-3 text-center md:text-left"
          viewport={{ once: true }}
        >
          {/* Heading — desktop only (mobile shows it in the compact header above) */}
          <motion.p
            variants={item}
            className="hidden md:block typography-caption uppercase tracking-widest text-primaryLight/90"
          >
            Full‑stack Developer
          </motion.p>
          <motion.h1 variants={item} className="hidden md:block typography-heading-1">
            <span className="gradient-heading">Creative Developer</span>
          </motion.h1>

          <motion.div variants={item} className="flex flex-col gap-1">
            <p className="typography-body text-primaryPale/90 max-w-xl">
              <ShinyText
                text="Sensible to Front End, designing with passion and precision."
                speed={6}
                className="italic"
              />
            </p>
            <p className="typography-body text-primaryPale/90 max-w-xl">
              <ShinyText
                text="Solid on the Back End—scalable APIs, clean architecture, systems that just work."
                speed={6}
                className="italic"
              />
            </p>
            <p className="typography-body text-primaryPale/85 max-w-xl">
              <ShinyText
                text="Let's build something amazing together!"
                speed={6}
                className="italic"
              />
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="flex flex-wrap gap-3 justify-center md:justify-start"
          >
            <motion.button
              ref={resumeBtn.ref}
              type="button"
              onClick={openResume}
              className="mt-1 btn-primary"
              style={resumeBtn.style}
              onMouseMove={resumeBtn.onMouseMove}
              onMouseLeave={resumeBtn.onMouseLeave}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Open my resume
            </motion.button>
            <motion.button
              ref={aiBtn.ref}
              type="button"
              onClick={openAIChat}
              className="mt-1 btn-outline flex items-center gap-2"
              style={aiBtn.style}
              onMouseMove={aiBtn.onMouseMove}
              onMouseLeave={aiBtn.onMouseLeave}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="8" width="18" height="12" rx="3" />
                <line x1="12" y1="8" x2="12" y2="4" />
                <circle cx="12" cy="3.5" r="1.5" fill="currentColor" />
                <circle cx="9" cy="13" r="1.5" fill="currentColor" />
                <circle cx="15" cy="13" r="1.5" fill="currentColor" />
                <path d="M9 17h6" strokeWidth="2" />
                <line x1="3" y1="14" x2="1" y2="14" />
                <line x1="21" y1="14" x2="23" y2="14" />
              </svg>
              My AI Assistant
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Profile;
