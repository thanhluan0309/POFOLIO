import React, { useEffect, useRef, createContext, useContext } from "react";
import Navbar from "../navbar/navbar";
import ContentLeft from "../ContentLeft/ContentLeft";
import Background from "../Background/Background";
import Aos from "aos";

export const ScrollContainerContext = createContext(null);

function Base({ children }) {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    Aos.init({
      duration: 1200,
      once: true,
      delay: 150,
    });
  }, []);

  return (
    <>
      <Background />
      <div className="relative bg-surface/95 w-full h-screen flex">
        <div className="w-full m-auto h-full flex min-h-0">
          <div className="w-full h-full flex flex-col min-h-0">
            <ContentLeft />
            <Navbar />
            <main
              ref={scrollContainerRef}
              className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden snap-y snap-mandatory"
            >
              <ScrollContainerContext.Provider value={scrollContainerRef}>
                {children}
              </ScrollContainerContext.Provider>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default Base;
