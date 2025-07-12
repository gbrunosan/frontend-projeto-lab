import '@/styles/globals.css'
import Header from '@/app/components/Header'
import { ReactNode } from 'react'

export const metadata = {
  title: 'BookLab',
  description: 'Reservas de laboratórios',
  icons: {
    icon: './favicon.ico',
  },
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="pt-br">
      <body>
        <div className="bg-gradient-to-b from-tertiary to-[#f0eeeb] min-h-screen flex flex-col items-center">
          <Header />
          <main className="p-4 md:pb-8 md:px-4 md:pt-0 h-full text-neutral-800 w-full max-w-[920px]">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
