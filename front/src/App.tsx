import { useState } from "react"
import { Link } from "react-router-dom";

import Calendario from "./components/Calendario"
import Compromissos from "./components/Compromissos"

function App() {

  const [dataSelecionada, setDataSelecionada] = useState(new Date());

  return (
    <>
      <div className='max-w-md mx-auto'>
        <div className="h-screen flex flex-col">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Agenda
          </h1>
          <div className="h-[60%] border-b border-gray-200 overflow-hidden">
            <Calendario
              onDiaSelecionado={setDataSelecionada}
              dataSelecionada={dataSelecionada}
            />
          </div>

          <div className="w-full my-3 h-[5%]">
            <Link
              to="/cadastroCompromisso"
              className="block w-full text-center px-3 py-1.5 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition shadow-sm"
            >
              + Adicionar Compromisso
            </Link>
          </div>

          <div className="h-[30%] overflow-y-auto">
            <Compromissos dataSelecionada={dataSelecionada} />
          </div>
        </div>
      </div>

    </>
  )
}

export default App
