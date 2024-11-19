import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        link: "var(--link)",
        primary: "var(--primary)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: {
        xs: "var(--small-font-size)",
        sm: "var(--medium-font-size)",
        lg: "var(--large-font-size)",
        xl: "var(--extra-large-font-size)",
        // '2xl': 'var(--double-extra-large-font-size)',
        // '3xl': 'var(--triple-extra-large-font-size)',
        // '4xl': 'var(--quadruple-extra-large-font-size)',
        // '5xl': 'var(--quintuple-extra-large-font-size)',
        // '6xl': 'var(--six-extra-large-font-size)',
        // '7xl': 'var(--seven-extra-large-font-size)',
        // '8xl': 'var(--eight-extra-large-font-size)',
      },

      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  
} satisfies Config;
