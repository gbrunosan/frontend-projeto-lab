'use client';  // Diretiva para marcar como um componente do lado do cliente

import React, { useState } from 'react';
import { fetchComToken } from '@/utils/fetchComToken';

function CriarLaboratorio() {
  const [nome, setNome] = useState('');
  const [local, setLocal] = useState('');
  const [message, setMessage] = useState('');

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();  // Previne o comportamento padrão de envio de formulário
    
    const data = {
      nome: nome,
      local: local,
    };

    try {
      await fetchComToken('http://localhost:5000/api/add_laboratorio', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      setMessage('Laboratório criado com sucesso!');
      setNome('');
      setLocal('');
    } catch (error: any) {
      setMessage(error.message || 'Erro ao criar laboratório.');
    }

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome do Laboratório:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="local">Localização:</label>
          <input
            type="text"
            id="local"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            required
          />
        </div>
        <button type="submit">Criar Laboratório</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CriarLaboratorio;
