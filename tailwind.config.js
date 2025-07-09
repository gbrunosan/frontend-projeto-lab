// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Verifique os caminhos para garantir que a pasta 'app' está correta
    './app/components/**/*.{js,ts,jsx,tsx}', // Certifique-se de que os componentes estão sendo analisados
  ],
  theme: {
    extend: {
      colors: {
        primary: "#386641",
        secondary: "#c49b9c",
        tertiary: "#e9e3d5",
        textbase: "#262626",
        textPrimary: "#6A994E",
        textSecondary: "#584f4f",
      },
    },
  },
  plugins: [],
};
