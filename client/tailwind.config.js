/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sidebar: '#FFFFFF',
        background: '#F5F6FA',
        primary: '#4F46E5', // Example, will adjust to match logo later
      }
    },
  },
  plugins: [],
}
