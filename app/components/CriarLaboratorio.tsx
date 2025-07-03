'use client';  // Diretiva para marcar como um componente do lado do cliente

import React, { useState } from 'react';

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
      // Envia a requisição para a API Flask
      const response = await fetch('http://localhost:5000/api/add_laboratorio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Laboratório criado com sucesso!');
      } else {
        setMessage(`Erro: ${result.message}`);
      }
    } catch (error) {
      setMessage('Erro ao conectar com o servidor.');
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
