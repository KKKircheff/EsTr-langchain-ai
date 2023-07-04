/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
        fontFamily: {
            'poppins': ['Poppins', 'sans-serif']
          },
    },
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
    require('@tailwindcss/typography')],
};
