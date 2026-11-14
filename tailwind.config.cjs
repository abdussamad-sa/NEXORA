module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class', // enable class strategy for dark mode
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        card: '#1f1f1f',
        accent: '#0ea5e9',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
