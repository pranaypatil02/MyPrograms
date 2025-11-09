/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af', // blue
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
