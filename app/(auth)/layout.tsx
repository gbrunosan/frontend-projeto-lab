import '@/styles/globals.css'

// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
