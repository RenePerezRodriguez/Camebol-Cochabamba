
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        body: ['var(--font-pt-sans)', 'sans-serif'],
        headline: ['var(--font-pt-serif)', 'serif'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        brand: {
          pink: '#D61F69', // Refined: More vibrant/modern (was #c41661)
          purple: '#8B1568', // Refined: Cleaner purple (was #770157)
          indigo: '#5B0F75', // Refined: Richer indigo (was #450072)
          brown: '#3F1208', // Refined: Warmer brown (was #210a03)
          green: '#15803D', // Refined: Standard accessible green (was #1f6b37)
          'gold-light': '#FFD60A', // Refined: Brighter gold (was #FDC400)
          'cream': '#FDFBF7', // New: Cream white for backgrounds
        },
        backgroundImage: {
          'brand-gradient': 'linear-gradient(135deg, #770157 0%, #FB7185 100%)', // Sunset Business: Purple -> Rose/Orange
          'brand-gradient-dark': 'linear-gradient(to right, #5B0F75, #8B1568)',
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-from-left': {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-from-right': {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'draw-line-y': {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '100%': { transform: 'scaleY(1)', transformOrigin: 'top' },
        },
        'draw-line-x': {
          '0%': { transform: 'scaleX(0)', transformOrigin: 'left' },
          '100%': { transform: 'scaleX(1)', transformOrigin: 'left' },
        },
        'draw-line-x-center': {
          '0%': { transform: 'scaleX(0)', transformOrigin: 'center' },
          '100%': { transform: 'scaleX(1)', transformOrigin: 'center' },
        },
        'bg-pan': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        'particles': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(20px, -30px)' },
          '50%': { transform: 'translate(-20px, 30px)' },
          '75%': { transform: 'translate(30px, 20px)' },
        },
        'marquee-infinite': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'pulse-highlight': {
          '0%': { boxShadow: '0 0 0 0 hsl(var(--primary) / 0.7)' },
          '70%': { boxShadow: '0 0 0 10px hsl(var(--primary) / 0)' },
          '100%': { boxShadow: '0 0 0 0 hsl(var(--primary) / 0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' }, // Reduced from -20px to -6px for subtle breathing
        },
        'border-rotate': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in-down': 'fade-in-down 0.8s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'slide-in-from-left': 'slide-in-from-left 0.7s ease-out forwards',
        'slide-in-from-right': 'slide-in-from-right 0.7s ease-out forwards',
        'draw-line-y': 'draw-line-y 0.5s ease-out forwards',
        'draw-line-x': 'draw-line-x 1s ease-out forwards',
        'draw-line-x-center': 'draw-line-x-center 0.6s ease-out forwards',
        'bg-pan': 'bg-pan 60s linear infinite', // Very slow
        'aurora': 'aurora 60s linear infinite', // Super slow
        'float': 'float 10s ease-in-out infinite', // Slow float
        'float-delayed': 'float 12s ease-in-out 5s infinite', // Slower
        'float-slow': 'float 15s ease-in-out infinite', // Very slow
        'float-medium': 'float 12s ease-in-out infinite', // Slow
        'float-fast': 'float 8s ease-in-out infinite', // Slowed down significantly
        'border-rotate': 'border-rotate 10s ease infinite',
        'marquee-infinite': 'marquee-infinite 12s linear infinite',
        'marquee-reverse': 'marquee-reverse 12s linear infinite',
      },
      textShadow: {
        md: '0px 2px 4px rgba(0, 0, 0, 0.25)',
      },
      boxShadow: {
        'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05);',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    plugin(function ({ addUtilities, theme }) {
      addUtilities({
        '.shape-primary': {
          clipPath: 'polygon(0 0, 100% 0, 100% 60%, 70% 80%, 0 75%)',
        },
        '.shape-secondary': {
          clipPath: 'polygon(0 75%, 70% 80%, 30% 100%, 0 100%)',
        },
        '.shape-tertiary': {
          clipPath: 'polygon(100% 60%, 70% 80%, 100% 100%)',
        },
        '.text-shadow-md': {
          textShadow: theme('textShadow.md'),
        },
        '.bg-dots': {
          backgroundImage: 'radial-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px)',
          backgroundSize: '15px 15px',
        },
        '.bg-grain': {
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.05\'/%3E%3C/svg%3E")',
        },
      });
    }),
  ],
} satisfies Config;
