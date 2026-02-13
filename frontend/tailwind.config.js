/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lime: {
          50: '#f7fee7',
          100: '#ecfccf',
          200: '#d9f99d',
          300: '#bfef45',
          400: '#a3e635',
          500: '#84cc16',
          600: '#65a30d',
          700: '#4d7c0f',
          800: '#3f6212',
          900: '#365314',
        },
      },
      backgroundImage: {
        'glow-gradient': 'linear-gradient(135deg, #84cc16 0%, #7c3aed 50%, #06b6d4 100%)',
        'glow-gradient-dark': 'linear-gradient(135deg, #1a1a1a 0%, #0f172a 100%)',
        'glow-lime-purple': 'linear-gradient(135deg, #84cc16 0%, #7c3aed 100%)',
      },
      boxShadow: {
        'glow-lime': '0 0 30px rgba(132, 204, 22, 0.5), 0 0 60px rgba(132, 204, 22, 0.3)',
        'glow-lime-strong': '0 0 40px rgba(132, 204, 22, 0.8), 0 0 80px rgba(132, 204, 22, 0.4)',
        'glow-purple': '0 0 30px rgba(124, 58, 237, 0.5), 0 0 60px rgba(124, 58, 237, 0.3)',
        'glow-cyan': '0 0 30px rgba(6, 182, 212, 0.5), 0 0 60px rgba(6, 182, 212, 0.3)',
        'glow-border': 'inset 0 0 20px rgba(132, 204, 22, 0.2), 0 0 20px rgba(132, 204, 22, 0.3)',
      },
      borderColor: {
        glow: 'rgba(132, 204, 22, 0.4)',
      },
    },
  },
  plugins: [],
}