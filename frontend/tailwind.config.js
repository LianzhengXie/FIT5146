/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    safelist: [
        'active',
    ],
    theme: {
        extend: {
            colors: {
                food: '#FFC107',
                exercise: '#17A2B8',
                stress: '#DC3545',
                sleep: '#28A745',
                addiction: '#6610f2',
                relationship: '#6f42c1',
            },
        },
    },
    plugins: [],
}