import { useCallback, useMemo, useState } from "react";

function useCalendarioSemanal(date: Date, locale: string) {
    function getInicioDaSemana(d: Date) {
        const dia = d.getDay();
        const inicio = new Date(d);

        inicio.setDate(d.getDate() - dia);
        inicio.setHours(0, 0, 0, 0);

        return inicio;
    }

    const [inicioSemana, setInicioSemana] = useState(() => getInicioDaSemana(date));

    const avancarSemana = useCallback(() => {
        setInicioSemana((prev) => {
            const nova = new Date(prev);
            nova.setDate(nova.getDate() + 7);
            return getInicioDaSemana(nova);
        });
    }, []);

    const voltarSemana = useCallback(() => {
        setInicioSemana((prev) => {
            const nova = new Date(prev);
            nova.setDate(nova.getDate() - 7);
            return getInicioDaSemana(nova);
        });
    }, []);

    const data = useMemo(() => {
        const agora = new Date();
        const formatadorDiaDaSemana = new Intl.DateTimeFormat(locale, { weekday: "short" });

        const diasSemana = Array.from({ length: 7 }, (_, i) => {
            const d = new Date(2021, 7, i + 1); // igual ao hook mensal
            return formatadorDiaDaSemana.format(d);
        });

        const semana = Array.from({ length: 7 }, (_, i) => {
            const d = new Date(inicioSemana);
            d.setDate(inicioSemana.getDate() + i);

            return {
                data: d,
                ehHoje:
                    d.getFullYear() === agora.getFullYear() &&
                    d.getMonth() === agora.getMonth() &&
                    d.getDate() === agora.getDate(),
            };
        });

        return { diasSemana, semana };
    }, [inicioSemana, locale]);

    return {
        inicioSemana,
        ...data,
        avancarSemana,
        voltarSemana,
    };
}

export default useCalendarioSemanal;
