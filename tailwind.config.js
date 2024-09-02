/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundColor: {
        button: '#1D9BF0',
        back: '#242D34'
      },
      fontSize: {
        xm: '15px'
      },
      borderWidth: {
        '1': '1px'
      },
      screens: {
        'xs': '480px',    // Custom screen size for extra small devices
        'sm': '640px',    // Small devices
        'md': '768px',    // Medium devices
        'xmd': '1151px',
        'lg': '1024px',   // Large devices
        'xl': '1280px',   // Extra large devices
        '2xl': '1536px',  // 2x Extra large devices
        '3xl': '1920px',  // Custom screen size for even larger screens
      },
      height:{
        '93%': '93vh',
        '7%': '7vh',
        '108': '432px'
      },
      margin: {
        '84': '340px'
      },
      width: {
        '100': '400px',
        '108': '432px'
      }
    }
  },
  plugins: []
};


