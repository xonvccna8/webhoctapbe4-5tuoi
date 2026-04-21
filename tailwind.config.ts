import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 20px 60px rgba(79, 70, 229, 0.16)',
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at top, rgba(255,255,255,0.35), transparent 38%), linear-gradient(135deg, #fbf7ff 0%, #f1f7ff 48%, #fff5ea 100%)',
      },
      colors: {
        brand: {
          50: '#f6f3ff',
          100: '#ece6ff',
          200: '#d8ccff',
          300: '#bca8ff',
          400: '#9b7df7',
          500: '#7c5cff',
          600: '#6342f0',
          700: '#5332cf',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;