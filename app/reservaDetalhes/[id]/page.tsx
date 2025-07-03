'use client';  // Diretiva para garantir que é um componente do lado do cliente

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const ReservaDetalhes = () => {
  const [reserva, setReserva] = useState<any>(null);  // Detalhes da reserva
  const router = useRouter();
  const { id } = router.query;  // ID da reserva na URL

  // Buscar os detalhes da reserva
  const fetchReserva = async () => {
    if (!id) return;
    try {
      const response = await fetch(`http://localhost:5000/api/reserva/${id}`);
      const data = await response.json();
      if (response.ok) {
        setReserva(data);  // Atualiza o estado com os detalhes da reserva
      } else {
        console.error('Erro ao carregar a reserva');
      }
    } catch (error) {
      console.error('Erro ao conectar com o servidor');
    }
  };

  useEffect(() => {
    fetchReserva();  // Busca os detalhes da reserva quando o componente for montado
  }, [id]);

  return (
    <div>
      {reserva ? (
        <div>
          <h1>Detalhes da Reserva</h1>
          <p><strong>Laboratório:</strong> {reserva.laboratorio.nome}</p>
          <p><strong>Data Início:</strong> {new Date(reserva.data_inicio).toLocaleString()}</p>
          <p><strong>Data Fim:</strong> {new Date(reserva.data_fim).toLocaleString()}</p>
          <p><strong>Professor Responsável:</strong> {reserva.professor_responsavel}</p>
          <p><strong>Número de Estudantes:</strong> {reserva.num_estudantes}</p>
          <p><strong>Anotações:</strong> {reserva.anotacoes}</p>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default ReservaDetalhes;
