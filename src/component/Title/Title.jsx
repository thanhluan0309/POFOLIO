function Title({ content }) {
  return (
    <h2 className="typography-heading-1 relative w-fit after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-primaryLight after:transition-all after:duration-300 hover:after:w-full">
      {content}
    </h2>
  );
}

export default Title;
