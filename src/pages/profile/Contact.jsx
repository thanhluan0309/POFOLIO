import React from "react";

const ContactPage = () => {
  return (
    <div className="min-h-screen w-full bg-[#0e0e0e] flex items-center justify-center">
      <div className="bg-[#1e1e1e] m-auto shadow-2xl rounded-2xl p-8 md:p-12 w-full max-w-2xl transition-transform transform hover:scale-105 duration-500">
        <h1 className="text-3xl font-extrabold text-white text-center mb-6">
          Contact Me
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Reach out through the details below. I’m here to help!
        </p>
        <div className="space-y-6">
          {/* Name */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg">
              <i className="fas fa-user text-2xl"></i>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-200">Họ tên</h2>
              <p className="text-gray-400">LÊ TRẦN THÀNH LUÂN</p>
            </div>
          </div>
          {/* Email */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 bg-green-600 text-white rounded-full shadow-lg">
              <i className="fas fa-envelope text-2xl"></i>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-200">Email</h2>
              <p className="text-gray-400">letranthanhluan03092001@gmail.com</p>
            </div>
          </div>
          {/* Phone */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 bg-red-600 text-white rounded-full shadow-lg">
              <i className="fas fa-phone-alt text-2xl"></i>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-200">
                Số điện thoại
              </h2>
              <p className="text-gray-400">0898521685</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <a
            href="https://www.linkedin.com/in/l%C3%AA-tr%E1%BA%A7n-th%C3%A0nh-lu%C3%A2n-2b75b723b/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 text-sm text-gray-900 bg-yellow-400 rounded-full shadow-lg hover:bg-yellow-300 transition-colors duration-300"
          >
            LinkedIn Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
