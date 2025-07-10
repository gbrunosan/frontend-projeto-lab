'use client'

import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'
import { Flask } from '@icon-park/react'
import 'react-datepicker/dist/react-datepicker.css'
import { fetchComToken } from '@/utils/fetchComToken'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()

  useEffect(() => {
    fetchComToken('http://localhost:5000/api/laboratorios')
      .then(setLaboratorios)
      .catch((err) => {
        console.error('Erro ao carregar laboratórios:', err.message)
      })
  }, [])

  useEffect(() => {
    // Lê o laboratorioId da URL
    const params = new URLSearchParams(window.location.search)
    const laboratorioIdFromUrl = params.get('laboratorioId')

    if (laboratorioIdFromUrl) {
      setLaboratorioId(laboratorioIdFromUrl)
    }
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
      const data = await fetchComToken('http://localhost:5000/api/add_reserva', {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      setMensagem('Reserva criada com sucesso!')
      // resetar campos
      setDataInicio(null)
      setDataFim(null)
      setProfessor('')
      setNumEstudantes(0)
      setRepetirHorario(false)
      setAnotacoes('')
      setLaboratorioId('')
    } catch (error: any) {
      setMensagem(error.message || 'Erro ao criar reserva.')
    }
  }

  return (
    <div className='flex flex-col gap-1 mt-2 bg-gray-50 shadow-md p-4 pb-2 rounded-lg'>
      <span className='text-[22px] font-bold track text-textPrimary'>
        Criar nova reserva
      </span>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4 max-w-xl w-full mx-auto p-3 py-4 rounded-lg text-textSecondary'
      >
        <div className='rounded-lg w-full bg-white border border-secondary px-2 flex items-center h-11 gap-1.5'>
          <Flask theme='outline' size='24' className='text-textPrimary'></Flask>
          <select
            value={laboratorioId}
            onChange={(e) => setLaboratorioId(e.target.value)}
            required
            className='w-full h-full focus:outline-none focus:ring-0 focus:border-none'
          >
            <option value=''>Selecione um laboratório</option>
            {laboratorios.map((lab) => (
              <option key={lab.id} value={lab.id}>
                {lab.nome} ({lab.local})
              </option>
            ))}
          </select>
        </div>

        <div className='w-full flex flex-col'>
          <label className='mb-0.5'>Data e hora de início</label>
          <DatePicker
            selected={dataInicio}
            onChange={(date) => setDataInicio(date)}
            showTimeSelect
            timeFormat='HH:mm'
            timeIntervals={15}
            dateFormat='dd/MM/yyyy HH:mm' // ✅ Aqui está o que muda
            placeholderText='Selecione data e hora'
            className='border p-2 rounded-lg w-full border-secondary'
            popperPlacement='bottom'
            popperClassName='z-50'
          />
        </div>

        <div className='w-full flex flex-col'>
          <label className='mb-0.5'>Data e hora de fim</label>
          <DatePicker
            selected={dataFim}
            onChange={(date) => setDataFim(date)}
            showTimeSelect
            timeFormat='HH:mm'
            timeIntervals={15}
            dateFormat='dd/MM/yyyy HH:mm' // ✅ Aqui está o que muda
            placeholderText='Selecione data e hora'
            className='border p-2 rounded-lg w-full border-secondary'
            popperPlacement='bottom'
            popperClassName='z-50'
          />
        </div>

        <div className='w-full flex flex-col'>
          <label className='mb-0.5'>Professor responsável</label>
          <input
            type='text'
            value={professor}
            onChange={(e) => setProfessor(e.target.value)}
            required
            className='border p-2 rounded-lg w-full border-secondary'
          />
        </div>

        <div className='w-full flex flex-col'>
          <label className='mb-0.5'>Número de estudantes</label>
          <input
            type='number'
            value={numEstudantes}
            onChange={(e) => setNumEstudantes(parseInt(e.target.value))}
            required
            className='border p-2 rounded-lg w-full border-secondary'
            min={1}
          />
        </div>

        <div className='w-full flex flex-col'>
          <label className='mb-0.5'>Anotações</label>
          <textarea
            value={anotacoes}
            onChange={(e) => setAnotacoes(e.target.value)}
            className='border p-2 rounded-lg w-full border-secondary'
          />
        </div>

        <div className='w-full flex flex-col'>
          <label className='flex gap-2 items-center'>
            <input
              type='checkbox'
              checked={repetirHorario}
              onChange={(e) => setRepetirHorario(e.target.checked)}
            />
            Repetir horário semanalmente
          </label>
        </div>

        <button
          type='submit'
          className='bg-primary hover:bg-green-700 duration-150 font-semibold text-white p-2 rounded-lg mt-2 tracking-wide'
        >
          Confirmar reserva
        </button>
      </form>
      {mensagem && <p className='text-sm mt-2 text-center'>{mensagem}</p>}
    </div>
  )
}

export default FormReserva
