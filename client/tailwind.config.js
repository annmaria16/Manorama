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
          lightred: '#FFEBEE',
          navy: '#0F1E36',
          blue: '#19396D',
          accent: '#0055A5',
          gold: '#C59B27',
          gray: '#F8F9FA',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        malayalam: ['"Anek Malayalam"', '"Manjari"', '"Gayathri"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
