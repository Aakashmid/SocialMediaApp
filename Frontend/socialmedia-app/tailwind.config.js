/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],


  theme: {
    extend: {
      colors: {
        bgPrimary: '#1877f2',
        bg1:'#27272a',
      }
    },
  },
  plugins: [],
}

