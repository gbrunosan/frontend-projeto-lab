"use client";
import { useEffect, useState, useCallback } from "react";
import ReservasPorLaboratorio from "@/app/components/ReservaPorLaboratorio";
import { fetchComToken } from "@/utils/fetchComToken";
import { Left } from "@icon-park/react";
import { useRouter } from "next/navigation";

export default function MinhasReservas() {
  const router = useRouter();
  const [laboratorios, setLaboratorios] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLaboratorios = useCallback(async () => {
    try {
      const data = await fetchComToken("minhas_reservas");
      setLaboratorios(data);
    } catch (error) {
      console.error("Erro ao carregar reservas:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleGoBack = () => {
    router.back();
  };

  useEffect(() => {
    fetchLaboratorios();
  }, [fetchLaboratorios]);

  return (
    <div className="md:mt-3">
      <div
        onClick={handleGoBack}
        className="w-fit pl-0 p-1 text-neutral-800 flex gap-1.5 items-center cursor-pointer font-semibold mb-1"
      >
        <div>
          <Left theme="outline" size="24" fill="#333" />
        </div>
        <span>Voltar</span>
      </div>
      <h1 className="text-2xl font-bold mb-6 text-textPrimary">Minhas Reservas</h1>
      
      {loading ? (
        <p>Carregando reservas...</p>
      ) : laboratorios.length === 0 ? (
        <p className="text-gray-700 mt-8 text-center">
          Você ainda não fez nenhuma reserva.
        </p>
      ) : (
        <ReservasPorLaboratorio
          laboratorios={laboratorios}
          onRefresh={fetchLaboratorios}
        />
      )}
    </div>
  );
}
