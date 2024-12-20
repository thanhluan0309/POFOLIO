import TypingMyself from "../../component/Typing/myself";
import TypingCode from "../../component/Typing/Json";
import { useState } from "react";

const Intro = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="App w-full h-[100vh] bg-[#141b2d] flex ">
      <div className="m-auto">
        <TypingMyself
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        ></TypingMyself>

        <TypingCode
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        ></TypingCode>
      </div>
    </div>
  );
};

export default Intro;
