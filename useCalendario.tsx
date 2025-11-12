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
        const diasNoMes = fimDoMes.getDate()

        const formatadorDiaDaSemana = new Intl.DateTimeFormat(locale, {weekday: 'short'})

        let diasSemana = Array.from({length: 7}, (_,i)=> {
            const base = new Date(2021, 7, i+1);
            return formatadorDiaDaSemana.format(base);
        })

        const celulas = []

        // dias do mês anterior
        const indexPrimeiroDia = inicioMes.getDay();
        for (let i = indexPrimeiroDia; i>0; i--) {
            celulas.push({
                data: new Date(ano, mes, 1 - i),
                mesCorrente: false
            })
        }

        // dias do mês atual
        for (let i = 1; i < diasNoMes; i++) {
            celulas.push({
                data: new Date(ano, mes, i),
                mesCorrente: true
            })
        }

       // dias do próximo mês
       while(celulas.length < 42 /* 7 colunas * 6 linhas = 42 celulas totais */) {
            const ultimo: Date = celulas[celulas.length - 1].data
            const prox: Date= new Date(ultimo)
            prox.setDate(prox.getDate() + 1)

            celulas.push({
                data: prox,
                mesCorrente: false
            })

       }


        const isHoje = (date: Date) => {
            return (
                date.getFullYear() === agora.getFullYear() &&
                date.getMonth() === agora.getMonth() &&
                date.getDate() === agora.getDate()
            );
        }


        return {ano, mes, diasSemana, celulas, isHoje}
    }, [inicioMes])

    return {...data, inicioMes, avancarMes, voltarMes}
}

export default useCalendario;