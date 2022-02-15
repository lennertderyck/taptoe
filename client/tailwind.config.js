module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["parisplus-std", "sans-serif"],
      body: ['parisplus-std', 'sans-serif'],
      display: ['stratos', 'sans-serif'],
    },
    extend: {
      colors: {
        tt: {
          emerald: {
            '500': "#459E8A",
            '700': '#406259',
          },
          blue: {
            '500': "#26335E",
            '700': '#1C2440',
          },
          red: {
            '500': "#A02A35",
          }
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
