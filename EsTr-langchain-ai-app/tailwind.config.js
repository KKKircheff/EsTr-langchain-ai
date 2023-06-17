/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        fontSize: {
            sm: '0.6rem',
        },
        extend: {
            animation: {
                logoIn: 'logoIn 1s ease-in-out'
            },
            keyframes: {
                logoIn: {
                    '0%': { transform: 'scale(0.1)'},
                    '100%': { transform:'scale(1)'},
                }
            },
        },
    },
    plugins: [
        require('daisyui'),
        // require('@tailwindcss/typography'),
    ],
    purge: {
        content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
        options: {
            safelist: [/data-theme$/],
        },
    },
};
