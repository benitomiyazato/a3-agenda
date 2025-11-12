import { useMemo } from "react";
import useCalendario from "./useCalendario"
import { AnimatePresence, motion } from "motion/react";

const Calendario: React.FC<{locale?: string}> = ({locale = navigator.language}) => {
    const {ano, mes, diasSemana, celulas, isHoje, inicioMes, avancarMes, voltarMes} = useCalendario(new Date(), locale);

    const formatadorMes = useMemo(() => {
        return new Intl.DateTimeFormat(locale, {month: 'long', year: 'numeric'})
    }, [locale])
    
    return <>
         <div className="w-full min-w-[200px] p-4">
            <div className="flex items-center justify-between mb-3">
                <button
                    className="px-3 py-2 rounded-2xl border border-gray-50 text-sm hover:bg-gray-100 transition"
                    onClick={voltarMes}
                >
                    ← Prev
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
                        initial={{opacity: 0, y: 8}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -8}}
                        transition={{ duration: 0.15}}
                        className="grid grid-cols-7 gap-1"
                    >
                        {celulas.map(({data, mesCorrente}) => {
                            const celulaHoje = isHoje(data);
                            let base = 'aspect-square relative flex items-center justify-center rounded-2xl select-none';
                            base += celulaHoje ? '' : 'hover:bg-gray-100';
                            const tons = mesCorrente ? 'bg-white' : 'bg-gray-100 opacity-70'
                            const bordaHoje = celulaHoje ? 'ring-2 ring-offset-1 ring-blue-400' : '';

                            return <div 
                                key={data.toISOString()}
                                className={`${base} ${tons} ${bordaHoje}`}
                                title={data.toDateString()}
                                >
                                    <span className={celulaHoje ? 'font-bold' : ''}>
                                        {data.getDate()}
                                    </span>

                                    {celulaHoje && (
                                        <span className="absolute -top-1.5 right-1.5 text-[10px] px-1 py-0.5 rounded-md bg-blue-400/80 text-white">
                                            Hoje
                                        </span>
                                    )}
                            </div>
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    </>
}

export default Calendario