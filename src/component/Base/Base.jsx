import React, { useEffect } from "react";
import Navbar from "../navbar/navbar";
import ContentLeft from "../ContentLeft/ContentLeft";
import Aos from "aos";
const Base = ({ children }) => {
  useEffect(() => {
    Aos.init({
      duration: 2000, // Thời gian animation (ms)
      once: true, // Chỉ chạy animation một lần khi cuộn
      delay: 200, // Độ trễ trước khi animation bắt đầu (ms)
    });
  }, []);
  const childrenWithProps = React.Children.map(children, (child) =>
    React.cloneElement(child, {})
  );

  return (
    <>
      <div className="bg-[#0e0e0e] w-full h-max flex">
        <div className="w-full items-center justify-center m-auto">
          <div
            // style={{
            //   backgroundImage:
            //     "url(https://i.pinimg.com/736x/56/48/d5/5648d5f4185b49b09aa5b931bcbe2fad.jpg)",
            //   backgroundPosition: "center",
            //   backgroundRepeat: "no-repeat",
            //   // objectFit: "cover",
            //   backgroundSize: "cover",
            // }}
            className=" w-full h-[100vh]  flex flex-col justify-start"
          >
            <ContentLeft></ContentLeft>
            <Navbar></Navbar>
            <div className=" h-auto bg-[#0e0e0e]"> {childrenWithProps}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Base;
