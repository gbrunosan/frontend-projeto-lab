'use client'

import React from 'react'

interface Reserva {
  id: number
  data_inicio: string
  data_fim: string
  professor_responsavel: string
  num_estudantes: number
  repetir_horario: boolean
  anotacoes?: string | null
}

interface Props {
  reserva: Reserva
}

const ReservaCard: React.FC<Props> = ({ reserva }) => {
  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleString('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
    })
  }

  return (
    <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-3 shadow-sm text-sm text-textSecondary">
      <p className="font-bold text-base mb-1 text-primary">
        Reservado por <span className="">{reserva.professor_responsavel}</span>
      </p>
      <p>
        <span className='text-neutral-600 font-semibold'>Início:</span> {formatDateTime(reserva.data_inicio)}
      </p>
      <p>
        <span className='text-neutral-600 font-semibold'>Fim:</span> {formatDateTime(reserva.data_fim)}
      </p>
      <p>
        <span className='text-neutral-600 font-semibold'>Número de estudantes:</span> {reserva.num_estudantes}
      </p>
      {reserva.anotacoes && (
        <div className="mt-2 p-2">
          <strong>Obs:</strong> {reserva.anotacoes}
        </div>
      )}
    </div>
  )
}

export default ReservaCard
