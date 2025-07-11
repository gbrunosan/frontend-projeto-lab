// app/layout.tsx
import '@/styles/globals.css'
import Header from '@/app/components/Header'
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
          <div className="bg-gradient-to-b from-tertiary to-[#f0eeeb] min-h-screen flex flex-col items-center">
            <Header />
            <main className="p-4 sm:p-4  h-full text-neutral-800 w-full max-w-[920px]">
              {children}
            </main>
          </div>
        )}
      </body>
    </html>
  )
}
