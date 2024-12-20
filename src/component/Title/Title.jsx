const Title = ({ content }) => {
  return (
    <span className="relative text-gray-200 text-5xl font-bold after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-1 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full">
      {content}
    </span>
  );
};
export default Title;
