/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'prim': '#ff006e',
        'sec': '#ffbe0b',
        'tern': '#fb5607',
        'quad': '#8338ec',
        'pent': '#3a86ff',
      },
    },
    animation: {
      blob: "blob 7s infinite"
    },
    keyframes:{
      blob : {
        "0%": {
          transform: "translate(0px, 0px) scale(1)"
        },
        "33%": {
          transform: "translate(30px , -50px) scale(1.2)"
        },
        "66%": {
          transform: "translate(-20px , 20px) scale(0.8)"
        },
        "100%": {
          transform: "translate(0px , 0px) scale(1)"
        }
      }
    }
  },
  plugins: [],
}
