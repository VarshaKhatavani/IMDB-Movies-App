/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
            "./src/**/*.{js,jsx,ts,tsx}",
          ],
  theme: {
    extend: {
      backgroundImage: {
        'pattern': "url('https://assets-in.bmscdn.com/discovery-catalog/events/et00311714-ewdhvajezf-landscape.jpg')",    
      }
    },
  },
  plugins: [],
}

