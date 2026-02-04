import { Link } from "react-router-dom";

const NAV_LINKS = [
  { href: "/#profile", label: "About me" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

function Navbar() {
  return (
    <nav
      className="bg-transparent text-primaryPale border-b border-border/50"
      aria-label="Main"
    >
      <div className="section-container flex flex-wrap items-center justify-between py-4">
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          aria-label="Home - Luân Trần"
        >
          <img
            className="w-10 h-10 rounded-full border-2 border-border object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7cmmOu4xUkNNZlk-qh4r47i9n6R1mLQD-3Q&s"
            alt=""
          />
          <span className="typography-heading-3 whitespace-nowrap text-primaryPale">
            Luân Trần
          </span>
        </Link>
        <button
          type="button"
          data-collapse-toggle="navbar-default"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-primaryLight hover:bg-primaryMed/50 transition-colors"
          aria-controls="navbar-default"
          aria-expanded="false"
          aria-label="Open menu"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div id="navbar-default" className="hidden w-full md:block md:w-auto">
          <ul className="flex flex-col md:flex-row md:gap-8 p-4 md:p-0 mt-4 md:mt-0">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="block py-2 text-body text-primaryPale hover:text-primaryLight transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
