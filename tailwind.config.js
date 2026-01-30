/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cosmic Palette
        'cosmic-dark': '#0f0c29',    // Deepest background
        'cosmic-purple': '#302b63',  // Mid-tone gradient
        'cosmic-blue': '#24243e',    // Light gradient
        'neon-cyan': '#00f2ff',      // Glowing accents
        'neon-purple': '#bc13fe',    // Secondary accent
        'glass-white': 'rgba(255, 255, 255, 0.1)', // For glassmorphism
        'glass-border': 'rgba(255, 255, 255, 0.2)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'], // For headings (Tarot style)
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      }
    },
  },
  plugins: [],
}
