/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        kusinaprimary: '#B65949',
        kusinaprimarylight: '#DD8272',
        kusinasecondary: '#DBC9A4',
        kusinaaccent: '#C5B96D',
        kusinablack: '#120907',
        kusinabg: '#FAF4F4'
      }
    },
    fontFamily: {
      'sans': ['Inter']
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        kusinatheme: {
          'primary': '#B65949',
          'secondary': '#DBC9A4',
          'accent': '#C5B96D',
        }
      }
    ]
  }
}

