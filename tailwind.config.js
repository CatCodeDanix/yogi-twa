/** @type {import('tailwindcss').Config} */

const { nextui } = require('@nextui-org/react');

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  jit: true,
  theme: {
    extend: {
      fontFamily: {
        main: ['Vazirmatn', 'sans-serif'],
      },
      colors: {
        darki: 'rgba(255,255,255,0.5)',
      },
    },
  },
  plugins: [nextui()],
  darkMode: 'class',
};
