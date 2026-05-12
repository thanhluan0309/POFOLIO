const SOCIAL_LINKS = [
  {
    href: "https://github.com/thanhluan0309",
    label: "GitHub",
    icon: "fab fa-github",
    bgClass: "bg-primary",
  },
  // {
  //   href: "https://www.facebook.com/profile.php?id=100008443060908",
  //   label: "Facebook",
  //   icon: "fab fa-facebook-f",
  //   bgClass: "bg-primaryMed",
  // },
  {
    href: "https://www.linkedin.com/in/l%C3%AA-tr%E1%BA%A7n-th%C3%A0nh-lu%C3%A2n-2b75b723b/",
    label: "LinkedIn",
    icon: "fab fa-linkedin-in",
    bgClass: "bg-primaryLight",
  },
];

function ContentLeft() {
  return (
    <div
      className="hidden md:flex fixed left-0 top-1/2 -translate-y-1/2 flex-col gap-3 p-2 bg-surfaceElevated border border-r border-border rounded-r-xl shadow-xl z-10"
      aria-label="Social links"
    >
      {SOCIAL_LINKS.map(({ href, label, icon, bgClass }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group"
          aria-label={label}
        >
          <div
            className={`flex items-center justify-center w-11 h-11 ${bgClass} ${
              label === "LinkedIn" ? "text-black" : "text-white"
            } rounded-lg transition-transform duration-300 group-hover:scale-110`}
          >
            <i className={`${icon} text-body`} aria-hidden="true" />
          </div>
          <span className="absolute left-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:left-16 bg-surfaceCard text-primaryPale typography-caption px-2 py-1 rounded-md shadow-lg border border-border transition-all duration-300 whitespace-nowrap">
            {label}
          </span>
        </a>
      ))}
    </div>
  );
}

export default ContentLeft;
