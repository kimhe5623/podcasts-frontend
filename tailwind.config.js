const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        violet: colors.violet,
        dark: '#000000b0',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}