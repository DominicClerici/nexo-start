/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        highlight: "rgb(var(--highlight) / <alpha-value>)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
}
