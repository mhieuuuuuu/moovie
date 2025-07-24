/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#121212",
        surface: "#1E1E1E",
        text: "#FFFFFF",
        subtitle: "#AAAAAA",
        primary: "#E50914",
        border: "#2C2C2C",
        hover: "#b3fcff",
        rating: {
          high: "#4CAF50",
          medium: "#FFC107",
          low: "#F44336",
        },
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/line-clamp"),
  ],
};
