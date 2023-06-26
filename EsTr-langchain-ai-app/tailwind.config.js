/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  purge: {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    options: {
          safelist: [
                /data-theme$/,
              ]
          },
        },
  plugins: [
     require('daisyui'),
     require('@tailwindcss/typography'),
   ],
}

