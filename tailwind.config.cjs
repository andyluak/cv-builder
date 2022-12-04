/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./templates/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f6f6f7",
          100: "#e1e2e6",
          200: "#c3c4cc",
          300: "#9d9eab",
          400: "#787989",
          500: "#5e5f6e",
          600: "#4a4a57",
          700: "#3d3d48",
          800: "#34343b",
          900: "#1f1f23",
          DEFAULT: "#1f1f23",
        },
        secondary: {
          50: "#f5f9fa",
          100: "#e9f2f5",
          200: "#cfe4e8",
          300: "#97c6cf",
          400: "#73b2bd",
          500: "#519aa6",
          600: "#3e7d8b",
          700: "#346570",
          800: "#2e555e",
          900: "#2a4850",
          DEFAULT: "#97C6CF",
        },
        accent: {
          50: "#ebfef6",
          100: "#cefde7",
          200: "#a1f9d3",
          300: "#65f0be",
          400: "#28dfa2",
          500: "#03cc90",
          600: "#00a172",
          700: "#00815f",
          800: "#00664c",
          900: "#005441",
          DEFAULT: "#03CC90",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
