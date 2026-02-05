import React from "react";

const CONTACT_ITEMS = [
  {
    label: "Họ tên",
    value: "Lê Trần Thành Luân",
    icon: "fa-user",
    iconBg: "bg-primaryMed",
  },
  {
    label: "Email",
    value: "letranthanhluan03092001@gmail.com",
    icon: "fa-envelope",
    iconBg: "bg-primaryLight",
  },
  {
    label: "Số điện thoại",
    value: "0898521685",
    icon: "fa-phone-alt",
    iconBg: "bg-primary",
  },
];

const LINKEDIN_URL =
  "https://www.linkedin.com/in/l%C3%AA-tr%E1%BA%A7n-th%C3%A0nh-lu%C3%A2n-2b75b723b/";

function ContactPage() {
  return (
    <div className="w-full py-12 md:py-20 flex items-center justify-center">
      <div className="card-surface w-full max-w-xl p-8 md:p-10 transition-all duration-300 hover:border-accent/30">
        <h2 className="typography-heading-1 text-center mb-2">Contact me</h2>
        <p className="typography-body text-center text-muted mb-10">
          Reach out through the details below. I’m here to help!
        </p>
        <ul className="space-y-6">
          {CONTACT_ITEMS.map((item) => (
            <li key={item.label} className="flex items-center gap-4">
              <div
                className={`flex-shrink-0 w-12 h-12 rounded-xl ${item.iconBg} text-[#1a1a1a] flex items-center justify-center`}
                aria-hidden="true"
              >
                <i
                  className={`fas ${item.icon} text-body`}
                  aria-hidden="true"
                />
              </div>
              <div className="min-w-0">
                <p className="typography-body-sm text-muted">{item.label}</p>
                <p className="typography-body text-primaryPale truncate">
                  {item.value}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primaryPale hover:bg-primaryLight text-surface font-semibold text-body transition-colors duration-300"
          >
            LinkedIn Profile
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
