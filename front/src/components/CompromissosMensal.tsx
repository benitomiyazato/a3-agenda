import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import { listarCompromissos } from "../api/compromissos";
import type { Compromisso } from "../tipos/compromissos";

interface CompromissosProps {
  dataSelecionada?: Date;
}

export default function CompromissosMensal({ dataSelecionada = new Date() }: CompromissosProps) {
  const [compromissos, setCompromissos] = useState<Compromisso[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    listarCompromissos()
      .then((data) => setCompromissos(data))
      .catch((err) => {
        console.error("Erro ao carregar compromissos:", err);
        setCompromissos([]);
      });
  }, []);

  const compromissosDoDia = compromissos.filter(c => {
    const dataCompromisso = new Date(c.dataInicio);
    return (
      dataCompromisso.getDate() === dataSelecionada.getDate() &&
      dataCompromisso.getMonth() === dataSelecionada.getMonth() &&
      dataCompromisso.getFullYear() === dataSelecionada.getFullYear()
    );
  });

  return (
    <div className="w-full h-full min-w-[200px] flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
        <h2 className="text-lg font-semibold">📅 Meus Compromissos</h2>
        <span className="text-sm text-gray-500">
          {compromissosDoDia.length} compromisso(s)
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
        {compromissosDoDia.map((compromisso) => (
          <div
            key={compromisso.id}
            className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm p-4 hover:shadow-md transition cursor-pointer"
            onClick={() => navigate(`/updateCompromisso/${compromisso.id}`)}
          >
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-blue-600">
                {compromisso.titulo}
              </h3>

              {compromisso.categoria && (
                <span className="text-xs text-gray-400">
                  {compromisso.categoria}
                </span>
              )}
            </div>


            {compromisso.descricao && (
              <p className="text-sm text-gray-600 mt-1">
                {compromisso.descricao}
              </p>
            )}


            <div className="flex justify-end mt-2 text-xs text-gray-500 gap-1 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 8.25h18M4.5 7.5v12a2.25 2.25 0 002.25 2.25h10.5A2.25 2.25 0 0019.5 19.5v-12m-15 0V19.5m0-12h15"
                />
              </svg>

              {`${new Date(compromisso.dataInicio).toLocaleDateString("pt-BR")} 
              ${new Date(compromisso.dataInicio).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", hour12: false })} - 
              ${new Date(compromisso.dataFim).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", hour12: false })}`}

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
