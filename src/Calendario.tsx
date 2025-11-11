import useCalendario from "./useCalendario"

const Calendario: React.FC<{locale?: string}> = ({locale = navigator.language}) => {
    const {inicioMes, avancarMes, voltarMes} = useCalendario(new Date(), locale);
    console.log()
    return <>
        Calendar
    </>
}

export default Calendario