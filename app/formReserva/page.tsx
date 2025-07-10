'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FormReserva from '@/app/components/FormReserva';
import { Left } from '@icon-park/react';

const ReservaPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Adicionando o estado de loading

  const handleGoBack = () => {
    router.back();
  };

  useEffect(() => {
    // Aqui você pode definir a lógica de carregamento,
    // como checar se os dados já estão prontos.
    const params = new URLSearchParams(window.location.search);
    const laboratorioId = params.get('laboratorioId');

    // Simulando o delay do carregamento
    setTimeout(() => {
      if (laboratorioId) {
        setLoading(false); // Caso o laboratorioId esteja na URL, podemos exibir o formulário
      } else {
        setLoading(false); // Caso contrário, exibe também
      }
    }, 1000); // Simula o delay de 1 segundo

  }, []);

  return (
    <div>
      <div
        onClick={handleGoBack}
        className='w-fit pl-0 p-1 text-neutral-800 flex gap-1.5 items-center cursor-pointer font-semibold mb-1'
      >
        <div>
          <Left theme='outline' size='24' fill='#333' />
        </div>
        <span>Voltar</span>
      </div>

      {/* Se estiver carregando, mostra o loading */}
      {loading && (
        <div className='flex justify-center items-center mt-4'>
          <p className='text-gray-500'>Carregando dados...</p>
        </div>
      )}

      {/* Aqui usamos o 'hidden' para esconder o FormReserva enquanto está carregando */}
      <div hidden={loading}>
        <FormReserva />
      </div>
    </div>
  );
};

export default ReservaPage;
