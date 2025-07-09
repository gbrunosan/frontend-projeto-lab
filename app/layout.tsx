// app/layout.tsx
import '@/styles/globals.css'
import Header from './components/Header'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Minha Aplicação',
  description: 'Reserva de lab',
}

export default function RootLayout({
  children,
  auth,
}: {
  children: ReactNode
  auth: ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>
        {auth || (
          <div className="bg-white min-h-screen flex flex-col items-center">
            <Header />
            <main className="p-2.5 sm:p-4 bg-white h-full text-neutral-800 w-full max-w-[1000px]">
              {children}
            </main>
          </div>
        )}
      </body>
    </html>
  )
}
