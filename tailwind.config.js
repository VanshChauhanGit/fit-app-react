/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3efe18", // Primary color (e.g., for active links or buttons)
        secondary: "#71feca", // Secondary color (e.g., for highlights)
        accent: "#3afeef", // Accent color (optional)
        text: "#071e00", // Main text color
        background: "#f2ffee", // Background color
      },
      fontSize: {
        sm: "0.750rem", // Small text
        base: "1rem", // Default text
        xl: "1.333rem", // Extra large text
        "2xl": "1.777rem", // 2x Extra large text
        "3xl": "2.369rem", // 3x Extra large text
        "4xl": "3.158rem", // 4x Extra large text
        "5xl": "4.210rem", // 5x Extra large text
      },
      fontFamily: {
        heading: ["Oxanium", "sans-serif"], // Heading font
        body: ["Oxanium", "sans-serif"], // Body font
      },
      fontWeight: {
        normal: "400", // Normal weight
        bold: "700", // Bold weight
      },
    },
  },
  plugins: [],
};
