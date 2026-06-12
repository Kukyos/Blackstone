import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Blackstone brand palette — anchored to the logo
        bs: {
          black: '#0A0908',      // deep, slightly warm black
          ink:   '#121110',      // surface 1
          shaft: '#1C1A18',      // surface 2
          gold:  '#D4AF6A',      // primary gold from logo wordmark
          ember: '#B8923F',      // darker gold for shadows/hover
          champagne: '#E6CFA0',  // soft highlight gold
          bone:  '#F2EBDD',      // off-white for body
          mist:  '#8A847C',      // muted text
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        'widest-plus': '0.3em',
      },
      backgroundImage: {
        'gold-sheen':
          'linear-gradient(135deg, #B8923F 0%, #E6CFA0 35%, #D4AF6A 50%, #B8923F 70%, #E6CFA0 100%)',
        'shaft-grain':
          'radial-gradient(ellipse at top, rgba(212,175,106,0.08) 0%, transparent 60%)',
      },
      animation: {
        'shimmer': 'shimmer 3s linear infinite',
        'draw': 'draw 1.8s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        draw: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
