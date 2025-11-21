import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, useMemo } from "react";

import { listarCompromissos } from "../api/compromissos";
import type { Compromisso } from "../tipos/compromissos";

import useCalendarioSemanal from "../useCalendarioSemanal";

interface Props {
    locale?: string;
    dataSelecionada?: Date;
    semanaSelecionada?: Date;
    onDiaSelecionado?: (data: Date) => void;
    onSemanaSelecionada?: (data: Date) => void;

}

export default function CalendarioSemanal({
    locale = navigator.language,
    dataSelecionada = new Date(),
    semanaSelecionada = new Date(),
    onDiaSelecionado,
    onSemanaSelecionada
}: Props) {
    const { diasSemana, semana, inicioSemana, avancarSemana, voltarSemana } =
        useCalendarioSemanal(semanaSelecionada, locale);

    const [compromissos, setCompromissos] = useState<Compromisso[]>([]);

    useEffect(() => {
        listarCompromissos()
            .then((data) => setCompromissos(data))
            .catch(() => setCompromissos([]));
    }, []);

    const formatadorPeriodo = useMemo(() => {
        return new Intl.DateTimeFormat(locale, {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    }, [locale]);

    function temCompromisso(data: Date): boolean {
        return compromissos.some((c) => {
            const d = new Date(c.dataInicio);
            return (
                d.getFullYear() === data.getFullYear() &&
                d.getMonth() === data.getMonth() &&
                d.getDate() === data.getDate()
            );
        });
    }

    return (
        <div className="w-full min-w-[200px] p-4">
            {/* Header — mesmo do CalendarioMensal */}
            <div className="flex items-center justify-between mb-3">
                <button
                    className="px-3 py-2 rounded-2xl border border-gray-50 text-sm hover:bg-gray-100 transition"
                    onClick={()=> {
                        const nova = voltarSemana()
                        onSemanaSelecionada?.(nova)
                    }}
                >
                    ←
                </button>

                <div className="text-base font-semibold select-none text-center leading-tight">
                    {formatadorPeriodo.format(semana[0].data)} —{" "}
                    {formatadorPeriodo.format(semana[6].data)}
                </div>


                <button
                    className="px-3 py-2 rounded-2xl border border-gray-50 text-sm hover:bg-gray-100 transition"
                    onClick={() => {
                        const nova = avancarSemana();
                        onSemanaSelecionada?.(nova);
                    }}
                >
                    →
                </button>
            </div>

            {/* Grade dos dias — ocupa o mesmo espaço visual do título do CalendarioMensal */}
            <div className="flex flex-col gap-1 mt-1">
                {/* Nomes dos dias */}
                <div className="grid grid-cols-7 gap-1 text-xs text-gray-500 mb-1">
                    {diasSemana.map((nome) => (
                        <div key={nome} className="text-center font-medium">
                            {nome}
                        </div>
                    ))}
                </div>

                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={inicioSemana.toISOString()}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.15 }}
                            className="grid grid-cols-7 gap-1"
                        >
                            {semana.map(({ data, ehHoje }) => {
                                const selecionado =
                                    dataSelecionada &&
                                    dataSelecionada.toDateString() === data.toDateString();

                                const tem = temCompromisso(data);

                                const base =
                                    "aspect-square relative flex items-center justify-center rounded-2xl select-none";

                                let tons = "";
                                if (selecionado) {
                                    tons = "bg-blue-500/90 text-white";
                                } else if (ehHoje) {
                                    tons = "bg-blue-100 text-blue-700";
                                } else {
                                    tons = "bg-white";
                                }

                                const borda = selecionado
                                    ? "ring-2 ring-offset-1 ring-blue-400"
                                    : "";

                                return (
                                    <div
                                        key={data.toISOString()}
                                        onClick={() => onDiaSelecionado?.(data)}
                                        className={`${base} ${tons} ${borda}`}
                                    >
                                        {data.getDate()}

                                        {tem && (
                                            <span
                                                className={`absolute bottom-2 w-1.5 h-1.5 rounded-full ${selecionado
                                                        ? "bg-white/90"
                                                        : "bg-blue-400"
                                                    }`}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
