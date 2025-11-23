/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
  "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}",
],
  theme: {
    extend: {
      colors: {
        text_nav: '#414141',
        bg_gray: '#f2f5f8',
        text_bg: '#404040',
        text_muted: '#eee',
        bg_muted: 'rgba(255,255,255,0.05)',
        bg_nav_res: 'rgba(0,0,0,0.5)',
        bg_dark1: '#242424',
        bg_dark2: '#000'
      },
    },
    screens: {
      'xs': '400px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },
    fontSize:{
      clamp:"clamp(0.7rem, 1vw, 0.9rem)",
      clamp_intro: "clamp(1.5rem, 2vw, 2rem)",
      clamp_des: "clamp(1rem, 1.2vw, 1.2rem)",
      clamp_super_des: "clamp(0.9rem, 1vw, 1.1rem)"
      },

  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}

