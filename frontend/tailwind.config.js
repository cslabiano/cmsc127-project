/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        kusinaprimary: "#B65949",
        kusinaprimarylight: "#DD8272",
        kusinasecondary: "#DBC9A4",
        kusinaaccent: "#C5B96D",
        kusinaaccentlight: "#E3D998",
        kusinablack: "#120907",
        kusinabg: "#FAF4F4",
        lightstar: "#EDD5D2",
      },
      keyframes: {
        transitionIn: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        transitionOut: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-10px)" },
        },
      },
      animation: {
        transitionIn: "transitionIn 1.00s ease-in-out",
      },
    },
    fontFamily: {
      sans: ["General Sans", "sans-serif"],
    },
    boxShadow: {
      "inner-custom": "inset 0 0 10px 4px rgba(0, 0, 0, 0.1)",
    },
  },
  plugins: [
    require("daisyui"),
    function ({ addUtilities }) {
      addUtilities({
        ".placeholder-text-xs::placeholder": {
          fontSize: "0.75rem",
        },
        ".placeholder-text-sm::placeholder": {
          fontSize: "0.875rem",
        },
        ".placeholder-text-base::placeholder": {
          fontSize: "1rem",
        },
        ".placeholder-text-lg::placeholder": {
          fontSize: "1.75rem",
        },
        ".placeholder-text-xl::placeholder": {
          fontSize: "2rem",
        },
        // Add more as needed
      });
    },
  ],
  daisyui: {
    themes: [
      {
        kusinatheme: {
          primary: "#B65949",
          secondary: "#DBC9A4",
          accent: "#C5B96D",
        },
      },
    ],
  },
};
