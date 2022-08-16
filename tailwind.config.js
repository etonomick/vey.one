/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Inter'],
    },
    extend: {
      aspectRatio: {
        '4/3': '4 /3'
      },
    },
  },
  plugins: [],
}
