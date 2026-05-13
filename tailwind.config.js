/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backgroundPrimary: '#050816',
        backgroundSecondary: '#0B1120',
        electricBlue: '#00F5FF',
        neonPurple: '#8B5CF6',
        accentCyan: '#22D3EE',
        textPrimary: '#E2E8F0',
        textSecondary: '#94A3B8',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: .5 },
        }
      }
    },
  },
  plugins: [],
}
