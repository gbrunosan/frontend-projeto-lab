import '@/styles/globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'BookLab',
  description: 'Reservas de laboratórios',
  icons: {
    icon: './favicon.ico',
  },
}
interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
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
