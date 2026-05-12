import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const ORB_DESKTOP = [
  { size: "w-[280px] h-[280px]", color: "bg-primary/20",      duration: 20, x: "10%", y: "20%" },
  { size: "w-[200px] h-[200px]", color: "bg-primaryMed/15",   duration: 25, x: "80%", y: "60%" },
  { size: "w-[320px] h-[320px]", color: "bg-primaryLight/10", duration: 22, x: "70%", y: "15%" },
  { size: "w-[180px] h-[180px]", color: "bg-primaryPale/10",  duration: 18, x: "15%", y: "70%" },
  { size: "w-[240px] h-[240px]", color: "bg-primary/15",      duration: 24, x: "50%", y: "80%" },
];

const ORB_MOBILE = [
  { size: "w-[160px] h-[160px]", color: "bg-primary/15",    duration: 22, x: "5%",  y: "15%" },
  { size: "w-[140px] h-[140px]", color: "bg-primaryMed/12", duration: 26, x: "75%", y: "55%" },
  { size: "w-[120px] h-[120px]", color: "bg-primaryPale/8", duration: 20, x: "55%", y: "75%" },
];

function Orb({ size, color, duration, x, y, blur, prefersReduced }) {
  return (
    <motion.div
      className={`absolute rounded-full ${blur} ${size} ${color}`}
      style={{ left: x, top: y }}
      animate={prefersReduced ? {} : { scale: [1, 1.15, 1], opacity: [0.35, 0.6, 0.35] }}
      transition={{ duration: duration / 10, repeat: Infinity, repeatType: "reverse" }}
      aria-hidden="true"
    />
  );
}

export default function Background() {
  const prefersReduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const orbs = isMobile ? ORB_MOBILE : ORB_DESKTOP;
  const blur = isMobile ? "blur-2xl" : "blur-3xl";

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(226,133,46,0.4) 0%, transparent 50%), radial-gradient(ellipse 60% 80% at 80% 80%, rgba(245,200,87,0.3) 0%, transparent 50%)",
        }}
        animate={prefersReduced ? {} : { opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        aria-hidden="true"
      />
      {orbs.map((props, i) => (
        <Orb key={`orb-${i}`} {...props} blur={blur} prefersReduced={prefersReduced} />
      ))}
      {/* Grain noise overlay — static SVG feTurbulence, zero animation cost */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
