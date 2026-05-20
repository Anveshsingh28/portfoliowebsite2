/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#0B0B1A",
        codex: {
          cyan: "#00FFFF",
          magenta: "#FF00FF",
          green: "#39FF88",
          ink: "#050711",
          line: "rgba(255,255,255,0.1)",
        },
      },
      fontFamily: {
        mono: [
          '"JetBrains Mono"',
          '"Fira Code"',
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0,0,0,0.37)",
        neonCyan: "0 0 24px rgba(0,255,255,0.38)",
        neonMagenta: "0 0 32px rgba(255,0,255,0.32)",
      },
      backgroundImage: {
        "deep-space":
          "radial-gradient(circle at 20% 20%, rgba(255,0,255,0.26), transparent 28%), radial-gradient(circle at 82% 18%, rgba(0,255,255,0.18), transparent 24%), radial-gradient(circle at 50% 100%, rgba(86,69,255,0.23), transparent 34%), linear-gradient(135deg, #0B0B1A 0%, #050711 42%, #13071f 72%, #061926 100%)",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        pulseGlow: {
          "0%, 100%": {
            opacity: "0.5",
            boxShadow: "0 0 18px rgba(0,255,255,0.24)",
          },
          "50%": {
            opacity: "1",
            boxShadow: "0 0 28px rgba(255,0,255,0.34)",
          },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-14px,0)" },
        },
      },
      animation: {
        scanline: "scanline 5s linear infinite",
        pulseGlow: "pulseGlow 3.8s ease-in-out infinite",
        drift: "drift 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
