'use client';  // Diretiva para garantir que é um componente do lado do cliente

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';  // Biblioteca para o calendário
import 'react-calendar/dist/Calendar.css';  // Estilos do calendário

interface CalendarReservaProps {
  laboratorioId: string;  // ID do laboratório passado como prop
}

const CalendarReserva: React.FC<CalendarReservaProps> = ({ laboratorioId }) => {
  const [reservas, setReservas] = useState<any[]>([]);  // Lista de reservas para o laboratório
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());  // Data selecionada no calendário

  // Função para formatar a data no formato yyyy-mm-dd (para comparar com as reservas)
  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  // Função para formatar a hora no formato hh:mm
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);  // Exibe apenas a hora e o minuto
  };

  // Função para buscar as reservas para o dia selecionado
  const fetchReservas = async (date: Date) => {
    if (!laboratorioId) return;  // Se não houver id, não faz a requisição
    const formattedDate = formatDate(date);  // Formata a data selecionada

    try {
      const response = await fetch(`http://localhost:5000/api/laboratorio/${laboratorioId}/reservas?data=${formattedDate}`);
      const data = await response.json();

      if (response.ok) {
        setReservas(data);  // Atualiza o estado com as reservas
      } else {
        console.error('Erro ao carregar as reservas');
      }
    } catch (error) {
      console.error('Erro ao conectar com o servidor');
    }
  };

  useEffect(() => {
    fetchReservas(selectedDate);  // Chama a função para buscar as reservas ao carregar o componente
  }, [selectedDate, laboratorioId]);  // Sempre que a data ou o id do laboratório mudar, a função é chamada

  // Função chamada quando o usuário seleciona uma data no calendário
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);  // Atualiza a data selecionada
  };

  return (
    <div className='bg-white min-h-screen w-full flex flex-col items-center mt-5 px-4 gap-4'>
      {/* Calendário interativo */}
      <Calendar
        className={'text-black w-full'}
        onChange={handleDateChange}
        value={selectedDate}
      />

      {/* Exibe as reservas para a data selecionada */}
        <div className="text-black flex flex-col w-full">
          <h2>Reservas para {selectedDate.toLocaleDateString()}</h2>
          <ul>
            {reservas.length === 0 ? (
              <li>Não há reservas para este dia.</li>
            ) : (
              reservas.map((reserva) => (
                <li key={reserva.id}>
                  <strong>{formatTime(new Date(reserva.data_inicio))}</strong> - {reserva.professor_responsavel}
                </li>
              ))
            )}
          </ul>
        </div>
    </div>

    
  );
};

export default CalendarReserva;
