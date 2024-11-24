/** @type {import('tailwindcss').Config} */
export default {
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