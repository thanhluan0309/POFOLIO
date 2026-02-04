import { motion } from "framer-motion";

const ORB_VARIANTS = [
  {
    size: "w-[280px] h-[280px]",
    color: "bg-primary/20",
    duration: 20,
    x: "10%",
    y: "20%",
  },
  {
    size: "w-[200px] h-[200px]",
    color: "bg-primaryMed/15",
    duration: 25,
    x: "80%",
    y: "60%",
  },
  {
    size: "w-[320px] h-[320px]",
    color: "bg-primaryLight/10",
    duration: 22,
    x: "70%",
    y: "15%",
  },
  {
    size: "w-[180px] h-[180px]",
    color: "bg-primaryPale/10",
    duration: 18,
    x: "15%",
    y: "70%",
  },
  {
    size: "w-[240px] h-[240px]",
    color: "bg-primary/15",
    duration: 24,
    x: "50%",
    y: "80%",
  },
];

function Orb({ size, color, duration, x, y }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${size} ${color}`}
      style={{ left: x, top: y }}
      animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
      transition={{
        duration: duration / 10,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      aria-hidden="true"
    />
  );
}

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(226,133,46,0.4) 0%, transparent 50%), radial-gradient(ellipse 60% 80% at 80% 80%, rgba(245,200,87,0.3) 0%, transparent 50%)",
        }}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        aria-hidden="true"
      />
      {ORB_VARIANTS.map((props, i) => (
        <Orb key={`orb-${i}`} {...props} />
      ))}
    </div>
  );
}
