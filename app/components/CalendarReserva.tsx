'use client';

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Plus } from '@icon-park/react';
import CardReserva from './CardReserva';
import { fetchComToken } from '@/utils/fetchComToken';
import { useRouter } from 'next/navigation';

interface CalendarReservaProps {
  laboratorioId: string;
}

const CalendarReserva: React.FC<CalendarReservaProps> = ({ laboratorioId }) => {
  const [reservas, setReservas] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dadosLaboratorio, setDadosLaboratorio] = useState<{ nome: string; local: string } | null>(null);
  const [loadingReservas, setLoadingReservas] = useState(false);
  const router = useRouter();

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
      const data = await fetchComToken(
        `laboratorio/${laboratorioId}/reservas?data=${formattedDate}`
      );

      setDadosLaboratorio(data.laboratorio);
      setReservas(data.reservas);
    } catch (error) {
      console.error('Erro ao carregar reservas:', error);
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

  const handleCreateReserva = () => {
    // Redireciona para a página de criação de reserva com o laboratorioId
    router.push(`/formReserva?laboratorioId=${laboratorioId}`);
  };

  return (
    <div className='w-full flex flex-col items-center text-neutral-800 mt-2 px-1'>
      {!dadosLaboratorio ? (
        <div className="flex items-center justify-center w-full">
          <p className="text-gray-500">Carregando dados do laboratório...</p>
        </div>
      ) : (
        <>
          <div className='flex justify-between gap-x-1.5 items-start w-full mt-1 my-2'>
            <div className='flex flex-col'>
              <span className='font-bold text-2xl leading-6 text-textPrimary'>
                Reservas do {dadosLaboratorio.nome}
              </span>
              <span className='text-textSecondary font-semibold text-lg first-letter:uppercase'>{dadosLaboratorio.local}</span>
            </div>
            <div>
              <button
                onClick={handleCreateReserva}  // Redireciona para a página de criação de reserva
                className="bg-primary hover:bg-green-700 duration-150 font-semibold text-white p-2 px-3 rounded-lg flex gap-1"
              >
                  <Plus theme='outline' size='22' strokeWidth={5}/>
                  Reserva
              </button>
            </div>
          </div>
          <Calendar
            className='text-textSecondary custom-calendar'
            onChange={handleDateChange}
            value={selectedDate}
          />

          <div className='gap-2.5 w-full mt-4 flex flex-col bg-gradient-to-b from-white to-gray-50 p-4 py-3 rounded-lg'>
            <h2 className='font-bold text-textSecondary text-lg'>
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
