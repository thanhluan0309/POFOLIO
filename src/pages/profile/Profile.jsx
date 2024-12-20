import MyAvatar from "../../assets/img/avatar.png";
import myCv from "../../assets/cv/CV_FULLSTACK-DEVELOPER .pdf";
const Profile = () => {
  return (
    <div className="flex flex-col w-full">
      {" "}
      <div className=" md:mt-24 grid grid-cols-1 md:grid-cols-2  items-center px-4 sm:px-8 lg:px-16">
        {/* Avatar Section */}
        <div
          data-aos="fade-right"
          className="order-2 md:order-1 relative flex items-center justify-center"
        >
          <svg
            className="absolute z-[-1] 
      w-40 h-40 sm:w-56 sm:h-56 
      md:w-72 md:h-72 
      lg:w-[700px] lg:h-[700px]"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#BAE6FF"
              d="M43.8,-37.6C55,-20.9,61.1,-2.8,57.9,14C54.7,30.8,42.2,46.2,26.2,53.5C10.2,60.9,-9.2,60.2,-28.9,53.3C-48.7,46.4,-68.8,33.3,-72.5,16.7C-76.2,0,-63.5,-20.2,-48.7,-37.8C-33.9,-55.3,-16.9,-70.1,-0.3,-69.9C16.3,-69.6,32.6,-54.3,43.8,-37.6Z"
              transform="translate(100 100)"
            />
          </svg>
          <img
            className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-[700px] lg:h-[700px] object-cover rounded-3xl hover:scale-105 transition-transform duration-500"
            src={MyAvatar}
            alt="My Avatar"
          />
        </div>

        {/* Text Section */}
        <div
          data-aos="fade-up"
          className="order-1 md:order-2 flex flex-col gap-8 text-white text-center md:text-left p-6 sm:p-8 "
        >
          {/* Heading */}
          <span className="text-5xl sm:text-5xl md:text-5xl lg:text-8xl xl:text-9xl break-words font-extrabold uppercase text-gray-200">
            CREATIVE
          </span>

          {/* Subtitle */}
          <span className="text-3xl sm:text-2xl md:text-lg lg:text-4xl font-semibold tracking-widest uppercase text-gray-200">
            D E V E L O P E R
          </span>

          {/* Description */}
          <span className="text-lg sm:text-xl md:text-lg  lg:text-3xl font-light italic tracking-wide text-gray-300 max-w-full md:max-w-2xl mx-auto md:mx-0">
            Sensible to Front End, designing with passion and precision. Let’s
            build something amazing together!
          </span>
          <div className="flex w-full">
            <a
              // href={myCv}
              // download="CV_FULLSTACK-DEVELOPER.pdf"
              class="cursor-pointer m-auto bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-300"
              onClick={() => {
                window.open(
                  "https://drive.google.com/file/d/16S98fuDhHCh8xylfkLd0duemu9ggiqlp/view?usp=sharing"
                );
              }}
            >
              OPEN MY RESUME
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
