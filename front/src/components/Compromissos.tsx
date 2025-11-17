// src/componentes/Compromissos.tsx
import { listarCompromissos } from "../banco-de-dados/compromissos";

interface CompromissosProps {
    dataSelecionada?: Date;
}

export default function Compromissos({dataSelecionada = new Date()}: CompromissosProps) {
  const compromissos = listarCompromissos().filter(c => {
    const dataCompromisso = new Date(c.data);
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
          {compromissos.length} compromisso(s)
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
        {compromissos.map((compromisso) => (
          <div
            key={compromisso.id}
            className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm p-4 hover:shadow-md transition cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold text-blue-600 mb-1">
                  {compromisso.titulo}
                </h3>
                <p className="text-sm text-gray-600 mb-2 sm:mb-0">
                  {compromisso.descricao}
                </p>
              </div>

              <div className="text-xs text-gray-500 flex items-center gap-1 mt-2 sm:mt-0">
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
                {new Date(compromisso.data).toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
