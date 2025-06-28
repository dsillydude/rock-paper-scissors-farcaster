/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        monad: {
          50: '#f8f4ff',
          100: '#f0e6ff',
          200: '#e4d1ff',
          300: '#d1b0ff',
          400: '#b885ff',
          500: '#9d5aff',
          600: '#8b3dff',
          700: '#7c2dff',
          800: '#6b1fff',
          900: '#5a0fff',
          950: '#3d0099',
        },
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
      },
      backgroundImage: {
        'monad-gradient': 'linear-gradient(135deg, #9d5aff 0%, #7c2dff 50%, #5a0fff 100%)',
        'monad-gradient-light': 'linear-gradient(135deg, #e4d1ff 0%, #d1b0ff 50%, #b885ff 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(157, 90, 255, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(157, 90, 255, 0.8), 0 0 30px rgba(157, 90, 255, 0.6)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
