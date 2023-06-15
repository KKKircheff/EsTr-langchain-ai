/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   
    theme: {
        fontSize: {
            sm: '0.6rem',
        },
        extend: {},
    },
    plugins: [
        require('daisyui'),
        require('@tailwindcss/typography'),
        ],
    purge: {
        content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
        options: {
            safelist: [/data-theme$/],
        },
    },
};
