/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        manorama: {
          red: '#D9232D',
          darkred: '#B71C1C',
          lightred: '#FEE2E2',
          navy: '#0F1E36',
          deepblue: '#0A1128',
          blue: '#19396D',
          sky: '#0055A5',
          gold: '#C59B27',
          gray: '#F8F9FA',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'Cambria', 'serif'],
        malayalam: ['"Anek Malayalam"', '"Noto Serif Malayalam"', 'sans-serif'],
        hindi: ['"Anek Devanagari"', 'sans-serif'],
        tamil: ['"Anek Tamil"', 'sans-serif'],
        telugu: ['"Anek Telugu"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
