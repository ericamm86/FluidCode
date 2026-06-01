/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"]
      },
      colors: {
        surface: "#101419",
        panel: "#171d24",
        muted: "#8f9bab",
        line: "#26313d"
      },
      boxShadow: {
        glow: "0 18px 60px rgba(20, 184, 166, 0.12)"
      }
    }
  },
  plugins: []
};
