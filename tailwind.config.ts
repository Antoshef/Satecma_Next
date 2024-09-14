import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/globals.css",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        darkGrey: "rgb(31 41 55 / 0.9)",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      fontSize: {
        h1: "2.25rem", // 36px
        h2: "1.875rem", // 30px
        h3: "1.5rem", // 24px
        h4: "1.25rem", // 20px
        h5: "1.125rem", // 18px
        h6: "1rem", // 16px
        p: "1rem", // 16px
        small: "0.875rem", // 14px
      },
    },
  },
  variants: {
    extend: {
      opacity: ["responsive", "hover", "focus", "group-hover"],
      display: ["responsive", "group-hover"],
    },
  },
  plugins: [],
};
export default config;
