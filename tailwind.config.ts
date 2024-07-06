/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      color:{
        purple: {
          'default': '#7E24C4',
          'dark': '#54078F',
          'dark-skeleton': '#3b215a',
          '100': '#EAE7FF',
          '150': '#ECE7FF',
          '200': '#E2E1EE',
          '300': '#F722F7',
          '500': '#7C24C5',
          '600': '#320E4E',
          '700': '#54078F',
          '800': '#493164',
          '850': '#8f00ff',
          '900': '#392F4E',
          '950': '#230541' 
        },
      }
    },
  },
  plugins: [],
}