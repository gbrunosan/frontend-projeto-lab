'use client';  // Diretiva para garantir que é um componente do lado do cliente

import React from 'react';
import FormReserva from '@/app/components/FormReserva';

import { ArrowLeft } from '@icon-park/react';

const ReservaPage = () => {
  return (
    <div className='bg-white min-h-screen w-full'>
      <div className='text-black font-bold text-xl flex gap-2.5 items-center p-4 mb-2'>
        <ArrowLeft></ArrowLeft>
        <h1>Agendar reserva</h1>
      </div>

      <FormReserva />
    </div>
  );
};

export default ReservaPage;
