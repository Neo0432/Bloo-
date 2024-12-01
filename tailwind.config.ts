import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      dropShadow: {
        "link-shadow": "0 4px 6px rgba(229, 143, 127, 0.1)",
      },
    },
    colors: {
      "second-orange": "#D97462",
      "second-orange-active": "#CC4129",
      "background-gray": "#333333",
      transparent: "#00000000",
    },
    fontFamily: {
      thin: "Montserrat-Thin",
      extralight: "Montserrat-ExtraLight",
      light: "Montserrat-Light",
      regular: "Montserrat-Regular",
      medium: "Montserrat-Medium",
      mediumItalic: "Montserrat-MediumItalic",
      semibold: "Montserrat-SemiBold",
      bold: "Montserrat-Bold",
      exstrabold: "Montserrat-ExtraBold",
      black: "Montserrat-Black",
    },
    backgroundImage: {
      "first-gray":
        "linear-gradient(90deg, rgba(33, 33, 33, 1) 25%, rgba(23, 23, 23, 1) 100%)",
    },
  },
  plugins: [],
} satisfies Config;
