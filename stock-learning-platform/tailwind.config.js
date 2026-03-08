/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Source Serif Pro"', 'serif'],
      },
      colors: {
        primary: '#4338ca', // indigo-700 for a richer premium feel
        secondary: '#6b7280', // grey
        accent: '#f59e0b', // orange/yellow
        success: '#10b981', // green
        warning: '#fbbf24', // yellow
        danger: '#ef4444', // red
      },
    },
  },
  plugins: [],
}
