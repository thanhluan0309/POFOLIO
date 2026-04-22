import TypingMyself from "../../component/Typing/myself";
import TypingCode from "../../component/Typing/Json";
import { useState } from "react";

const Intro = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="App w-full h-[100vh] bg-primary flex ">
      <div className="m-auto"></div>
    </div>
  );
};

export default Intro;
