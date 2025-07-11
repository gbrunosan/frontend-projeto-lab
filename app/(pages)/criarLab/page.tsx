'use client';

import CriarLaboratorio from "@/app/components/CriarLaboratorio"
import { Left } from '@icon-park/react';
import { useRouter } from 'next/navigation';

export default function CriarLabPage() {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  return (
    <div className='w-full'>
      <div  onClick={handleGoBack} className='w-fit pl-0 p-1 text-neutral-800 flex gap-1.5 items-center cursor-pointer font-semibold mb-2'>
        <div>
            <Left theme="outline" size="24" fill="#333"/>
        </div>
        <span> Voltar </span>
      </div>
      <CriarLaboratorio></CriarLaboratorio>

    </div>

  );
}
