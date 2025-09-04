module.exports = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        fg: "#ffffff",
        bg: "#143464",
        muted: "#d6e0ff",           // para textos secundarios sobre fondo oscuro
        line: "rgba(255,255,255,0.20)",
        primary: {
          DEFAULT: "#183464",        // superficies (cards/nav)
          dark: "#10264f",
          light: "#30508c",
        },
      },
      fontFamily: {
        serif: ['"Times New Roman"', 'Times', 'serif'],
      },
      borderRadius: {
        '2xl': '1.25rem',
      },
      boxShadow: {
        soft: '0 10px 20px rgba(0,0,0,.08)'
      }
    },
  },
  plugins: [],
};