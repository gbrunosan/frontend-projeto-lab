// app/components/Header.tsx
'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full p-2 bg-gray-100 ">
      <div className='w-full flex justify-between px-2 h-12 items-center text-black text-lg font-bold'>
        <span>Logo if</span>
        <span>Foto perfil</span>
      </div>
    </header>
  )
}
