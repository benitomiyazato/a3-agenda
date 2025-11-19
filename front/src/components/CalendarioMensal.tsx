import { useMemo, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { listarCompromissos } from "../api/compromissos";
import type { Compromisso } from "../tipos/compromissos";

import useCalendario from "../useCalendarioMensal"

interface CalendarioProps {
    locale?: string;
    onDiaSelecionado?: (data: Date) => void
    dataSelecionada?: Date
}

export default function CalendarioMensal({ locale = navigator.language, onDiaSelecionado, dataSelecionada = new Date() }: CalendarioProps) {
    const { ano, mes, diasSemana, celulas, inicioMes, avancarMes, voltarMes } = useCalendario(new Date(), locale);
    const [compromissos, setCompromissos] = useState<Compromisso[]>([]);

    useEffect(() => {
        listarCompromissos()
            .then((data) => setCompromissos(data))
            .catch((err) => {
                console.error("Erro ao carregar compromissos:", err);
                setCompromissos([]);
            });
    }, []);

    function temCompromisso(data: Date): boolean {
        return compromissos.some(c => {
            const dataC = new Date(c.dataInicio);
            return (
                dataC.getDate() === data.getDate() &&
                dataC.getMonth() === data.getMonth() &&
                dataC.getFullYear() === data.getFullYear()
            );
        });
    }



    const formatadorMes = useMemo(() => {
        return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' })
    }, [locale])

    return <>
        <div className="w-full min-w-[200px] p-4">
            <div className="flex items-center justify-between mb-3">
                <button
                    className="px-3 py-2 rounded-2xl border border-gray-50 text-sm hover:bg-gray-100 transition"
                    onClick={voltarMes}
                >
                    ← Anterior
                </button>

                <div className="text-lg font-semibold select-none">
                    {formatadorMes.format(new Date(ano, mes, 1))}
                </div>

                <button
                    className="px-3 py-2 rounded-2xl border border-gray-50 text-sm hover:bg-gray-100 transition"
                    onClick={avancarMes}
                >
                    Próximo →
                </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-xs text-gray-500 mb-1">
                {diasSemana.map(nomeDoDia => (
                    <div key={nomeDoDia} className="text-center font-medium py-1">
                        {nomeDoDia}
                    </div>
                ))}
            </div>

            <div className="relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${inicioMes.getFullYear()}-${inicioMes.getMonth()}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="grid grid-cols-7 gap-1"
                    >
                        {celulas.map(({ data, mesCorrente }) => {
                            const celulaSelecionada =
                                data.getDate() === dataSelecionada.getDate() &&
                                data.getMonth() === dataSelecionada.getMonth() &&
                                data.getFullYear() === dataSelecionada.getFullYear()


                            const base = 'aspect-square relative flex items-center justify-center rounded-2xl select-none';
                            let tons = '';
                            if (celulaSelecionada) {
                                tons = 'bg-blue-500/90 text-white'; 
                            } else {
                                tons = mesCorrente ? 'bg-white' : 'bg-gray-100 opacity-35';
                            }

                            const bordaSelecionada = celulaSelecionada ? 'ring-2 ring-offset-1 ring-blue-400' : '';
                            const temCompromissoFlag = temCompromisso(data)

                            return <div
                                key={data.toISOString()}
                                onClick={() => onDiaSelecionado?.(data)}
                                className={`${base} ${tons} ${bordaSelecionada} flex-col`}
                                title={data.toDateString()}
                            >
                                <span className={celulaSelecionada ? 'font-bold' : ''}>
                                    {data.getDate()}
                                </span>

                                {temCompromissoFlag && (
                                    <span className={
                                        `absolute bottom-2 w-1.5 h-1.5 rounded-full
                                            ${celulaSelecionada ? 'bg-white/90' : 'bg-blue-400'}`
                                    }></span>
                                )}
                            </div>
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    </>
}