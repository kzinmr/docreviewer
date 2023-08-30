/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        dark: '#111111',
        light: '#FAFAFA'
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ['black', 'lofi'],
  }
}
