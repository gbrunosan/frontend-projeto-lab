'use client';  // Diretiva para marcar como um componente do lado do cliente

import React, { useState } from 'react';
import { fetchComToken } from '@/utils/fetchComToken';
import Toast from '@/app/components/Toast'; // Importando o componente Toast

function CriarLaboratorio() {
  const [nome, setNome] = useState('');
  const [local, setLocal] = useState('');
  const [toast, setToast] = useState<any>(null); // Estado para armazenar a mensagem do Toast

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();  // Previne o comportamento padrão de envio de formulário
    
    const data = {
      nome: nome,
      local: local,
    };

    try {
      await fetchComToken('add_laboratorio', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      setToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Laboratório criado com sucesso!',
      });

      setNome('');
      setLocal('');
    } catch (error: any) {
      setToast({
        type: 'error',
        title: 'Erro',
        description: error.message || 'Erro ao criar laboratório.',
      });
    }
  };

  return (
    <div className='bg-white rounded-lg flex flex-col p-6'>
      <span className='text-[22px] font-bold text-primary'>Criar Novo Laboratório</span>
      
      {/* Exibindo o Toast se houver */}
      {toast && (
        <Toast
          type={toast.type}
          title={toast.title}
          description={toast.description}
          onClose={() => setToast(null)} // Fecha o toast quando o botão de fechar é clicado
        />
      )}

      <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4 mt-4'>
        <div className='flex flex-col gap-1'>
          <label htmlFor="nome" className='text-textSecondary'>Nome do Laboratório</label>
          <input
            className='border border-secondary rounded-lg p-2'
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="local" className='text-textSecondary'>Localização</label>
          <input
            className='border border-secondary rounded-lg p-2'
            type="text"
            id="local"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className='bg-primary hover:bg-green-700 duration-100 px-3 h-11 rounded-md shadow-md font-semibold text-white'
        >
          Criar Laboratório
        </button>
      </form>
    </div>
  );
}

export default CriarLaboratorio;
