import CardMinhaReserva from './CardMinhaReserva';

type Reserva = {
  id: number;
  data_inicio: string;
  data_fim: string;
  professor_responsavel: string;
  num_estudantes: number;
  anotacoes?: string;
  laboratorio_id: number;
};

type Laboratorio = {
  id: number;
  nome: string;
  reservas: Reserva[];
};

type ReservasPorLaboratorioProps = {
  laboratorios: Laboratorio[];
  onRefresh?: () => void;
};

const ReservasPorLaboratorio = ({ laboratorios, onRefresh }: ReservasPorLaboratorioProps) => {
  return (
    <div className="space-y-8 px-3 bg-gray-50 py-6 w-full rounded-lg">
      {laboratorios.map((laboratorio) => (
        <div key={laboratorio.id} className="space-y-4">
          <h2 className="text-lg font-semibold text-primary">Reservas no {laboratorio.nome}</h2>
          <div className="space-y-4 px-1">
            {(laboratorio.reservas || []).map((reserva) => (
              <CardMinhaReserva
                key={reserva.id}
                id={reserva.id}
                dataInicio={reserva.data_inicio}
                dataFim={reserva.data_fim}
                professorResponsavel={reserva.professor_responsavel}
                numEstudantes={reserva.num_estudantes}
                anotacoes={reserva.anotacoes}
                onRefresh={onRefresh}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};


export default ReservasPorLaboratorio;
