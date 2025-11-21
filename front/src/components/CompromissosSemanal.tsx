import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { listarCompromissos } from "../api/compromissos";
import type { Compromisso } from "../tipos/compromissos";

interface CompromissosSemanalProps {
    semanaSelecionada?: Date;
    locale?: string;
}

export default function CompromissosSemanal({
    semanaSelecionada = new Date(),
    locale = "pt-BR",
}: CompromissosSemanalProps) {
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

    const domingo = new Date(semanaSelecionada);
    domingo.setDate(semanaSelecionada.getDate() - semanaSelecionada.getDay());


    const semana = Array.from({ length: 7 }, (_, i) => {
        const dia = new Date(domingo);
        dia.setDate(domingo.getDate() + i);
        return dia;
    });

    const compromissosPorDia = semana.map((dia) =>
        compromissos
            .filter((c) => {
                const dataC = new Date(c.dataInicio);
                return (
                    dataC.getDate() === dia.getDate() &&
                    dataC.getMonth() === dia.getMonth() &&
                    dataC.getFullYear() === dia.getFullYear()
                );
            })
            .sort(
                (a, b) =>
                    new Date(a.dataInicio).getTime() - new Date(b.dataInicio).getTime()
            )
    );

    const formatadorDia = new Intl.DateTimeFormat(locale, { weekday: "long" });

    return (
        <div className="w-full h-full min-w-[200px] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
                <h2 className="text-lg font-semibold">📅 Compromissos da Semana</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
                {semana.map((dia, i) => {
                    if (compromissosPorDia[i].length === 0) return null;

                    return (
                        <div key={dia.toISOString()} className="flex flex-col">
                            <h3 className="font-semibold text-gray-700 mb-2">
                                {formatadorDia.format(dia)}{" "}
                                <span className="text-sm text-gray-400">
                                    {dia.toLocaleDateString(locale)}
                                </span>
                            </h3>

                            {compromissosPorDia[i].map((compromisso) => (
                                <div
                                    key={compromisso.id}
                                    className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm p-4 hover:shadow-md transition cursor-pointer mb-2"
                                    onClick={() =>
                                        navigate(`/updateCompromisso/${compromisso.id}`)
                                    }
                                >
                                    <div className="flex items-start justify-between">
                                        <h4 className="font-semibold text-blue-600">
                                            {compromisso.titulo}
                                        </h4>
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

                                    {compromisso.local && (
                                        <p className="text-sm text-gray-500 mt-1">
                                            📍 {compromisso.local}
                                        </p>
                                    )}

                                    {compromisso.link && (
                                        <a
                                            href={compromisso.link.startsWith("http") ? compromisso.link : `https://${compromisso.link}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-500 mt-1 hover:underline break-all"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            🔗 {compromisso.link}
                                        </a>
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
                                        {`${new Date(compromisso.dataInicio).toLocaleTimeString(locale, {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: false,
                                        })} – ${new Date(compromisso.dataFim).toLocaleTimeString(locale, {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: false,
                                        })}`}

                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
