import { motion, useReducedMotion } from "framer-motion";

function BlurText({ text, className = "", delay = 0, el: El = "span", once = true }) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <El className={className}>{text}</El>;
  }

  const words = text.split(" ");
  return (
    <El className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ marginRight: "0.28em" }}
          initial={{ opacity: 0, filter: "blur(10px)", y: 8 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once, margin: "0px 0px -30px 0px" }}
          transition={{
            duration: 0.45,
            delay: delay + i * 0.07,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </El>
  );
}

export default BlurText;
