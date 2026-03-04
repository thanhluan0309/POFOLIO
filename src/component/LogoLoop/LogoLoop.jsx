import React from "react";

/**
 * Infinite logo loop – two rows scrolling in opposite directions.
 * Replicates the effect from https://reactbits.dev/animations/logo-loop
 */
function LogoLoop({ logos, className = "" }) {
  if (!logos || logos.length === 0) return null;

  const row1 = logos.slice(0, Math.ceil(logos.length / 2));
  const row2 = logos.slice(Math.ceil(logos.length / 2));

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div className="flex flex-col gap-6 md:gap-8">
        <LogoRow items={row1} direction="left" />
        <LogoRow items={row2} direction="right" />
      </div>
    </div>
  );
}

function LogoRow({ items, direction }) {
  const duplicated = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex w-max gap-8 md:gap-12 items-center py-2"
        style={{
          animation: `logo-loop-${direction} 48s linear infinite`,
          willChange: "transform",
        }}
      >
        {duplicated.map((item, i) => (
          <div
            key={`logo-${i}`}
            className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-xl bg-surfaceElevated border border-border/80 p-2"
          >
            <img
              src={typeof item === "string" ? item : item.src}
              alt={typeof item === "string" ? "" : item.name || ""}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <style>{`
        @keyframes logo-loop-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes logo-loop-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

export default LogoLoop;
