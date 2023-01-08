/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        scale: {
          '0%': { transform: 'scale(1)' },
          '30%': { transform: 'scaleX(1.1)' },
          '45%': { transform: 'scaleX(1)' },
        }
      },
      animation: {
        scale: 'scale 1.2s ease-in-out',
      },
      colors: {
        'panel-grey': '#77777',
      }
    },
  },
  plugins: [
    require('@kamona/tailwindcss-perspective'),
    // ...
  ],
  mode: 'jit',
}
