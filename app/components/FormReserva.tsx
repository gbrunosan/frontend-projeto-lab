'use client'

import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'
import { Flask } from '@icon-park/react';
import 'react-datepicker/dist/react-datepicker.css'

type Laboratorio = {
  id: number
  nome: string
  local: string
}

const FormReserva = () => {
  const [laboratorios, setLaboratorios] = useState<Laboratorio[]>([])
  const [laboratorioId, setLaboratorioId] = useState<string>('')
  const [dataInicio, setDataInicio] = useState<Date | null>(null)
  const [dataFim, setDataFim] = useState<Date | null>(null)
  const [professor, setProfessor] = useState('')
  const [numEstudantes, setNumEstudantes] = useState(0)
  const [repetirHorario, setRepetirHorario] = useState(false)
  const [anotacoes, setAnotacoes] = useState('')
  const [mensagem, setMensagem] = useState('')

  useEffect(() => {
    fetch('http://localhost:5000/api/laboratorios')
      .then(res => res.json())
      .then(data => setLaboratorios(data))
      .catch(err => console.error('Erro ao carregar laboratórios:', err))
  }, [])

  const formatDateTime = (date: Date | null) => {
    return date ? format(date, "yyyy-MM-dd'T'HH:mm") : ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!dataInicio || !dataFim || !laboratorioId) {
      setMensagem('Preencha todos os campos obrigatórios.')
      return
    }

    const payload = {
      data_inicio: formatDateTime(dataInicio),
      data_fim: formatDateTime(dataFim),
      professor_responsavel: professor,
      num_estudantes: numEstudantes,
      repetir_horario: repetirHorario,
      anotacoes,
      laboratorio_id: Number(laboratorioId),
    }

    try {
      const res = await fetch('http://localhost:5000/api/add_reserva', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (res.ok) {
        setMensagem('Reserva criada com sucesso!')
        // resetar campos
        setDataInicio(null)
        setDataFim(null)
        setProfessor('')
        setNumEstudantes(0)
        setRepetirHorario(false)
        setAnotacoes('')
        setLaboratorioId('')
      } else {
        setMensagem(data.error || 'Erro ao criar reserva.')
      }
    } catch (error) {
      setMensagem('Erro de conexão com o servidor.')
    }
  }

  return (
    <div className='flex flex-col gap-3.5 px-1 mt-2'>
      <span className='text-lg font-bold text-neutral-800'>Criar nova reserva</span>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white max-w-xl w-full mx-auto px-3">
        <div className='rounded-lg w-full border border-gray-400 px-2 flex items-center h-11 gap-1.5'>
          <Flask theme="outline" size="24" fill="#4a5565"></Flask>
          <select
              value={laboratorioId}
              onChange={(e) => setLaboratorioId(e.target.value)}
              required
              className="w-full h-full focus:outline-none focus:ring-0 focus:border-none"
            >
              <option value="">Selecione um laboratório</option>
              {laboratorios.map((lab) => (
                <option key={lab.id} value={lab.id}>
                  {lab.nome} ({lab.local})
                </option> 
              ))}
          </select>
        </div>
        
        <div className='w-full flex flex-col'>
          <label className="mb-0.5">Data e hora de início</label>
          <DatePicker
            selected={dataInicio}
            onChange={(date) => setDataInicio(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="dd/MM/yyyy HH:mm" // ✅ Aqui está o que muda
            placeholderText="Selecione data e hora"
            className="border p-2 rounded-lg w-full border-gray-400"
            popperPlacement="bottom"
            popperClassName="z-50"
          />
        </div>
          
        <div className='w-full flex flex-col'>
          <label className="mb-0.5">Data e hora de fim</label>
          <DatePicker
            selected={dataFim}
            onChange={(date) => setDataFim(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="dd/MM/yyyy HH:mm" // ✅ Aqui está o que muda
            placeholderText="Selecione data e hora"
            className="border p-2 rounded-lg w-full border-gray-400"
            popperPlacement="bottom"
            popperClassName="z-50"
          />
        </div>
              

        <div className='w-full flex flex-col'>
          <label className="mb-0.5">Professor responsável</label>
          <input
            type="text"
            value={professor}
            onChange={(e) => setProfessor(e.target.value)}
            required
            className="border p-2 rounded-lg w-full border-gray-400"
          />
        </div>
        
        <div className='w-full flex flex-col'>
          <label className="mb-0.5">Número de estudantes</label>
          <input
            type="number"
            value={numEstudantes}
            onChange={(e) => setNumEstudantes(parseInt(e.target.value))}
            required
            className="border p-2 rounded-lg w-full border-gray-400"
            min={1}
          />
        </div>
        
        <div className='w-full flex flex-col'>
          <label className="mb-0.5">Anotações</label>
          <textarea
            value={anotacoes}
            onChange={(e) => setAnotacoes(e.target.value)}
            className="border p-2 rounded-lg w-full border-gray-400"
          />
        </div>
        
        <div className='w-full flex flex-col'>
          <label className=" flex gap-2 items-center">
          <input
            type="checkbox"
            checked={repetirHorario}
            onChange={(e) => setRepetirHorario(e.target.checked)}
          />
            Repetir horário semanalmente
          </label>
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded mt-2"
        >
          Confirmar reserva
        </button>
      </form>
      {mensagem && (
        <p className="text-sm mt-2 text-center">{mensagem}</p>
      )}
    </div>
  )
}

export default FormReserva
