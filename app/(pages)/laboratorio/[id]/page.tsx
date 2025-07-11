'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import CalendarReserva from '@/app/components/CalendarReserva';
import { useLaboratorioStore } from '@/app/store/useLaboratorioStore'
import { Left } from "@icon-park/react";

const CalendarioLaboratorio = () => {
  const router = useRouter();
  const laboratorio = useLaboratorioStore(state => state.laboratorio);

  const handleGoBack = () => {
    router.back();
  };

  const { id } = useParams();

  const laboratorioId = Array.isArray(id) ? id[0] : id;

  if (!laboratorioId) {
    return <p>Carregando...</p>;
  }

  return (
    <div className='w-full md:bg-white md:pt-4 md:pb-20 md:px-5 md:rounded-b-lg'>
      <div onClick={handleGoBack} className='w-fit pl-0 p-1 text-neutral-800 flex gap-1.5 items-center cursor-pointer font-semibold'>
        <div>
            <Left theme="outline" size="24" fill="#333"/>
        </div>
        <span> Voltar </span>
      </div>
      <CalendarReserva laboratorioId={laboratorioId}/> 
    </div>
  );
};

export default CalendarioLaboratorio;
