/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{astro,html,js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#000000',
                surface: '#0A0A0A',
                surfaceHover: '#151515',
                olive: '#4A360D',
                accent: '#B2851B',
                textMuted: '#A3A3A3',
            },
            fontFamily: {
                sans: ['"Space Grotesk"', 'sans-serif'],
                drama: ['"DM Serif Display"', 'serif'],
                mono: ['"Space Mono"', 'monospace'],
            }
        },
    },
    plugins: [],
}
