import { useCallback, useState, useMemo } from "react";

function useCalendario(date: Date, locale: string) {
    const [inicioMes, setInicioMes] = useState(
        new Date(date.getFullYear(), date.getMonth(), 1)
    )

    const avancarMes = useCallback(() => {
        setInicioMes((date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 1))
    }, [])

    const voltarMes = useCallback(() => {
        setInicioMes((date: Date) => new Date(date.getFullYear(), date.getMonth() - 1, 1))
    }, [])

    const data = useMemo(() => {
        const agora = new Date();
        const ano = inicioMes.getFullYear()
        const mes = inicioMes.getMonth()

        const fimDoMes = new Date(inicioMes.getFullYear(), inicioMes.getMonth() + 1, 0)
        const diasDoMes = fimDoMes.getDate()

        const formatadorDiaDaSemana = new Intl.DateTimeFormat(locale, {weekday: 'short'})

        let diasSemana = Array.from({length: 7}, (_,i)=> {
            const base = new Date(2021, 7, i+1);
            return formatadorDiaDaSemana.format(base);
        })

        console.log(diasSemana)

        return {}
    }, [inicioMes])

    return {...data, inicioMes, avancarMes, voltarMes}
}

export default useCalendario;