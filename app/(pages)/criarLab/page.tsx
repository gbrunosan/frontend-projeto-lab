'use client';

import CriarLaboratorio from "@/app/components/CriarLaboratorio";
import CardLaboratorio from "@/app/components/CardLaboratorio";
import { Left } from '@icon-park/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { fetchComToken } from "@/utils/fetchComToken";

export default function CriarLabPage() {
  const router = useRouter();
  const [laboratorios, setLaboratorios] = useState<any[]>([]);

  const handleGoBack = () => {
    router.back();
  };

  const fetchLaboratorios = async () => {
    try {
      const data = await fetchComToken('laboratorios');
      setLaboratorios(data);
    } catch (error) {
      console.error('Erro ao carregar laboratórios:', error);
    }
  };

  useEffect(() => {
    fetchLaboratorios();
  }, []);

  const refreshLaboratorios = () => {
    fetchLaboratorios();
  };

  return (
    <div className='w-full md:mt-3'>
      <div onClick={handleGoBack} className='w-fit pl-0 p-1 text-neutral-800 flex gap-1.5 items-center cursor-pointer font-semibold mb-2'>
        <div>
          <Left theme="outline" size="24" fill="#333"/>
        </div>
        <span> Voltar </span>
      </div>

      <CriarLaboratorio onRefresh={refreshLaboratorios} />

      <div className="mt-6 md:bg-white md:p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-textPrimary">Lista de Laboratórios</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 px-4">
          {laboratorios.map((laboratorio) => (
            <CardLaboratorio
              key={laboratorio.id}
              id={laboratorio.id}
              nome={laboratorio.nome}
              local={laboratorio.local}
              onRefresh={refreshLaboratorios}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
