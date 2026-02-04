import React from "react";

/**
 * Text with a sweeping shine animation (gradient over text).
 * Use disabled to stop the animation.
 */
function ShinyText({ text, disabled = false, speed = 5, className = "" }) {
  const animationDuration = `${speed}s`;

  return (
    <>
      <style>{`
        .shiny-text-rb {
          background: linear-gradient(
            120deg,
            rgba(171, 224, 240, 0.92) 38%,
            rgba(255, 255, 255, 1) 50%,
            rgba(171, 224, 240, 0.92) 62%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          display: inline;
          animation: shiny-text-shine var(--shiny-duration, 5s) linear infinite;
        }
        .shiny-text-rb.disabled {
          animation: none;
          -webkit-text-fill-color: inherit;
          color: inherit;
          background: none;
          background-clip: unset;
        }
        @keyframes shiny-text-shine {
          0% { background-position: 100% 50%; }
          100% { background-position: -100% 50%; }
        }
      `}</style>
      <span
        className={`shiny-text-rb ${disabled ? "disabled" : ""} ${className}`}
        style={{ "--shiny-duration": animationDuration }}
      >
        {text}
      </span>
    </>
  );
}

export default ShinyText;
