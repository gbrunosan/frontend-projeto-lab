// app/layout.tsx
import './globals.css' // se tiver estilos globais
import Header from './components/Header'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Minha App',
  description: 'Descrição da aplicação',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="">
        <div className="bg-white min-h-screen flex flex-col items-center">
          <Header />
          <main className="p-2.5 sm:p-4 bg-white h-full text-neutral-800 w-full max-w-[1000px]">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
