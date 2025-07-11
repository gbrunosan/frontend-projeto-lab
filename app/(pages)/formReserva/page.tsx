'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FormReserva from '@/app/components/FormReserva';
import { Left } from '@icon-park/react';

const ReservaPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const handleGoBack = () => {
    router.back();
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const laboratorioId = params.get('laboratorioId');

    setTimeout(() => {
      if (laboratorioId) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    }, 1000);

  }, []);

  return (
    <div className='md:mt-3'>
      <div
        onClick={handleGoBack}
        className='w-fit pl-0 p-1 text-neutral-800 flex gap-1.5 items-center cursor-pointer font-semibold mb-1'
      >
        <div>
          <Left theme='outline' size='24' fill='#333' />
        </div>
        <span>Voltar</span>
      </div>

      {loading && (
        <div className='flex justify-center items-center mt-4'> 
          <p className='text-gray-500'>Carregando dados...</p>
        </div>
      )}

      <div hidden={loading} className={`w-full justify-center${!loading ? ' flex' : ''}`}>
        <FormReserva />
      </div>
    </div>
  );
};

export default ReservaPage;
