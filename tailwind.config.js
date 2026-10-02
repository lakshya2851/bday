/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: "var(--color-blush, #FFD1DC)",
        "soft-pink": "var(--color-soft-pink, #FFB6C1)",
        rose: "var(--color-rose, #E899A5)",
        cream: "var(--color-cream, #FFF9F3)",
        "cream-card": "var(--color-cream-card, #FFFDF9)",
        lavender: "var(--color-lavender, #E8E3F5)",
        burgundy: "var(--color-burgundy, #4A0E17)",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        handwriting: ['"Caveat"', '"Homemade Apple"', 'cursive'],
        sans: ['"Inter"', '"DM Sans"', 'sans-serif'],
      },
      boxShadow: {
        'romantic': '0 10px 30px -10px rgba(232, 153, 165, 0.25)',
        'soft-glow': '0 0 25px rgba(255, 182, 193, 0.4)',
        'envelope': '0 15px 35px -5px rgba(74, 14, 23, 0.15), 0 5px 15px -3px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
