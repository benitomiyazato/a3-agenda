import { useState } from "react"
import Calendario from "./components/Calendario"
import Compromissos from "./components/Compromissos"

function App() {

  const [dataSelecionada, setDataSelecionada] = useState(new Date());

  return (
    <>
     <div className='max-w-md mx-auto'>
        <div className="h-screen flex flex-col">
        <div className="h-[60%] border-b border-gray-200 overflow-hidden">
            <Calendario
              onDiaSelecionado= {setDataSelecionada} 
              dataSelecionada = {dataSelecionada}
            />
        </div>
        <div className="h-[40%] overflow-y-auto">
            <Compromissos dataSelecionada={dataSelecionada}/>
        </div>
    </div>
     </div>

    </>
  )
}

export default App
