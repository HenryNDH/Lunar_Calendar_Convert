// tailwind.config.js
import daisyui from 'daisyui' // Add this line

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        daisyui, // Use daisyui directly here
    ],
}