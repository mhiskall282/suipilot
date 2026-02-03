/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sui Brand Colors
        sui: {
          blue: '#4DA2FF',
          dark: '#0A1929',
          light: '#F0F7FF',
          accent: '#6FBCFF',
        },
        // DeepBook Colors (blue-teal gradient theme)
        deepbook: {
          primary: '#0891B2', // cyan-600
          secondary: '#0E7490', // cyan-700
          accent: '#06B6D4', // cyan-500
          dark: '#164E63', // cyan-900
          light: '#CFFAFE', // cyan-100
        },
        // Privacy theme (indigo/purple)
        privacy: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          900: '#312E81',
        },
        // Safety theme (emerald green)
        safety: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
        // Warning/Alert
        warning: {
          50: '#FEF3C7',
          500: '#F59E0B',
          600: '#D97706',
        },
        danger: {
          50: '#FEE2E2',
          500: '#EF4444',
          600: '#DC2626',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-in',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}