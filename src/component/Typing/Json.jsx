import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
const TypingCode = ({
  isVisible,
  setIsVisible,
  onViewMore,
  autoShow = false,
}) => {
  const nav = useNavigate();
  const handleViewMore = () => {
    if (onViewMore) onViewMore();
    else nav("/");
  };
  const [IsShow, setIsShow] = useState(autoShow);
  const [showButton, setShowButton] = useState(false);
  const [hasAlerted, setHasAlerted] = useState(autoShow);

  useEffect(() => {
    if (hasAlerted) return;
    if (autoShow) {
      setIsShow(true);
      setHasAlerted(true);
      return;
    }
    let timer;
    if (!isVisible) {
      timer = setTimeout(() => {
        setIsShow(true);
        setHasAlerted(true);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [hasAlerted, isVisible, autoShow]);

  const isCoderStyle = autoShow;

  return (
    <div className={isCoderStyle ? "w-full" : ""}>
      <div
        className={`flex flex-col gap-2 items-start rounded-lg transition-colors duration-500 ${
          isCoderStyle
            ? "w-full p-4 md:p-5 bg-surfaceElevated border border-border/80 text-left font-mono text-body-sm md:text-body"
            : `p-4 w-fit text-primaryPale rounded-md ${
                isVisible ? "bg-primaryLight" : "bg-primaryMed"
              }`
        }`}
      >
        {IsShow ? (
          <>
            <div className="flex justify-between gap-2">
              <TypeAnimation
                sequence={[
                  `const`, // Gõ "const Me = {"
                  // Đợi 1 giây sau khi gõ
                ]}
                wrapper="span"
                speed={20}
                cursor={false}
                className="text-[10px] md:text-xl"
                style={{
                  fontWeight: 600,
                  display: "inline-block",
                  color: "#da587c", // Màu chữ
                }}
              />
              <TypeAnimation
                sequence={[
                  `me`, // Gõ "const Me = {"
                  // Đợi 1 giây sau khi gõ
                ]}
                wrapper="span"
                speed={50}
                cursor={false}
                className="text-[10px] md:text-xl"
                style={{
                  fontWeight: 600,
                  display: "inline-block",
                  color: "#6a63da", // Màu chữ
                }}
              />

              <TypeAnimation
                sequence={[
                  " = {", // Gõ "const Me = {"
                  // Đợi 1 giây sau khi gõ
                ]}
                wrapper="span"
                speed={50}
                cursor={false}
                className="text-[10px] md:text-xl"
                style={{
                  fontWeight: 600,
                  display: "inline-block",
                  color: "#da587c", // Màu chữ
                }}
              />
            </div>
            <div className="flex justify-between gap-2">
              <div className="ml-4"></div>
              <TypeAnimation
                sequence={[
                  1000,
                  `FullName: `, // Gõ phần còn lại
                ]}
                wrapper="span"
                speed={50}
                cursor={false}
                className="text-[10px] md:text-xl"
                style={{
                  fontWeight: 600,
                  fontFamily: "monospace",
                  display: "inline-block",
                  color: "#ddebda", // Màu vàng cho phần còn lại
                }}
              />
              <TypeAnimation
                sequence={[1500, `"LÊ TRẦN THÀNH LUÂN",`]}
                wrapper="span"
                speed={50}
                cursor={false}
                className="text-[10px] md:text-xl"
                style={{
                  fontWeight: 600,
                  display: "inline-block",
                  color: "#e1f284", // Màu vàng cho chuỗi
                }}
              />
            </div>
            <div className="flex justify-between gap-2">
              <div className="ml-4"></div>
              <TypeAnimation
                sequence={[
                  2000,
                  `Roles: `, // Gõ phần còn lại
                ]}
                wrapper="span"
                speed={50}
                cursor={false}
                className="text-[10px] md:text-xl"
                style={{
                  fontWeight: 600,
                  fontFamily: "monospace",
                  display: "inline-block",
                  color: "#ddebda", // Màu vàng cho phần còn lại
                }}
              />
              <TypeAnimation
                sequence={[2500, `"FrontEnd Developer, BackEnd Developer",`]}
                wrapper="span"
                speed={50}
                cursor={false}
                className="text-[10px] md:text-xl"
                style={{
                  fontWeight: 600,
                  display: "inline-block",
                  color: "#e1f284", // Màu vàng cho chuỗi
                }}
              />
            </div>
            <div className="flex justify-between gap-2">
              <div className="ml-4"></div>
              <TypeAnimation
                sequence={[
                  3000,
                  `Graduate: `, // Gõ phần còn lại
                ]}
                wrapper="span"
                speed={50}
                cursor={false}
                className="text-[10px] md:text-xl"
                style={{
                  fontWeight: 600,
                  fontFamily: "monospace",
                  display: "inline-block",
                  color: "#ddebda", // Màu vàng cho phần còn lại
                }}
              />
              <TypeAnimation
                sequence={[3500, `"2023",`]}
                wrapper="span"
                speed={50}
                cursor={false}
                className="text-[10px] md:text-xl"
                style={{
                  fontWeight: 600,
                  display: "inline-block",
                  color: "#e1f284", // Màu vàng cho chuỗi
                }}
              />
            </div>
            <div className="flex justify-between gap-2">
              <div className="ml-4"></div>
              <TypeAnimation
                sequence={[
                  4000,
                  `Email: `, // Gõ phần còn lại
                ]}
                wrapper="span"
                speed={50}
                cursor={false}
                className="text-[10px] md:text-xl"
                style={{
                  fontWeight: 600,
                  fontFamily: "monospace",
                  display: "inline-block",
                  color: "#ddebda", // Màu vàng cho phần còn lại
                }}
              />
              <TypeAnimation
                sequence={[4500, `"letranthanhluan03092001@gmail.com",`]}
                wrapper="span"
                speed={50}
                cursor={false}
                className="text-[10px] md:text-xl"
                style={{
                  fontWeight: 600,
                  display: "inline-block",
                  color: "#e1f284", // Màu vàng cho chuỗi
                }}
              />
            </div>
            <div className="flex justify-between gap-2">
              <div className="ml-4"></div>
              <TypeAnimation
                sequence={[
                  5000,
                  `Phone: `, // Gõ phần còn lại
                ]}
                wrapper="span"
                speed={50}
                cursor={false}
                className="text-[10px] md:text-xl"
                style={{
                  fontWeight: 600,
                  fontFamily: "monospace",
                  display: "inline-block",
                  color: "#ddebda", // Màu vàng cho phần còn lại
                }}
              />
              <TypeAnimation
                sequence={[5500, `"0898521685",`]}
                wrapper="span"
                speed={50}
                cursor={false}
                className="text-[10px] md:text-xl"
                style={{
                  fontWeight: 600,
                  display: "inline-block",
                  color: "#e1f284", // Màu vàng cho chuỗi
                }}
              />
            </div>

            <div className="flex justify-between gap-2">
              <div className="ml-4"></div>
              <TypeAnimation
                sequence={[
                  6000,
                  `Position: `, // Gõ phần còn lại
                ]}
                wrapper="span"
                speed={50}
                cursor={false}
                className="text-[10px] md:text-xl"
                style={{
                  fontWeight: 600,
                  fontFamily: "monospace",
                  display: "inline-block",
                  color: "#ddebda", // Màu vàng cho phần còn lại
                }}
              />
              <TypeAnimation
                sequence={[6500, `"HCM City",`]}
                wrapper="span"
                speed={50}
                cursor={false}
                className="text-[10px] md:text-xl"
                style={{
                  fontWeight: 600,
                  display: "inline-block",
                  color: "#e1f284", // Màu vàng cho chuỗi
                }}
              />
            </div>

            <TypeAnimation
              sequence={[
                7000,
                "}", // Gõ dấu kết thúc
                () => {
                  setShowButton(true);
                },
              ]}
              wrapper="span"
              speed={50}
              cursor={false}
              className="text-[10px] md:text-xl"
              style={{
                fontWeight: 600,
                display: "inline-block",
                color: "#da587c", // Màu chữ
              }}
            />
          </>
        ) : (
          ""
        )}
      </div>

      <button
        type="button"
        className={`text-body-sm md:text-body mt-4 rounded-lg border border-border bg-transparent hover:bg-primaryMed/20 text-primaryPale font-medium px-4 py-2 transition-all duration-300 ${
          showButton ? "scale-100 opacity-100" : "scale-0 opacity-0"
        } ${
          isCoderStyle ? "border-primaryLight/50 hover:border-primaryLight" : ""
        }`}
        onClick={handleViewMore}
      >
        View more
      </button>
    </div>
  );
};

export default TypingCode;
