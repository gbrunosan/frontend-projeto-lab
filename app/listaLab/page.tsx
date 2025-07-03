import React from 'react';
import ListaLaboratorios from '@/app/components/ListaLaboratorio';

const ListaLabPage = () => {
  return (
    <div className='bg-white min-w-screen min-h-screen flex flex-col gap-5 pb-4'>
      {/* <h1 className="text-3xl font-bold mb-4">Lista de Laboratórios</h1> */}

      <div className='w-full flex justify-between px-2 h-12 items-center text-black text-lg font-bold'>
        <span>Logo if</span>
        <span>Foto perfil</span>
      </div>
      <ListaLaboratorios />
    </div>
  );
};

export default ListaLabPage;
