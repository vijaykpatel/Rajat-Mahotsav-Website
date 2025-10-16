/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      spacing: {
        'page-header': 'var(--page-header-spacing)',
        'page-title-desc': 'var(--page-title-description-spacing)',
        'page-bottom': 'var(--page-bottom-spacing)',
      },
      backgroundImage: {
        'preset-gradient-very-light-gray-to-bluish-gray': 'linear-gradient(135deg, rgb(238, 238, 238) 0%, rgb(169, 184, 195) 100%)',
        'preset-gradient-topper': 'linear-gradient(0deg, #0D132D 24.28%, #0B1B33 100%)',
        'preset-gradient-blue-alt': 'linear-gradient(321deg, #141F4D 7.41%, #12347F 80.62%)',
      },
      colors: {
        'schedule': {
          'primary': '#ea580c', // orange-600
          'secondary': '#dc2626', // red-600
          'light': '#f97316', // orange-500
          'light-secondary': '#ef4444', // red-500
        },
        'preset-navy-accent': '#141F4D',
        'preset-deep-navy': '#0D132D',
        'preset-navy-blue': '#030A1B',
        'preset-zodiac-blue': '#0B1B33',
        'preset-light-gray': '#F3F3F3',
        'preset-stone': '#E8E6E0',
        'preset-pale-gray': '#D9DEE8',
        'preset-red': '#B50000',
        'preset-bluish-gray': '#abb8c3',
        'preset-white': '#FFFFFF',
        'preset-charcoal': '#293340',
      },
    },
  },
  plugins: [],
}