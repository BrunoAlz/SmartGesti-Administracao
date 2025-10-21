/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: 'class', // Explicitar o modo dark baseado em classe
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          '400-rgb': '96, 165, 250',
          '500-rgb': '59, 130, 246',
          '600-rgb': '37, 99, 235',
        },
        secondary: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          '400-rgb': '148, 163, 184',
          '500-rgb': '100, 116, 139',
          '600-rgb': '71, 85, 105',
        },
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          '400-rgb': '74, 222, 128',
          '500-rgb': '34, 197, 94',
          '600-rgb': '22, 163, 74',
        },
        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          '400-rgb': '251, 191, 36',
          '500-rgb': '245, 158, 11',
          '600-rgb': '217, 119, 6',
        },
        error: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          '400-rgb': '248, 113, 113',
          '500-rgb': '239, 68, 68',
          '600-rgb': '220, 38, 38',
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        elevated:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      animation: {
        swing: "swing 0.6s ease-in-out",
        scaleIn: "scaleIn 0.2s ease-out forwards",
        fadeInLeft: "fadeInLeft 0.2s ease-out forwards",
        fadeInDown: "fadeInDown 0.2s ease-out forwards",
        fadeInFast: "fadeIn 0.15s ease-out forwards",
      },
      keyframes: {
        swing: {
          "0%": { transform: "rotate(0deg)" },
          "10%": { transform: "rotate(10deg)" },
          "30%": { transform: "rotate(-10deg)" },
          "50%": { transform: "rotate(5deg)" },
          "70%": { transform: "rotate(-5deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        scaleIn: {
          "from": { opacity: "0", transform: "translateY(-10px) translateX(-50%) scale(0.95)" },
          "to": { opacity: "1", transform: "translateY(0) translateX(-50%) scale(1)" }
        },
        fadeInLeft: {
          "from": { opacity: "0", transform: "translateX(-10px) scale(0.98)" },
          "to": { opacity: "1", transform: "translateX(0) scale(1)" }
        },
        fadeInDown: {
          "from": { opacity: "0", transform: "translateY(-10px)" },
          "to": { opacity: "1", transform: "translateY(0)" }
        },
        fadeIn: {
          "from": { opacity: "0" },
          "to": { opacity: "1" }
        },
      },
    },
  },
  plugins: [],
};
