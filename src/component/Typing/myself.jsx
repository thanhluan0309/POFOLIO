import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

const TypingMyself = ({ isVisible, setIsVisible }) => {
  const [firstDone, setFirstDone] = useState(false);
  const [stateHidden, setStateHidden] = useState(false);

  return (
    <div
      className={`${
        stateHidden ? "hidden" : "flex"
      } flex-col text-white gap-4 items-start p-4 transition-opacity duration-1000 transform ${
        isVisible ? "opacity-100 " : "opacity-0 translate-y-4"
      }`}
      onTransitionEnd={() => setStateHidden(true)}
    >
      <TypeAnimation
        sequence={[
          "Hello everyone 👋, My name is LUÂN.", // Nội dung chữ
          1000, // Tạm dừng 1s
          // () => {
          //   setFirstDone(true);
          // },
        ]}
        wrapper="span"
        speed={50}
        omitDeletionAnimation={true}
        cursor={firstDone}
        className="text-xl md:text-2xl"
        style={{
          fontWeight: 700,
          display: "inline-block",
        }}
      />
      <TypeAnimation
        sequence={[
          3000,
          "Welcome to my portfolio.", // Nội dung chữ
          // Tạm dừng 1s
          () => {
            setFirstDone(true);
          },
        ]}
        wrapper="span"
        speed={50}
        omitDeletionAnimation={true}
        cursor={firstDone}
        className="text-xl md:text-2xl"
        style={{
          fontWeight: 700,
          display: "inline-block",
        }}
      />

      {firstDone && (
        <TypeAnimation
          sequence={[
            1000,
            "Let me introduce myself a little bit.🥰", // Nội dung chữ
            2500, // Tạm dừng 1s
            () => {
              setIsVisible(false);
            },
          ]}
          wrapper="span"
          speed={50}
          className="text-xl md:text-2xl"
          style={{
            fontWeight: 700,
            display: "inline-block",
          }}

          //   repeat={Infinity}
        />
      )}
    </div>
  );
};

export default TypingMyself;
