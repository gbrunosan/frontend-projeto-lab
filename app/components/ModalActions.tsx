'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CloseSmall } from '@icon-park/react';

interface ModalActionsProps {
  onClose: () => void;
  onNovoLaboratorio: () => void;
  onNovaReserva: () => void;
}

const ModalActions: React.FC<ModalActionsProps> = ({ onClose, onNovoLaboratorio, onNovaReserva }) => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  // Fechar o modal ao clicar fora da área do modal
  const handleOutsideClick = (e: React.MouseEvent) => {
    const modalContent = e.target as HTMLElement;
    if (modalContent.classList.contains('modal-container')) {
      handleClose();
    }
  };

  // Função para animar saída antes de desmontar
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 150); // tempo igual ao da transição
  };

  // Fechar o modal ao pressionar a tecla 'Escape'
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-10 modal-container px-4 transition-opacity duration-150 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={handleOutsideClick}
    >
      <div
        className={`bg-tertiary p-6 h-[230px] rounded-lg shadow-lg w-full max-w-[550px] relative flex flex-col justify-around transform transition-all duration-150 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}  // Fecha o modal
          className="absolute top-2 right-2 border border-gray-600 text-gray-600 rounded-lg p-1 hover:border-red-500 hover:text-red-500 duration-150"
        >
          <CloseSmall theme="outline" size="24" strokeWidth={4} />
        </button>
        <h2 className="text-xl font-semibold text-center mb-4">O que deseja criar?</h2>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              handleClose();
              setTimeout(onNovaReserva, 150);
            }}
            className="bg-primary font-semibold hover:bg-green-700 duration-150 text-white py-2 px-4 rounded-lg"
          >
            Nova Reserva
          </button>
          <button
            onClick={() => {
              handleClose();
              setTimeout(onNovoLaboratorio, 150);
            }}
            className="bg-blue-500 hover:bg-blue-600 font-semibold duration-150 text-white py-2 px-4 rounded-lg"
          >
            Novo Laboratório
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalActions;
