import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{vue,js,ts}', './components/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        brand: '#d84c4c',
      },
      keyframes: {
        'zoom-dezoom': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.08)' },
        },
      },
      animation: {
        'zoom-dezoom': 'zoom-dezoom 10s ease-in-out infinite',
      },
    },
  },
} satisfies Config
