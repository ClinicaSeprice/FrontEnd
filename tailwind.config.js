/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    "./src/**/*.{html,ts}", // Añade esta línea para buscar clases de Tailwind en los archivos de Angular
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin') // Añade el plugin de Flowbite
  ],
}

