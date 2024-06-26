const { transform } = require("next/dist/build/swc");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    screens: {
      xs: "576px",
      md: "768px",
    },
    animation: {
      changeFormRegister: "changeFormRegister 1s forwards",
      changeFormLogin: "changeFormLogin 1s forwards",
      changeFormRegister1: "changeFormRegister1 1s forwards",
      changeFormLogin1: "changeFormLogin1 1s forwards",
      popUp: "popUp 2s forwards",
    },
    keyframes: {
      popUp: {
        "0%": {
          opacity: 0,
        },
        "100%": {
          opacity: 1,
          transform: "scale(100%)",
        },
      },
      changeFormRegister: {
        "0%": {
          transform: "translateX(0)",
          opacity: 1,
        },
        "50%": {
          transform: "translateX(-100px) ",
          opacity: 0,
        },
        "100%": {
          transform: "scale(0)",
          opacity: 0,
        },
      },
      changeFormLogin: {
        "0%": {
          transform: "translateX(100px)",
          opacity: 0,
        },
        "50%": {
          transform: "translateX(0) ",
          opacity: 1,
        },
        "100%": {
          opacity: 1,
        },
      },
      changeFormRegister1: {
        "0%": {
          transform: "translateX(0)",
          opacity: 1,
        },
        "50%": {
          transform: "translateX(100px) ",

          opacity: 0,
        },
        "100%": {
          transform: "scale(0)",
          opacity: 0,
        },
      },
      changeFormLogin1: {
        "0%": {
          transform: "translateX(-100px)",
          opacity: 0,
        },
        "50%": {
          transform: "translateX(0) ",
          opacity: 1,
        },
        "100%": {
          opacity: 1,
        },
      },
    },
  },
  plugins: [],
  important: true,
};
