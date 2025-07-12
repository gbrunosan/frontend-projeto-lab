import { Pencil, DeleteFive, CloseSmall } from "@icon-park/react";
import { useState, useEffect } from "react";
import { fetchComToken } from "@/utils/fetchComToken";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type ReservaProps = {
  id: number;
  dataInicio: string;
  dataFim: string;
  professorResponsavel: string;
  numEstudantes: number;
  anotacoes?: string;
  onRefresh?: () => void;
};

const CardMinhaReserva = ({
  id,
  dataInicio,
  dataFim,
  professorResponsavel,
  numEstudantes,
  anotacoes,
  onRefresh,
}: ReservaProps) => {
  const [localData, setLocalData] = useState({
    dataInicio,
    dataFim,
    professorResponsavel,
    numEstudantes,
    anotacoes: anotacoes || "",
  });

  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    data_inicio: dataInicio,
    data_fim: dataFim,
    professor_responsavel: professorResponsavel,
    num_estudantes: numEstudantes,
    anotacoes: anotacoes || "",
  });

  const [dataInicioEdit, setDataInicioEdit] = useState<Date | null>(
    dataInicio ? new Date(dataInicio) : null
  );
  const [dataFimEdit, setDataFimEdit] = useState<Date | null>(
    dataFim ? new Date(dataFim) : null
  );

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      data_inicio: dataInicioEdit ? dataInicioEdit.toISOString() : "",
      data_fim: dataFimEdit ? dataFimEdit.toISOString() : "",
    }));
  }, [dataInicioEdit, dataFimEdit]);

  useEffect(() => {
    setLocalData({
      dataInicio,
      dataFim,
      professorResponsavel,
      numEstudantes,
      anotacoes: anotacoes || "",
    });
  }, [dataInicio, dataFim, professorResponsavel, numEstudantes, anotacoes]);

  const formatarData = (data: string) => {
    const dataObj = new Date(data);
    return dataObj.toLocaleString("pt-BR", {
      weekday: "short", // exibe o dia da semana
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // usar formato 24 horas
    });
  };

  const editarReserva = () => {
    setIsEditing(true);
    setShowModal(true);
    setTimeout(() => setIsVisible(true), 10);
  };

  const excluirReserva = () => {
    setIsEditing(false);
    setShowModal(true);
    setTimeout(() => setIsVisible(true), 10);
  };

 const salvarEdicao = async () => {
  try {
    const payload = {
      ...formData,
      data_inicio: dataInicioEdit
        ? formatarDataLocal(dataInicioEdit)
        : "",
      data_fim: dataFimEdit ? formatarDataLocal(dataFimEdit) : "",
    };

    const response = await fetchComToken(`reserva/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    setLocalData({
      dataInicio: payload.data_inicio || "",
      dataFim: payload.data_fim || "",
      professorResponsavel: payload.professor_responsavel,
      numEstudantes: payload.num_estudantes,
      anotacoes: payload.anotacoes,
    });
    setShowModal(false);
  } catch (error) {
    console.error(error);
  }
};

// Função para formatar a data no formato local
const formatarDataLocal = (data: Date) => {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return (
    data.getFullYear() +
    "-" +
    pad(data.getMonth() + 1) +
    "-" +
    pad(data.getDate()) +
    "T" +
    pad(data.getHours()) +
    ":" +
    pad(data.getMinutes())
  );
};



  const confirmarExclusao = async () => {
    try {
      await fetchComToken(`reserva/${id}`, { method: "DELETE" });
      setShowModal(false);
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error(error);
    }
  };

  const fecharModal = () => {
    setIsVisible(false);
    setTimeout(() => setShowModal(false), 150);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-300 text-textSecondary">
      <p className="font-semibold text-lg md:text-xl">{localData.professorResponsavel}</p>
      <p className="text-sm md:text-base">
        Data de Início: {formatarData(localData.dataInicio)}
      </p>
      <p className="text-sm md:text-base">Data de Fim: {formatarData(localData.dataFim)}</p>
      <p className="text-sm md:text-base">Número de Estudantes: {localData.numEstudantes}</p>
      {localData.anotacoes && (
        <p className="text-sm md:text-base mt-2 text-gray-600">
          Anotações: {localData.anotacoes}
        </p>
      )}
      <div className="flex w-full justify-end gap-2 mt-3.5">
        <button
          onClick={editarReserva}
          className="px-3 py-1.5 rounded-lg border border-neutral-700 flex gap-1 items-center text-sm font-semibold text-neutral-700"
        >
          <Pencil theme="outline" size="24" fill="#333" />
          <span>Editar</span>
        </button>
        <button
          onClick={excluirReserva}
          className="px-3 py-1.5 rounded-lg border border-neutral-700 flex gap-1 items-center text-sm font-semibold text-neutral-700"
        >
          <DeleteFive theme="outline" size="24" fill="#333" />
          <span>Excluir</span>
        </button>
      </div>

      {showModal && (
        <div
          onClick={fecharModal}
          className={`fixed inset-0 flex justify-center items-center bg-black px-3 bg-opacity-60 backdrop-blur-sm z-50 transition-opacity duration-150 ${
            isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`bg-white p-6 rounded-lg shadow-md w-full max-w-[450px] transform transition-all duration-150 ease-out ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <div className="flex justify-between gap-2 itens-center mb-4">
              <h2 className="text-xl font-bold">
                {isEditing ? "Editar Reserva" : "Excluir Reserva"}
              </h2>
              <button
                onClick={fecharModal}
                className=" text-gray-500 rounded-md hover:border-red-500 hover:text-red-500 duration-150 border border-gray-500  p-1"
              >
                <CloseSmall size={22} />
              </button>
            </div>

            {isEditing ? (
              <div>
                <div className="mb-4 w-full flex flex-col">
                  <label
                    htmlFor="data_inicio"
                    className="block text-sm font-semibold text-textPrimary mb-1"
                  >
                    Data de Início
                  </label>
                  <DatePicker
                    selected={dataInicioEdit}
                    onChange={(date) => setDataInicioEdit(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="dd/MM/yyyy HH:mm"
                    placeholderText="Selecione data e hora"
                    className="w-full p-2 border border-secondary rounded-lg"
                    popperPlacement="bottom"
                    popperClassName="z-50"
                  />
                </div>

                <div className="mb-4 w-full flex flex-col">
                  <label
                    htmlFor="data_fim"
                    className="block text-sm font-semibold "
                  >
                    Data de Fim
                  </label>
                  <DatePicker
                    selected={dataFimEdit}
                    onChange={(date) => setDataFimEdit(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="dd/MM/yyyy HH:mm"
                    placeholderText="Selecione data e hora"
                    className="w-full p-2 border border-secondary rounded-lg"
                    popperPlacement="bottom"
                    popperClassName="z-50"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="professor_responsavel"
                    className="block text-sm font-semibold text-textPrimary"
                  >
                    Professor Responsável
                  </label>
                  <input
                    type="text"
                    name="professor_responsavel"
                    id="professor_responsavel"
                    value={formData.professor_responsavel}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        professor_responsavel: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-secondary rounded-lg"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="num_estudantes"
                    className="block text-sm font-semibold text-textPrimary"
                  >
                    Número de Estudantes
                  </label>
                  <input
                    type="number"
                    id="num_estudantes"
                    value={formData.num_estudantes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        num_estudantes: Number(e.target.value),
                      })
                    }
                    className="w-full p-2 border border-secondary rounded-lg"
                    min={1}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="anotacoes"
                    className="block text-sm font-semibold text-textPrimary"
                  >
                    Anotações
                  </label>
                  <textarea
                    name="anotacoes"
                    id="anotacoes"
                    value={formData.anotacoes}
                    onChange={(e) =>
                      setFormData({ ...formData, anotacoes: e.target.value })
                    }
                    className="w-full p-2 border border-secondary rounded-lg"
                  />
                </div>

                <button
                  onClick={salvarEdicao}
                  className="bg-primary hover:bg-green-700 duration-150 text-white font-semibold text-[17px] px-4 py-2 w-full rounded-md mr-2"
                >
                  Salvar
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <p>Você tem certeza que deseja excluir esta reserva?</p>
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={fecharModal}
                    className="bg-gray-300 hover:bg-gray-400 duration-150 text-gray-700 px-5 py-2 font-semibold rounded-md"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={confirmarExclusao}
                    className="bg-red-500 hover:bg-red-600 duration-150 text-white px-5 py-2 font-semibold rounded-md mr-2"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardMinhaReserva;
