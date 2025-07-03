'use client';  // Diretiva para garantir que é um componente do lado do cliente

import React from 'react';
import { useParams } from 'next/navigation';  // Para capturar o id da URL
import CalendarReserva from '@/app/components/CalendarReserva';  // Importando o componente CalendarReserva
import { ArrowLeft } from '@icon-park/react';

const CalendarioLaboratorio = () => {
  const { id } = useParams();  // Captura o parâmetro id da URL

  if (!id) {
    return <p>Carregando...</p>;  // Exibe uma mensagem enquanto o ID não é carregado
  }

  return (
    <div className='bg-white'>
      <div className='flex items-center text-black gap-2.5 bg-white py-4 px-2'>
        <div className='p-1 cursor-pointer'>
            <ArrowLeft theme="outline" size="24" fill="#333"/>
        </div>
        <span className='text-lg font-semibold'>Nome do lab</span>
      </div>
      {/* Passando o id para o componente CalendarReserva */}
      <CalendarReserva laboratorioId={id} /> 
    </div>
  );
};

export default CalendarioLaboratorio;
