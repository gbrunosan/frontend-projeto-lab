// app/components/Header.tsx
'use client'
import { PersonalPrivacy } from '@icon-park/react';
import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full p-2 px-3.5 bg-[#1d2520] shadow-md">
      <div className='w-full flex justify-between px-2 h-14 items-center text-white text-lg font-bold'>
        <div>
          <img src="./static/if_logo_simples.svg" alt="" className="h-12" />
        </div>
        

        <div className='border rounded-full p-2 cursor-pointer'>
          <PersonalPrivacy theme="outline" size="26"/>
        </div>
        
      </div>
    </header>
  )
}
