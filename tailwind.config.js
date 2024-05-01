/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        short: { raw: "(max-height: 600px)" },
      },
      colors: {
        highlight: "rgb(var(--highlight) / <alpha-value>)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
}
