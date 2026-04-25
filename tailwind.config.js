/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Defined with <alpha-value> so opacity modifiers (bg-accent/30 etc.) work
        cream:       'rgb(250 247 242 / <alpha-value>)',
        blush:       'rgb(245 230 224 / <alpha-value>)',
        lavender:    'rgb(232 228 240 / <alpha-value>)',
        sage:        'rgb(222 234 228 / <alpha-value>)',
        'avio-text': 'rgb(45 41 38 / <alpha-value>)',
        muted:       'rgb(138 129 122 / <alpha-value>)',
        accent:      'rgb(201 169 154 / <alpha-value>)',
      },
      fontFamily: {
        sans:  ['var(--font-dm-sans)', 'sans-serif'],
        serif: ['var(--font-dm-serif)', 'serif'],
      },
    },
  },
  plugins: [],
};
