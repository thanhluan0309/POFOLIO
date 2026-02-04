import { useCallback } from "react";
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
  const openResume = useCallback(() => {
    window.open(
      "https://drive.google.com/file/d/1-wtlvptgCaxkl-JZmMeY723sI2tvqugH/view?usp=sharing",
      "_blank",
      "noopener,noreferrer"
    );
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
            enableTilt
            onContactClick={openResume}
            className="max-w-[min(90vw,380px)]"
          />
        </motion.div>

        <motion.div
          variants={container}
          className="flex flex-col gap-3 text-center md:text-left"
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
          <motion.p
            variants={item}
            className="typography-body text-primaryPale/90 max-w-xl"
          >
            <ShinyText
              text="Sensible to Front End, designing with passion and precision."
              speed={6}
              className="italic"
            />
          </motion.p>
          <motion.p
            variants={item}
            className="typography-body text-primaryPale/90 max-w-xl"
          >
            <ShinyText
              text="Solid on the Back End—scalable APIs, clean architecture, systems that just work."
              speed={6}
              className="italic"
            />
          </motion.p>
          <motion.p
            variants={item}
            className="typography-body text-primaryPale/85 max-w-xl"
          >
            <ShinyText
              text="Let's build something amazing together!"
              speed={6}
              className="italic"
            />
          </motion.p>
          <motion.div variants={item}>
            <motion.button
              type="button"
              onClick={openResume}
              className="mt-1 px-5 py-2.5 rounded-lg bg-primaryMed hover:bg-primaryLight text-surface font-semibold text-body-sm transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Open my resume
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
