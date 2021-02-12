const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './src/**/*.tsx',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        violet: colors.violet,
        dark: '#000000b0',
      },
      inset: {
        "2/7": "26.333333%",
        "9/10": "92%"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}