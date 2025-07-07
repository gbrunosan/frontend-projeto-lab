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
    <div className="bg-[#f9f9f9] border border-gray-300 rounded-lg p-4 mb-3 shadow-sm text-neutral-800">
      <p className="font-semibold text-base mb-1">
        Professor: <span className="font-normal">{reserva.professor_responsavel}</span>
      </p>
      <p className="text-sm">
        <strong>Início:</strong> {formatDateTime(reserva.data_inicio)}
      </p>
      <p className="text-sm">
        <strong>Fim:</strong> {formatDateTime(reserva.data_fim)}
      </p>
      <p className="text-sm">
        <strong>Estudantes:</strong> {reserva.num_estudantes}
      </p>
      {reserva.anotacoes && (
        <div className="mt-2 text-sm">
          <strong>Obs:</strong> {reserva.anotacoes}
        </div>
      )}
    </div>
  )
}

export default ReservaCard
