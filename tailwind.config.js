/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': {
          50: '#EBF5FF',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        'purple': {
          50: '#F5F3FF',
          500: '#8B5CF6',
          600: '#7C3AED',
        },
      }
    }
  },
  plugins: [],
}