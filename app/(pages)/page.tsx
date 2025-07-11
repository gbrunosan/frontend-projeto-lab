import React from 'react';
import ListaLaboratorios from '@/app/components/ListaLaboratorio';

const Home = () => {
  return (
    <div className='w-full md:bg-white md:pt-4 pb-20 md:px-5 md:rounded-b-lg'>
      <ListaLaboratorios />
    </div>
  );
};

export default Home;
