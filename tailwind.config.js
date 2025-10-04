/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'noto-music': ['var(--font-noto-music)', 'Noto Music', 'sans-serif'],
        'lato': ['var(--font-lato)', 'Lato', 'sans-serif'],
      },
      spacing: {
        'page-header': 'var(--page-header-spacing)',
        'page-title-desc': 'var(--page-title-description-spacing)',
        'page-bottom': 'var(--page-bottom-spacing)',
      },
      colors: {
        'schedule': {
          'primary': '#ea580c', // orange-600
          'secondary': '#dc2626', // red-600
          'light': '#f97316', // orange-500
          'light-secondary': '#ef4444', // red-500
        },
      },
    },
  },
  plugins: [],
}