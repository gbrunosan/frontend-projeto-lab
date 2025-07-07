'use client';  // Diretiva para garantir que é um componente do lado do cliente

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar } from '@icon-park/react';
import { useLaboratorioStore } from '@/app/store/useLaboratorioStore'
import { useRouter } from 'next/navigation'

const ListarLaboratorios = () => {
  const [laboratorios, setLaboratorios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter()

  const handleClick = (laboratorio) => {
    useLaboratorioStore.getState().setLaboratorio(laboratorio)
    router.push(`/laboratorio/${laboratorio.id}`)
  }
  // Buscar os laboratórios disponíveis
  const fetchLaboratorios = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/laboratorios');
      const data = await response.json();
      if (response.ok) {
        setLaboratorios(data);  // Atualiza o estado com os laboratórios
      } else {
        setError('Erro ao carregar os laboratórios');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaboratorios();  // Chama a função para buscar os laboratórios assim que o componente é montado
  }, []);

  if (loading) return <p className='text-neutral-800'>Carregando...</p>;

  return (
    <div className='w-full px-1'>
      <div className='flex flex-col gap-3.5 pb-20 h-full'>
        <div>
          <span className='font-bold text-xl'>Lista de laboratórios</span>
        </div>
        <div className='flex flex-col gap-3.5 px-2'>
          {laboratorios.map((laboratorio) => (
            <div key={laboratorio.id} className=' bg-[#dfe1e4] min-h-[80px] rounded-lg p-4 flex items-center justify-between'>

              <div className='flex flex-col text-neutral-800'>
                <span className='text-lg font-semibold'>{laboratorio.nome}</span>
                <span className=''>{laboratorio.local}</span>
              </div>

              <div>
                <button onClick={() => handleClick(laboratorio)} className="text-white p-4 cursor-pointer">
                  <Calendar theme="outline" size="24" fill="#333" />
                </button>
              </div>

            </div>
          ))}
        </div>      

      </div>

    <Link href="/formReserva">
        <button className="mt-4 bg-green-500 hover:bg-green-600 text-white fixed bottom-8 right-4 w-[65px] h-[65px] rounded-full flex justify-center cursor-pointer">
          <span className='text-[40px] font-semibold'>+</span>
        </button>
    </Link>
    </div>
  );
};

export default ListarLaboratorios;
