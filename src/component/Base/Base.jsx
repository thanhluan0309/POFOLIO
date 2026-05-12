import React, { useEffect, useRef, createContext } from "react";
import Navbar from "../navbar/navbar";
import ContentLeft from "../ContentLeft/ContentLeft";
import Background from "../Background/Background";
import ChatBox from "../ChatBox/ChatBox";
import Aos from "aos";

export const ScrollContainerContext = createContext(null);

function Base({ children }) {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.style.overflow = "hidden";
      el.scrollTop = 0;
    }
    Aos.init({
      duration: 1200,
      once: true,
      delay: 150,
    });
    requestAnimationFrame(() => {
      if (el) {
        el.scrollTop = 0;
        el.style.overflow = "";
      }
    });
  }, []);

  return (
    <>
      <Background />
      <div className="relative bg-surface/95 w-full h-screen flex">
        <div className="w-full m-auto h-full flex min-h-0">
          <div className="w-full h-full flex flex-col min-h-0">
            <ContentLeft />
            <ScrollContainerContext.Provider value={scrollContainerRef}>
              <Navbar />
              <main
                ref={scrollContainerRef}
                className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden snap-y snap-mandatory"
              >
                {children}
              </main>
            </ScrollContainerContext.Provider>
          </div>
        </div>
      </div>
      <ChatBox />
    </>
  );
}

export default Base;
