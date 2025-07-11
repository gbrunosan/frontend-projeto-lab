'use client';  // Diretiva para garantir que é um componente do lado do cliente

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Right, Computer, Plus } from '@icon-park/react';
import { useLaboratorioStore } from '@/app/store/useLaboratorioStore';
import { useUsuarioStore } from '@/app/store/useUsuarioStore'; // Importando a store do usuário
import { fetchComToken } from '@/utils/fetchComToken';
import ModalActions from './ModalActions';  // Importando o componente ModalActions

const ListarLaboratorios = () => {
  const [laboratorios, setLaboratorios] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Controlar a visibilidade do modal
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Pegando os dados do usuário da store
  const usuario = useUsuarioStore(state => state.usuario);

  const handleNovoLaboratorio = () => {
    router.push('/criarLab');
  };

  const handleNovaReserva = () => {
    router.push('/formReserva');
  };

  const handleClick = (laboratorio) => {
    useLaboratorioStore.getState().setLaboratorio(laboratorio);
    router.push(`/laboratorio/${laboratorio.id}`);
  };

  // Buscar os laboratórios disponíveis
  const fetchLaboratorios = async () => {
    try {
      const data = await fetchComToken('laboratorios');  // Passando só o endpoint
      setLaboratorios(data);
    } catch (err: any) {
      setError(err.message || 'Erro inesperado');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaboratorios();  // Chama a função para buscar os laboratórios assim que o componente é montado
  }, []);

  if (loading) return <p className='text-neutral-800'>Carregando...</p>;

  // Função para mostrar o modal ou direcionar diretamente para nova reserva
  const handleButtonClick = () => {
    if (usuario && usuario.tipo === 'admin') {
      setIsModalOpen(true);  // Abre o modal se o usuário for admin
    } else {
      handleNovaReserva(); // Redireciona diretamente para a página de nova reserva se o usuário não for admin
    }
  };

  return (
    <div className='w-full px-1 relative'>
      <div className='flex flex-col gap-5 pb-20 h-full'>
      <div className='flex items-start gap-2 text-textPrimary'>
        <Computer theme="outline" size="28" fill="#333"/> 
        <span className='font-bold text-2xl'>Lista de laboratórios</span>
      </div>
      <div className='flex flex-col gap-3.5 px-3'>
        {loading ? (
          <p className='text-neutral-800'>Carregando...</p>
          ) : laboratorios.length === 0 ? (
            <p className='text-neutral-800'>Nenhum laboratório encontrado.</p>
          ) : (
            laboratorios.map((laboratorio) => (
              <div onClick={() => handleClick(laboratorio)} key={laboratorio.id} className='bg-gradient-to-r from-white to-gray-100 shadow-md min-h-[90px] rounded-lg p-4 flex items-center justify-between cursor-pointer hover:border border-secondary hover:shadow-lg transition-all'>
                <div className='flex flex-col text-neutral-800'>
                  <span className='text-[19px] font-semibold text-textPrimary first-letter:capitalize'>{laboratorio.nome}</span>
                  <span className='text-gray-600 text-[17px]'>{laboratorio.local}</span>
                </div>

                <div className='flex items-center gap-1.5 text-neutral-600'>
                  <button className="cursor-pointer">
                    <Calendar theme="outline" size="24" />
                  </button>
                  <button className="cursor-pointer">
                    <Right theme="outline" size="24" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Botão Flutuante de Mais (Para Admins) */}
      {usuario && usuario.tipo === 'admin' && (
        <button
          onClick={handleButtonClick} // Função que lida com o tipo de usuário
          className="mt-4 bg-green-500 hover:bg-green-600 text-white fixed bottom-8 right-4 lg:!right-[15%] 2xl:!right-[20%] w-[65px] lg:w-[80px] h-[65px] lg:h-[80px] rounded-full flex justify-center items-center cursor-pointer shadow"
        >
          <Plus theme="outline" size="42" fill="#fff" />
        </button>
      )}

      {/* Botão Normal para Professores (Não flutuante, abaixo da label) */}
      {usuario && usuario.tipo === 'professor' && (
        <button
          onClick={handleNovaReserva} // Redireciona diretamente para a nova reserva
          className="bg-primary hover:bg-green-700 text-white py-2.5 px-5 rounded-full text-[19px] font-semibold fixed bottom-5 right-4 flex items-center justify-center gap-1"
        >
          <Plus theme="outline" size="24" strokeWidth={6} fill="#fff" />
          <span className=''>Reserva</span>
        </button>
      )}

      {/* Modal de Ações */}
      {isModalOpen && (
        <ModalActions
          onClose={() => setIsModalOpen(false)}  // Fechar o modal
          onNovoLaboratorio={handleNovoLaboratorio}  // Redirecionar para a criação de laboratório
          onNovaReserva={handleNovaReserva}  // Redirecionar para a criação de reserva
        />
      )}
    </div>
  );
};

export default ListarLaboratorios;
