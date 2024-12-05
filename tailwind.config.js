/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        digital: ['DigitalClockFont', 'monospace'], // Added Custom Font for Clock named 'digital'
      },
    },
  },
  plugins: [],
}