import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";

/** @param { 'default' | 'profile' } [variant] - profile = shorter copy for use inside Profile section */
const TypingMyself = ({ isVisible, setIsVisible, variant = "default" }) => {
  const [firstDone, setFirstDone] = useState(false);
  const [stateHidden, setStateHidden] = useState(false);

  const isProfile = variant === "profile";

  const line1 = isProfile
    ? "Hi, I'm Luân 👋"
    : "Hello everyone 👋, My name is LUÂN.";
  const line2 = isProfile
    ? "I build for the web with focus on clean UI and solid logic."
    : "Welcome to my portfolio.";
  const line3 = isProfile
    ? "Here's me in code 👇"
    : "Let me introduce myself a little bit.🥰";

  return (
    <div
      className={`${
        stateHidden ? "hidden" : "flex"
      } flex-col text-primaryPale gap-3 items-start transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0 translate-y-3"
      }`}
      onTransitionEnd={() => setStateHidden(true)}
    >
      <TypeAnimation
        sequence={[line1, 800]}
        wrapper="span"
        speed={40}
        omitDeletionAnimation
        cursor={firstDone}
        className={
          isProfile ? "text-body-lg md:text-xl" : "text-xl md:text-2xl"
        }
        style={{ fontWeight: 600, display: "inline-block" }}
      />
      <TypeAnimation
        sequence={[isProfile ? 2000 : 3000, line2, () => setFirstDone(true)]}
        wrapper="span"
        speed={40}
        omitDeletionAnimation
        cursor={firstDone}
        className={
          isProfile ? "text-body md:text-body-lg" : "text-xl md:text-2xl"
        }
        style={{ fontWeight: 600, display: "inline-block" }}
      />
      {firstDone && (
        <TypeAnimation
          sequence={[
            isProfile ? 600 : 1000,
            line3,
            isProfile ? 1200 : 2500,
            () => setIsVisible(false),
          ]}
          wrapper="span"
          speed={40}
          className={
            isProfile ? "text-body md:text-body-lg" : "text-xl md:text-2xl"
          }
          style={{ fontWeight: 600, display: "inline-block" }}
        />
      )}
    </div>
  );
};

export default TypingMyself;
