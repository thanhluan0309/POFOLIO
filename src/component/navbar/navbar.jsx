import { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollContainerContext } from "../Base/Base";

const NAV_LINKS = [
  { href: "/#profile",      label: "About me",         sectionId: "profile" },
  { href: "/#experience",   label: "Experience",        sectionId: "experience" },
  { href: "/#achievements", label: "Key Achievements",  sectionId: "achievements" },
  { href: "/#contact",      label: "Contact",           sectionId: "contact" },
];

function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [activeSection, setActiveSection] = useState("profile");
  const [menuOpen, setMenuOpen]       = useState(false);
  const scrollContainer = useContext(ScrollContainerContext);

  useEffect(() => {
    const container = scrollContainer?.current;
    if (!container) return;
    const onScroll = () => setScrolled(container.scrollTop > 12);
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [scrollContainer]);

  useEffect(() => {
    const container = scrollContainer?.current;
    if (!container) return;

    const observers = NAV_LINKS.map(({ sectionId }) => {
      const el = document.getElementById(sectionId);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(sectionId); },
        { root: container, threshold: 0.4 }
      );
      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((obs) => obs?.disconnect());
  }, [scrollContainer]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <nav
      className={`sticky top-0 z-30 text-primaryPale border-b transition-all duration-300 ${
        scrolled
          ? "bg-surface/80 backdrop-blur-md border-border/40 shadow-lg shadow-black/20"
          : "bg-transparent border-border/20"
      }`}
      aria-label="Main"
    >
      <div className="section-container flex flex-wrap items-center justify-between py-4">
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          aria-label="Home - Luan Tran"
          onClick={closeMenu}
        >
          <img
            className="w-10 h-10 rounded-full border-2 border-border object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7cmmOu4xUkNNZlk-qh4r47i9n6R1mLQD-3Q&s"
            alt=""
          />
          <span className="typography-heading-3 whitespace-nowrap text-primaryPale">
            Luan Tran
          </span>
        </Link>

        {/* Hamburger button — mobile only */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-primaryLight hover:bg-primaryMed/50 transition-colors"
          aria-expanded={menuOpen}
          aria-controls="navbar-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <AnimatePresence mode="wait" initial={false}>
            {menuOpen ? (
              <motion.svg
                key="close"
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l12 12M13 1L1 13" />
              </motion.svg>
            ) : (
              <motion.svg
                key="burger"
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </motion.svg>
            )}
          </AnimatePresence>
        </button>

        {/* Desktop menu — always visible; mobile menu — animated */}
        <div className="hidden md:block md:w-auto">
          <ul className="flex md:flex-row md:gap-8">
            {NAV_LINKS.map(({ href, label, sectionId }) => {
              const isActive = activeSection === sectionId;
              return (
                <li key={href} className="relative">
                  <a
                    href={href}
                    className={`block py-2 text-body transition-colors duration-200 ${
                      isActive ? "text-primaryLight" : "text-primaryPale hover:text-primaryLight"
                    }`}
                  >
                    {label}
                    {isActive && (
                      <motion.span
                        className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-primaryLight rounded-full"
                        layoutId="nav-underline"
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="navbar-menu"
            className="md:hidden border-t border-border/20 bg-surface/95 backdrop-blur-md"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <ul className="flex flex-col px-4 py-3 gap-1">
              {NAV_LINKS.map(({ href, label, sectionId }) => {
                const isActive = activeSection === sectionId;
                return (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={closeMenu}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-body transition-colors duration-150 ${
                        isActive
                          ? "text-primaryLight bg-primaryMed/10"
                          : "text-primaryPale hover:text-primaryLight hover:bg-primaryMed/8"
                      }`}
                    >
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primaryLight flex-shrink-0" aria-hidden="true" />
                      )}
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
