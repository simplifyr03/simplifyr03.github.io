import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#5e6ad2", hover: "#828fff", focus: "#5e69d1" },
        ink: { DEFAULT: "#f7f8f8", muted: "#d0d6e0", subtle: "#8a8f98", tertiary: "#62666d" },
        canvas: "#010102",
        surface: { 1: "#0f1011", 2: "#141516", 3: "#18191a", 4: "#191a1b" },
        hairline: { DEFAULT: "#23252a", strong: "#34343a", tertiary: "#3e3e44" },
        success: "#27a644",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "SF Pro Display", "-apple-system", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SF Mono", "Menlo", "monospace"],
      },
      borderRadius: { xs: "4px", sm: "6px", md: "8px", lg: "12px", xl: "16px", xxl: "24px" },
      letterSpacing: { "display-xl": "-3px", "display-lg": "-1.8px", "display-md": "-1px", headline: "-0.6px" },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        beam: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(100vh)", opacity: "0" },
        },
        shimmer: { from: { backgroundPosition: "200% 0" }, to: { backgroundPosition: "-200% 0" } },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        blink: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0" } },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        shimmer: "shimmer 6s linear infinite",
        "spin-slow": "spin-slow 24s linear infinite",
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;
