/** @type {import('tailwindcss').Config} */

/** Site palette – only these 4 colors (+ dark surface for contrast):
 *  #E2852E (226, 133, 46)  – primary / orange
 *  #F5C857 (245, 200, 87)  – primaryMed / gold
 *  #FFEE91 (255, 238, 145) – primaryLight / light yellow
 *  #ABE0F0 (171, 224, 240) – primaryPale / sky
 */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E2852E",
        primaryMed: "#F5C857",
        primaryLight: "#FFEE91",
        primaryPale: "#ABE0F0",
        surface: "#1a1008",
        surfaceElevated: "#2d1f0f",
        surfaceCard: "#2d1f0f",
        border: "#F5C857",
        accent: "#F5C857",
        accentHover: "#FFEE91",
        muted: "#FFEE91",
        mutedStrong: "#F5C857",
      },
      fontSize: {
        display: [
          "clamp(2.5rem, 8vw, 6rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
        "heading-1": [
          "clamp(2rem, 4vw, 3.5rem)",
          { lineHeight: "1.15", letterSpacing: "-0.02em" },
        ],
        "heading-2": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.25" }],
        "heading-3": ["clamp(1.25rem, 2.5vw, 1.5rem)", { lineHeight: "1.3" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        body: ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
        caption: ["0.75rem", { lineHeight: "1.4" }],
      },
      fontFamily: {
        sans: ["Roboto Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
