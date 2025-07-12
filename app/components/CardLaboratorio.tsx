'use client';

import { Pencil, DeleteFive, CloseSmall } from "@icon-park/react";
import { useState, useEffect } from "react";
import { fetchComToken } from "@/utils/fetchComToken";

type LaboratorioProps = {
  id: number;
  nome: string;
  local: string;
  onRefresh: () => void;
};

const CardLaboratorio = ({ id, nome, local, onRefresh }: LaboratorioProps) => {
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ nome, local });

  const editarLaboratorio = () => {
    setIsEditing(true);
    setShowModal(true);
    setTimeout(() => setIsVisible(true), 10);
  };

  const excluirLaboratorio = () => {
    setIsEditing(false);
    setShowModal(true);
    setTimeout(() => setIsVisible(true), 10);
  };

  const salvarEdicao = async () => {
    try {
      await fetchComToken(`laboratorio/${id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
      });
      setShowModal(false);
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error(error);
    }
  };

  const confirmarExclusao = async () => {
    try {
      await fetchComToken(`laboratorio/${id}`, { method: "DELETE" });
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
      <p className="font-semibold text-lg md:text-xl">{nome}</p>
      <p className="text-sm md:text-base">Local: {local}</p>
      <div className="flex w-full justify-end gap-2 mt-3.5">
        <button
          onClick={editarLaboratorio}
          className="px-3 py-1.5 rounded-lg border border-neutral-700 hover:border-blue-600 hover:text-blue-600 duration-150 flex gap-1 items-center text-sm font-semibold text-neutral-700"
        >
          <Pencil theme="outline" size="24" />
          <span>Editar</span>
        </button>
        <button
          onClick={excluirLaboratorio}
          className="px-3 py-1.5 rounded-lg border border-neutral-700 hover:border-red-600 hover:text-red-600 duration-150 flex gap-1 items-center text-sm font-semibold text-neutral-700"
        >
          <DeleteFive theme="outline" size="24"/>
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
                {isEditing ? "Editar Laboratório" : "Excluir Laboratório"}
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
                    htmlFor="nome"
                    className="block text-sm font-semibold text-textPrimary mb-1"
                  >
                    Nome do Laboratório
                  </label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) =>
                      setFormData({ ...formData, nome: e.target.value })
                    }
                    className="w-full p-2 border border-secondary rounded-lg"
                  />
                </div>

                <div className="mb-4 w-full flex flex-col">
                  <label
                    htmlFor="local"
                    className="block text-sm font-semibold text-textPrimary mb-1"
                  >
                    Localização
                  </label>
                  <input
                    type="text"
                    value={formData.local}
                    onChange={(e) =>
                      setFormData({ ...formData, local: e.target.value })
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
                <p>Você tem certeza que deseja excluir este laboratório?</p>
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

export default CardLaboratorio;
