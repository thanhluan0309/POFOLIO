const ContentLeft = () => {
  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-4 p-2 bg-gray-200 rounded-r-xl shadow-xl z-10">
      {/* GitHub Icon */}
      <a
        href="https://github.com/thanhluan0309"
        target="_blank"
        rel="noopener noreferrer"
        className="relative group"
      >
        <div className="flex items-center justify-center w-12 h-12 bg-gray-800 text-white rounded-full shadow-md transform transition-transform duration-300 group-hover:scale-110">
          <i className="fab fa-github text-lg"></i>
        </div>
        <span className="absolute left-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:left-16 bg-gray-800 text-white text-sm font-semibold px-2 py-1 rounded-md shadow-md transition-all duration-300">
          GitHub
        </span>
      </a>

      {/* Facebook Icon */}
      <a
        href="https://www.facebook.com/profile.php?id=100008443060908"
        target="_blank"
        rel="noopener noreferrer"
        className="relative group"
      >
        <div className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full shadow-md transform transition-transform duration-300 group-hover:scale-110">
          <i className="fab fa-facebook-f text-lg"></i>
        </div>
        <span className="absolute left-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:left-16 bg-blue-600 text-white text-sm font-semibold px-2 py-1 rounded-md shadow-md transition-all duration-300">
          Facebook
        </span>
      </a>

      {/* LinkedIn Icon */}
      <a
        href="https://www.linkedin.com/in/l%C3%AA-tr%E1%BA%A7n-th%C3%A0nh-lu%C3%A2n-2b75b723b/"
        target="_blank"
        rel="noopener noreferrer"
        className="relative group"
      >
        <div className="flex items-center justify-center w-12 h-12 bg-blue-700 text-white rounded-full shadow-md transform transition-transform duration-300 group-hover:scale-110">
          <i className="fab fa-linkedin-in text-lg"></i>
        </div>
        <span className="absolute left-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:left-16 bg-blue-700 text-white text-sm font-semibold px-2 py-1 rounded-md shadow-md transition-all duration-300">
          LinkedIn
        </span>
      </a>
    </div>
  );
};
export default ContentLeft;
