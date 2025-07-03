'use client';  // Diretiva para garantir que é um componente do lado do cliente

import React, { useState, useEffect } from 'react';
import { Flask, ArrowDown } from '@icon-park/react';

const FormReserva = () => {
  const [laboratorios, setLaboratorios] = useState([]);  // Lista de laboratórios
  const [laboratorioId, setLaboratorioId] = useState('');  // ID do laboratório selecionado
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [professorResponsavel, setProfessorResponsavel] = useState('');
  const [numEstudantes, setNumEstudantes] = useState(0);
  const [repetirHorario, setRepetirHorario] = useState(false);
  const [anotacoes, setAnotacoes] = useState('');
  const [message, setMessage] = useState('');

  // Buscar os laboratórios disponíveis na inicialização do componente
  const fetchLaboratorios = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/laboratorios');
      const data = await response.json();
      if (response.ok) {
        setLaboratorios(data);  // Atualiza o estado com os laboratórios
      } else {
        setMessage('Erro ao carregar os laboratórios');
      }
    } catch (error) {
      setMessage('Erro ao conectar com o servidor');
    }
  };

  useEffect(() => {
    fetchLaboratorios();  // Chama a função para buscar os laboratórios assim que o componente é montado
  }, []);

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();  // Previne o comportamento padrão de envio de formulário

    const data = {
      data_inicio: dataInicio,
      data_fim: dataFim,
      professor_responsavel: professorResponsavel,
      num_estudantes: numEstudantes,
      repetir_horario: repetirHorario,
      anotacoes: anotacoes,
      laboratorio_id: laboratorioId,  // Passa o ID do laboratório selecionado
    };

    try {
      const response = await fetch('http://localhost:5000/api/add_reserva', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Reserva criada com sucesso!');
      } else {
        setMessage(`Erro: ${result.error}`);
      }
    } catch (error) {
      setMessage('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className='text-black px-3 w-full'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        {/* Selecione o Laboratório */}
        <div className='bg-[#E5E6E8] rounded-lg flex items-center px-2.5 gap-1.5'>
          <Flask theme="outline" size="24" fill="#333"></Flask>
          <select
            className='w-full py-3'
            value={laboratorioId}
            onChange={(e) => setLaboratorioId(e.target.value)}
            required
          >
            <option value="">Selecione um laboratório</option>
            {laboratorios.map((lab: { id: string; nome: string }) => (
              <option key={lab.id} value={lab.id}>
                {lab.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Campos do formulário de reserva */}
        <div className='flex flex-col w-full items-center justify-between gap-2.5 bg-[#E5E6E8] px-2.5 py-5 rounded-lg'>
          <div className='flex flex-col'>
            <label htmlFor="">Data início</label>
            <input
              className=''
              type="datetime-local"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              required
            />
          </div>
          
          <ArrowDown theme="outline" size="20" fill="#333"></ArrowDown>

          <div className='flex flex-col'>
            <label htmlFor="">Data final</label>
            <input
              className=''
              type="datetime-local"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label>Professor Responsável</label>
          <input 
            className='bg-[#E5E6E8] px-2.5 w-full rounded-lg h-11'
            type="text"
            value={professorResponsavel}
            onChange={(e) => setProfessorResponsavel(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Número de Estudantes</label>
          <input
            className='bg-[#E5E6E8] px-2.5 w-full rounded-lg h-11'
            type="number"
            value={numEstudantes}
            onChange={(e) => setNumEstudantes(Number(e.target.value))}
            required
          />
        </div>

        <div className='w-full flex gap-1.5'>
          <label>Repetir Horário?</label>
          <input
            type="checkbox"
            checked={repetirHorario}
            onChange={(e) => setRepetirHorario(e.target.checked)}
          />
        </div>

        <div>
          <label>Anotações</label>
          <input
            className='w-full bg-[#E5E6E8] rounded-lg h-11 px-2.5'
            value={anotacoes}
            onChange={(e) => setAnotacoes(e.target.value)}
          ></input>
        </div>

        <button className='bg-green-500 h-12 rounded-xl text-white font-semibold text-lg' type="submit">Agendar</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default FormReserva;
