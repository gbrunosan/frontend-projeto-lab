import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Toast from "@/app/components/Toast";
import { fetchComToken } from "@/utils/fetchComToken";

interface DiaExtra {
  date: Date;
  disponivel: boolean;
}

interface ModalRepetirProps {
  dataInicio: Date;
  dataFim: Date;
  laboratorioId: string;
  onClose: () => void;
  onConfirm: (datasExtras: Date[]) => void;
}

const ModalRepetir: React.FC<ModalRepetirProps> = ({
  dataInicio,
  dataFim,
  laboratorioId,
  onClose,
  onConfirm,
}) => {
  const [dias, setDias] = useState<DiaExtra[]>([]);
  const [selecionados, setSelecionados] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    let cancelado = false;
    if (!dataInicio || !dataFim || !laboratorioId) return;
    const buscarDisponibilidade = async () => {
      setLoading(true);
      try {
        const resp = await fetchComToken("verificar_disponibilidade", {
          method: "POST",
          body: JSON.stringify({
            data_inicio: format(dataInicio, "yyyy-MM-dd'T'HH:mm"),
            data_fim: format(dataFim, "yyyy-MM-dd'T'HH:mm"),
            laboratorio_id: Number(laboratorioId),
          }),
        });
        const livres: string[] = Array.isArray(resp.datas_livres)
          ? resp.datas_livres
          : [];
        const ocupadas: string[] = Array.isArray(resp.datas_ocupadas)
          ? resp.datas_ocupadas
          : [];
        const novasDatas: DiaExtra[] = [
          ...livres.map((d) => ({ date: new Date(d), disponivel: true })),
          ...ocupadas.map((d) => ({ date: new Date(d), disponivel: false })),
        ].sort((a, b) => a.date.getTime() - b.date.getTime());
        if (!cancelado) {
          setDias(novasDatas);
          setSelecionados(
            novasDatas.filter((d) => d.disponivel).map((d) => d.date)
          );
        }
      } catch (err) {
        if (!cancelado) {
          setDias([]);
          setSelecionados([]);
          setToast({
            type: "error",
            title: "Erro",
            description: "Erro ao consultar disponibilidade.",
          });
        }
      }
      if (!cancelado) setLoading(false);
    };
    buscarDisponibilidade();
    return () => {
      cancelado = true;
    };
  }, [dataInicio, dataFim, laboratorioId]);

  const handleCheck = (date: Date, checked: boolean) => {
    setSelecionados((prev) =>
      checked
        ? [...prev, date]
        : prev.filter((d) => d.getTime() !== date.getTime())
    );
  };
  const handleOutsideClick = (e: React.MouseEvent) => {
    const modalContent = e.target as HTMLElement;
    if (modalContent.classList.contains("modal-container")) {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 150);
  };

  return (
    <div onClick={handleOutsideClick} className={`fixed inset-0 flex items-center justify-center bg-black backdrop-blur-sm bg-opacity-60 z-50 px-3 modal-container transition-opacity duration-150 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <h2 className="text-xl font-bold mb-4">Repetir para estes dias</h2>
        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
        {loading ? (
          <p>Verificando disponibilidade...</p>
        ) : (
          <div className="flex flex-col gap-3">
            {dias.map((dia, idx) => (
              <label
                key={idx}
                className={`flex items-center gap-2  ${
                  !dia.disponivel ? "text-gray-400" : ""
                }`}
              >
                {dia.disponivel ? (
                  <input
                    type="checkbox"
                    checked={selecionados.some(
                      (d) => d.getTime() === dia.date.getTime()
                    )}
                    onChange={(e) => handleCheck(dia.date, e.target.checked)}
                  />
                ) : (
                  <span className="w-4 h-4 inline-block border border-gray-300 rounded bg-gray-200" />
                )}
                {format(dia.date, "EEEE, dd/MM/yyyy 'às' HH:mm", {
                    locale: ptBR,
                    }).replace(/^\w/, (c) => c.toUpperCase())}

                {!dia.disponivel && (
                  <span className="ml-2 text-xs">(Indisponível)</span>
                )}
              </label>
            ))}
          </div>
        )}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={handleClose} className="px-4 py-2.5 rounded bg-gray-200 hover:bg-gray-300 font-semibold duration-150">
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(selecionados)}
            className="px-4 py-2.5 rounded bg-primary hover:bg-green-700 duration-150 text-white font-semibold disabled:bg-gray-400"
            disabled={selecionados.length === 0}
          >
            Feito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalRepetir;
