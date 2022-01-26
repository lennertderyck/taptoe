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
        }
      }
    },
  },
  plugins: [],
}
