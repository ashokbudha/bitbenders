/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#038E43',
          black: '#111111',
          gray: '#333333',
          neutral: '#FEFAF2',
          white: '#FFFFFF'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Tomato Grotesk', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
