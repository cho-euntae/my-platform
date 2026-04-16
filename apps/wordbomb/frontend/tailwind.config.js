/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        bomb: {
          50: "#FFF5F0",
          100: "#FFE8DC",
          500: "#FF6B2C",
          600: "#FF5511",
          700: "#E64A0E"
        },
        dark: {
          bg: "#0B0E14",
          card: "#141921",
          border: "#1E2736",
          text: "#E2E8F0",
          sub: "#64748B"
        }
      },
      animation: {
        "bomb-float": "bombFloat 2s ease-in-out infinite",
        "bomb-pulse": "bombPulse 0.5s ease-in-out infinite",
        "shake": "shakeScreen 0.4s ease",
        "explode": "explode 0.8s ease-out forwards",
        "fade-in-up": "fadeInUp 0.3s ease",
        "combo-pop": "comboPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
      },
      keyframes: {
        bombFloat: {
          "0%, 100%": { transform: "translateY(0) rotate(-3deg)" },
          "50%": { transform: "translateY(-8px) rotate(3deg)" }
        },
        bombPulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.15)" }
        },
        shakeScreen: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-8px)" },
          "40%": { transform: "translateX(8px)" },
          "60%": { transform: "translateX(-5px)" },
          "80%": { transform: "translateX(5px)" }
        },
        explode: {
          "0%": { transform: "translate(-50%, -50%) scale(0)", opacity: "1" },
          "100%": { transform: "translate(-50%, -50%) scale(3)", opacity: "0" }
        },
        fadeInUp: {
          "from": { opacity: "0", transform: "translateY(6px)" },
          "to": { opacity: "1", transform: "translateY(0)" }
        },
        comboPop: {
          "from": { opacity: "0", transform: "scale(0.5)" },
          "to": { opacity: "1", transform: "scale(1)" }
        }
      }
    }
  },
  plugins: []
}
