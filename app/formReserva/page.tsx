'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import FormReserva from '@/app/components/FormReserva';
import { Left } from '@icon-park/react';

const ReservaPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className='bg-white'>
      <div onClick={handleGoBack} className=' w-fit pl-0 p-1  text-neutral-800 flex gap-1.5 items-center cursor-pointer'>
        <div>
          <Left theme="outline" size="24" fill="#333"/>
        </div>
        <span>Voltar</span>
      </div>


      <FormReserva />
    </div>
  );
};

export default ReservaPage;
