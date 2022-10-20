module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1168px',
        '2xl': '1496px',
      },
    },
    screens: {
      '2xl': {'max': '1496px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1168px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '984px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '728px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '600px'},
      // => @media (max-width: 639px) { ... }
    }
  },
  plugins: [],
}