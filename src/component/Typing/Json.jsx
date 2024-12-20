import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
const TypingCode = ({ isVisible, setIsVisible }) => {
  let nav = useNavigate();
  const [IsShow, setIsShow] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [hasAlerted, setHasAlerted] = useState(false);

  useEffect(() => {
    // Kiểm tra nếu đã trigger alert thì không làm gì nữa
    if (hasAlerted) return;

    // Thiết lập setTimeout để trigger alert sau 3 giây
    let timer;
    if (!isVisible) {
      timer = setTimeout(() => {
        setIsShow(true);
        setHasAlerted(true); // Cập nhật trạng thái đã alert
      }, 2000); // 3 giây = 3000ms
    }

    // Cleanup: nếu component unmount hoặc trước khi trigger alert thì xóa timer
    return () => clearTimeout(timer);
  }, [hasAlerted, isVisible]); // Chạy lại effect chỉ khi `hasAlerted` thay đổi

  return (
    <div>
      <div
        className={`flex flex-col gap-2 items-start p-4 w-fit  text-[#141b2d] rounded-md transition-colors  duration-1000 transform ${
          isVisible ? " bg-red-400" : "bg-[#1f2a40]"
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
        className={`text-[10px] md:text-xl mt-4 rounded-sm bg-emerald-300 pl-4 pr-4 pt-2 pb-2 font-semibold shadow-md text-[#393E40] transition-transform duration-700 transform ${
          showButton ? "scale-100" : "scale-0"
        }`}
        onClick={() => {
          nav("/home");
        }}
      >
        View more
      </button>
    </div>
  );
};

export default TypingCode;
