import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import MyAvatar from "../../assets/img/avatar.png";
import TypingCode from "../../component/Typing/Json";
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
      "https://drive.google.com/file/d/1-wtlvptgCaxkl-JZmMeY723sI2tvqugH/view?usp=sharing",
      "_blank",
      "noopener,noreferrer"
    );
  }, []);

  const openAIChat = useCallback(() => {
    window.dispatchEvent(new CustomEvent("open-chat"));
  }, []);

  const scrollToExperience = useCallback(() => {
    document
      .getElementById("experience")
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <motion.div
      className="flex flex-col w-full"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {/* Row: ProfileCard trái, nội dung phải */}
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] items-center gap-8 md:gap-12 py-6 md:py-10">
        <motion.div
          variants={item}
          className="flex justify-center md:justify-start"
        >
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
            className="max-w-[min(90vw,380px)]"
          />
        </motion.div>

        <motion.div
          variants={container}
          className="flex flex-col gap-3 text-center md:text-left"
          viewport={{ once: true }}
        >
          <motion.p
            variants={item}
            className="typography-caption uppercase tracking-widest text-primaryLight/90"
          >
            Full‑stack Developer
          </motion.p>
          <motion.h1
            variants={item}
            className="typography-heading-1 text-primaryPale"
          >
            Creative Developer
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
          <motion.div variants={item} className="flex flex-wrap gap-3 justify-center md:justify-start">
            <motion.button
              type="button"
              onClick={openResume}
              className="mt-1 px-5 py-2.5 rounded-lg bg-primaryMed hover:bg-primaryLight text-surface font-semibold text-body-sm transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Open my resume
            </motion.button>
            <motion.button
              type="button"
              onClick={openAIChat}
              className="mt-1 px-5 py-2.5 rounded-lg border border-primaryMed/60 hover:border-primaryMed text-primaryMed hover:bg-primaryMed/10 font-semibold text-body-sm transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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

      {/* Coder intro: const me = { ... } */}
      <motion.section
        variants={item}
        className="mt-6 md:mt-10 flex flex-col gap-2"
        aria-label="About me in code"
      >
        <div className="flex items-center gap-2">
          <span className="typography-caption uppercase tracking-wider text-primaryLight/70 font-mono">
            me.js
          </span>
          <span
            className="h-px flex-1 max-w-24 bg-border/60"
            aria-hidden="true"
          />
        </div>
        <TypingCode
          isVisible={false}
          setIsVisible={() => {}}
          onViewMore={scrollToExperience}
          autoShow
        />
      </motion.section>
    </motion.div>
  );
}

export default Profile;
