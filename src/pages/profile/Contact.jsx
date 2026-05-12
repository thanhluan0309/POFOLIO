import React, { useRef } from "react";
import { motion } from "framer-motion";

const CONTACT_ITEMS = [
  {
    label: "Full name",
    value: "Le Tran Thanh Luan",
    icon: "fa-user",
    iconColor: "text-surface",
    iconBg: "bg-primaryMed",
    iconGlow: "rgba(245,200,87,0.4)",
    href: null,
  },
  {
    label: "Email",
    value: "letranthanhluan03092001@gmail.com",
    icon: "fa-envelope",
    iconColor: "text-surface",
    iconBg: "bg-primaryLight",
    iconGlow: "rgba(255,238,145,0.4)",
    href: "mailto:letranthanhluan03092001@gmail.com",
  },
  {
    label: "Phone",
    value: "0898521685",
    icon: "fa-phone-alt",
    iconColor: "text-primaryPale",
    iconBg: "bg-primary",
    iconGlow: "rgba(226,133,46,0.4)",
    href: "tel:+840898521685",
  },
];

const LINKEDIN_URL =
  "https://www.linkedin.com/in/l%C3%AA-tr%E1%BA%A7n-th%C3%A0nh-lu%C3%A2n-2b75b723b/";

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function ContactItem({ item }) {
  const inner = (
    <div className="flex items-center gap-4 group cursor-pointer">
      <div
        className={`flex-shrink-0 w-12 h-12 rounded-xl ${item.iconBg} ${item.iconColor} flex items-center justify-center transition-all duration-300 group-hover:scale-110`}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 0 16px ${item.iconGlow}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "none";
        }}
        aria-hidden="true"
      >
        <i className={`fas ${item.icon} text-body`} aria-hidden="true" />
      </div>
      <div className="min-w-0 transition-transform duration-200 group-hover:translate-x-1">
        <p className="typography-body-sm text-muted">{item.label}</p>
        <p className={`typography-body text-primaryPale truncate ${item.href ? "group-hover:text-primaryLight underline-offset-2 group-hover:underline" : ""}`}>
          {item.value}
        </p>
      </div>
    </div>
  );

  if (item.href) {
    return (
      <motion.li variants={itemVariants}>
        <a href={item.href} target={item.href.startsWith("mailto") || item.href.startsWith("tel") ? "_self" : "_blank"} rel="noopener noreferrer">
          {inner}
        </a>
      </motion.li>
    );
  }
  return <motion.li variants={itemVariants}>{inner}</motion.li>;
}

function ContactPage() {
  const cardRef = useRef(null);
  const spotRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const spot = spotRef.current;
    if (!card || !spot) return;
    const rect = card.getBoundingClientRect();
    spot.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    spot.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
    spot.style.opacity = "1";
  };

  const handleMouseLeave = () => {
    if (spotRef.current) spotRef.current.style.opacity = "0";
  };

  return (
    <div className="w-full py-12 md:py-20 flex items-center justify-center">
      <div
        ref={cardRef}
        className="card-surface w-full max-w-xl p-8 md:p-10 relative overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Spotlight overlay */}
        <div
          ref={spotRef}
          className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
          style={{
            opacity: 0,
            background:
              "radial-gradient(380px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(245,200,87,0.07), transparent 60%)",
          }}
          aria-hidden="true"
        />

        <h2 className="typography-heading-1 text-center mb-2">Contact me</h2>
        <p className="typography-body text-center text-muted mb-10">
          Reach out through the details below. I'm here to help!
        </p>

        <motion.ul
          className="space-y-6"
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {CONTACT_ITEMS.map((item) => (
            <ContactItem key={item.label} item={item} />
          ))}
        </motion.ul>

        <div className="mt-10 text-center">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primaryPale hover:bg-primaryLight text-surface font-semibold text-body transition-all duration-300 hover:shadow-lg"
            style={{ boxShadow: "0 2px 14px rgba(171,224,240,0.25)" }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 24px rgba(171,224,240,0.45)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 2px 14px rgba(171,224,240,0.25)"; }}
          >
            <i className="fab fa-linkedin text-body-sm" aria-hidden="true" />
            LinkedIn Profile
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
