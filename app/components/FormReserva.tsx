"use client";

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { Flask } from "@icon-park/react";
import "react-datepicker/dist/react-datepicker.css";
import { fetchComToken } from "@/utils/fetchComToken";
import { useRouter } from "next/navigation";
import Toast from "@/app/components/Toast";
import ModalRepetir from "@/app/components/ModalRepetir";

type Laboratorio = {
  id: number;
  nome: string;
  local: string;
};

const FormReserva = () => {
  const [laboratorios, setLaboratorios] = useState<Laboratorio[]>([]);
  const [laboratorioId, setLaboratorioId] = useState<string>("");
  const [dataInicio, setDataInicio] = useState<Date | null>(null);
  const [dataFim, setDataFim] = useState<Date | null>(null);
  const [professor, setProfessor] = useState("");
  const [numEstudantes, setNumEstudantes] = useState(0);
  const [repetirHorario, setRepetirHorario] = useState(false);
  const [anotacoes, setAnotacoes] = useState("");
  const [toast, setToast] = useState<any>(null);
  const [showModalRepetir, setShowModalRepetir] = useState(false);
  const [datasExtras, setDatasExtras] = useState<Date[]>([]);
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchComToken("laboratorios")
      .then(setLaboratorios)
      .catch((err) => {
        console.error("Erro ao carregar laboratórios:", err.message);
      });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const laboratorioIdFromUrl = params.get("laboratorioId");

    if (laboratorioIdFromUrl) {
      setLaboratorioId(laboratorioIdFromUrl);
    }
  }, []);

  const formatDateTime = (date: Date | null) => {
    return date ? format(date, "yyyy-MM-dd'T'HH:mm") : "";
  };

  const handleRepetirChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepetirHorario(e.target.checked);
    if (e.target.checked) {
      setShowModalRepetir(true);
    } else if (!e.target.checked) {
      setDatasExtras([]);
    }
  };

  const isDateValid = () => {
    if (dataInicio && dataFim) {
      return dataFim > dataInicio;
    }
    return false;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dataInicio || !dataFim || !laboratorioId) {
      setToast({
        type: "error",
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
      });
      return;
    }

    if (!isDateValid()) {
      setToast({
        type: "error",
        title: "Erro",
        description: "A data de fim não pode ser anterior à data de início.",
      });
      return;
    }

    setFormError(null);

    const datasRepetir = datasExtras
      .map((date) => format(date, "yyyy-MM-dd'T'HH:mm"))
      .filter((v, i, arr) => arr.indexOf(v) === i);

    const reservaPayload = [
      {
        data_inicio: format(dataInicio, "yyyy-MM-dd'T'HH:mm"),
        data_fim: format(dataFim, "yyyy-MM-dd'T'HH:mm"),
        professor_responsavel: professor,
        num_estudantes: numEstudantes,
        repetir_horario: repetirHorario,
        anotacoes,
        laboratorio_id: Number(laboratorioId),
        datas_repetir: datasRepetir,
      },
    ];

    try {
      await fetchComToken("add_reserva", {
        method: "POST",
        body: JSON.stringify(reservaPayload),
      });

      setToast({
        type: "success",
        title: "Sucesso",
        description: "Reserva criada com sucesso!",
      });

      setDataInicio(null);
      setDataFim(null);
      setProfessor("");
      setNumEstudantes(0);
      setRepetirHorario(false);
      setAnotacoes("");
      setLaboratorioId("");
      setDatasExtras([]);
    } catch (error: any) {
      setToast({
        type: "error",
        title: "Erro",
        description: error.message || "Erro ao criar reserva.",
      });
    }
  };

  const isFormValid = dataInicio && dataFim && laboratorioId && isDateValid();
  return (
    <div className="flex flex-col gap-1 mt-2 bg-gray-50 shadow-md p-4 pb-2 md:!p-8 md:!pb-6 rounded-lg w-full max-w-[700px]">
      <span className="text-[22px] font-bold track text-textPrimary">
        Criar nova reserva
      </span>

      {toast && (
        <Toast
          type={toast.type}
          title={toast.title}
          description={toast.description}
          onClose={() => setToast(null)}
        />
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full mx-auto p-3 py-4 rounded-lg text-textSecondary"
      >
        <div className="rounded-lg w-full bg-white border border-secondary px-2 flex items-center h-11 gap-1.5">
          <Flask theme="outline" size="24" className="text-textPrimary"></Flask>
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

        <div className="w-full flex flex-col">
          <label className="mb-0.5">Data e hora de início</label>
          <DatePicker
            selected={dataInicio}
            onChange={(date) => setDataInicio(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="dd/MM/yyyy HH:mm"
            placeholderText="Selecione data e hora"
            className="border p-2 rounded-lg w-full border-secondary"
            popperPlacement="bottom"
            popperClassName="z-50"
          />
        </div>

        <div className="w-full flex flex-col">
          <label className="mb-0.5">Data e hora de fim</label>
          <DatePicker
            selected={dataFim}
            onChange={(date) => setDataFim(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="dd/MM/yyyy HH:mm"
            placeholderText="Selecione data e hora"
            className="border p-2 rounded-lg w-full border-secondary"
            popperPlacement="bottom"
            popperClassName="z-50"
          />
          {!isFormValid && (
            <span className="text-red-500 text-xs mt-1">
              A data de fim não pode ser anterior à data de início.
            </span>
          )}
        </div>

        {isFormValid && (
          <div className="w-full flex flex-col">
            <label className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={repetirHorario}
                onChange={handleRepetirChange}
              />
              Repetir horário da reserva
            </label>
            {datasExtras.length > 0 && (
              <span className="text-sm mt-1 text-green-700">
                Repetir reservas em:{" "}
                {datasExtras.map((d) => format(d, "dd/MM/yyyy")).join(", ")}
              </span>
            )}
          </div>
        )}

        <div className="w-full flex flex-col">
          <label className="mb-0.5">Professor responsável</label>
          <input
            type="text"
            value={professor}
            onChange={(e) => setProfessor(e.target.value)}
            required
            className="border p-2 rounded-lg w-full border-secondary"
          />
        </div>

        <div className="w-full flex flex-col">
          <label className="mb-0.5">Número de estudantes</label>
          <input
            type="numeric"
            value={numEstudantes}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || !isNaN(parseInt(value))) {
                setNumEstudantes(parseInt(value) || 0);
              }
            }}
            required
            className="border p-2 rounded-lg w-full border-secondary"
            min={1}
          />
        </div>

        <div className="w-full flex flex-col">
          <label className="mb-0.5">Anotações</label>
          <textarea
            value={anotacoes}
            onChange={(e) => setAnotacoes(e.target.value)}
            className="border p-2 rounded-lg w-full border-secondary"
          />
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-green-700  duration-150 font-semibold text-white p-2 rounded-lg mt-2 tracking-wide"
        >
          Confirmar reserva
        </button>
      </form>

      {showModalRepetir && (
        <ModalRepetir
          dataInicio={dataInicio || new Date()}
          dataFim={dataFim || new Date()}
          laboratorioId={laboratorioId || "1"}
          onClose={() => {
            setShowModalRepetir(false);
            if (datasExtras.length === 0) setRepetirHorario(false);
          }}
          onConfirm={(datas) => {
            setDatasExtras(datas);
            setShowModalRepetir(false);
          }}
        />
      )}
    </div>
  );
};

export default FormReserva;
