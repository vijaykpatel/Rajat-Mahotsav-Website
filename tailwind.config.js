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
    },
  },
  plugins: [],
}