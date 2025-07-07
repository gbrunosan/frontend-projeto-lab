'use client';

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CardReserva from './CardReserva';

interface CalendarReservaProps {
  laboratorioId: string;
}

const CalendarReserva: React.FC<CalendarReservaProps> = ({ laboratorioId }) => {
  const [reservas, setReservas] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dadosLaboratorio, setDadosLaboratorio] = useState<{ nome: string; local: string } | null>(null);
  const [loadingReservas, setLoadingReservas] = useState(false);

  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = `${date.getMonth() + 1}`.padStart(2, '0');
    const d = `${date.getDate()}`.padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const fetchReservas = async (date: Date) => {
    if (!laboratorioId) return;

    const formattedDate = formatDate(date);
    setLoadingReservas(true);

    try {
      const response = await fetch(`http://localhost:5000/api/laboratorio/${laboratorioId}/reservas?data=${formattedDate}`);
      const data = await response.json();

      if (response.ok) {
        setDadosLaboratorio(data.laboratorio);
        setReservas(data.reservas);
      } else {
        console.error('Erro ao carregar reservas');
        setReservas([]);
      }
    } catch (error) {
      console.error('Erro ao conectar com o servidor');
      setReservas([]);
    } finally {
      setLoadingReservas(false);
    }
  };

  useEffect(() => {
    fetchReservas(selectedDate);
  }, [selectedDate, laboratorioId]);

  const handleDateChange = (date: Date) => {
    // Só atualiza se a data for diferente da já selecionada (comparando só o dia, mês e ano)
    const isSameDay =
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear();

    if (!isSameDay) {
      setSelectedDate(date);
    }
  };


  return (
    <div className='w-full flex flex-col items-center text-neutral-800 mt-2 px-1'>
      {!dadosLaboratorio ? (
        <div className="flex items-center justify-center w-full">
          <p className="text-gray-500">Carregando dados do laboratório...</p>
        </div>
      ) : (
        <>
          <div className='w-full flex flex-col mb-4 mt-1'>
            <span className='font-bold text-xl leading-5'>
              Reservas do {dadosLaboratorio.nome} 
            </span>
            <span className='text-neutral-500 font-semibold'>{dadosLaboratorio.local}</span>
          </div>
          <Calendar
            className='text-neutral-800 custom-calendar'
            onChange={handleDateChange}
            value={selectedDate}
          />

          <div className='gap-2.5 w-full mt-4 flex flex-col'>
            <h2 className='font-bold'>
              Reservas para {selectedDate.toLocaleDateString('pt-BR')}
            </h2>

            <div className='text-neutral-800 flex flex-col w-full px-2'>
              {loadingReservas ? (
                <p className='text-sm text-gray-500'>Carregando reservas...</p>
              ) : reservas.length === 0 ? (
                <p className='text-sm'>Não há reservas para este dia.</p>
              ) : (
                reservas.map((reserva) => (
                  <CardReserva key={reserva.id} reserva={reserva} />
                ))
              )}
            </div>
          </div>

        </>
      )}
    </div>
  );
};

export default CalendarReserva;
