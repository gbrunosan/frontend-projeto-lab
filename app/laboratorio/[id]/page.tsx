'use client';  // Diretiva para garantir que é um componente do lado do cliente

import React from 'react';
import { useParams } from 'next/navigation';  // Para capturar o id da URL
import { useRouter } from 'next/navigation';
import CalendarReserva from '@/app/components/CalendarReserva';  // Importando o componente CalendarReserva
import { Left } from '@icon-park/react';
import { useLaboratorioStore } from '@/app/store/useLaboratorioStore'


const CalendarioLaboratorio = () => {
  const router = useRouter()
  const laboratorio = useLaboratorioStore(state => state.laboratorio)

  const handleGoBack = () => {
    router.back();
  };
  const { id } = useParams();  // Captura o parâmetro id da URL

  if (!id) {
    return <p>Carregando...</p>;  // Exibe uma mensagem enquanto o ID não é carregado
  }

  return (
    <div className='bg-white w-full'>
      <div  onClick={handleGoBack} className='flex items-center text-neutral-800 gap-1.5 bg-white cursor-pointer'>
        <div>
            <Left theme="outline" size="24" fill="#333"/>
        </div>
        <span> Voltar </span>
      </div>
      {/* Passando o id para o componente CalendarReserva */}
      <CalendarReserva laboratorioId={id} dadosLaboratorio={laboratorio}  /> 
      
    </div>
  );
};

export default CalendarioLaboratorio;
