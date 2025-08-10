/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true, 
        screens: {    
          sm: '540px',
          md: '720px',
          lg: '960px',
          xl: '1140px',
          '2xl': '1320px',
        },
        padding: {
          DEFAULT: '1rem', 
          sm: '1rem',
          lg: '2rem',
          xl: '2rem',
          '2xl': '2rem',
        },
      },
    },
  },
  plugins: [],
}
