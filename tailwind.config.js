// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Verifique os caminhos para garantir que a pasta 'app' está correta
    './app/components/**/*.{js,ts,jsx,tsx}', // Certifique-se de que os componentes estão sendo analisados
  ],
  theme: {
    extend: {
      colors: {
        primary: "#629146",
        secondary: "#c49b9c",
        tertiary: "#e3e1dc",
        textbase: "#262626",
        textPrimary: "#314a36",
        textSecondary: "#584f4f",
      },
    },
  },
  plugins: [],
};
