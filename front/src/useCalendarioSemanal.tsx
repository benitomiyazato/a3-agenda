import { useCallback } from "react";

function getInicioDaSemana(d: Date) {
    const dia = d.getDay();
    const inicio = new Date(d);

    inicio.setDate(d.getDate() - dia);
    inicio.setHours(0, 0, 0, 0);

    return inicio;
}

export default function useCalendarioSemanal(date: Date, locale: string) {
    const inicioSemana = getInicioDaSemana(date);

    const avancarSemana = useCallback(() => {
        const nova = new Date(inicioSemana);
        nova.setDate(nova.getDate() + 7);
        return nova;
    }, [inicioSemana]);

    const voltarSemana = useCallback(() => {
        const nova = new Date(inicioSemana);
        nova.setDate(nova.getDate() - 7);
        return nova;
    }, [inicioSemana]);


    const formatadorDiaDaSemana = new Intl.DateTimeFormat(locale, { weekday: "short" });

    const diasSemana = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(2021, 7, i + 1);
        return formatadorDiaDaSemana.format(d);
    });


    const agora = new Date();
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

    return {
        inicioSemana,
        diasSemana,
        semana,
        avancarSemana,
        voltarSemana
    };
}
