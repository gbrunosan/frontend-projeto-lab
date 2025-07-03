// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',  // Agora vai pegar todos os arquivos dentro da pasta 'app' e subpastas
    './app/components/**/*.{js,ts,jsx,tsx}', // Certifique-se de incluir sua pasta de componentes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
