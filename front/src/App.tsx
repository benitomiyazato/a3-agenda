import { useState } from "react";
import { Link } from "react-router-dom";

import CalendarioMensal from "./components/CalendarioMensal";
import CalendarioSemanal from "./components/CalendarioSemanal";
import Compromissos from "./components/Compromissos";
import HeaderAgenda from "./components/HeaderAgenda";

function App() {
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [modo, setModo] = useState<"mensal" | "semanal">("mensal");

  const alternarModo = () => {
    setModo((prev) => (prev === "mensal" ? "semanal" : "mensal"));
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="h-screen flex flex-col">
        <HeaderAgenda modo={modo} alternarModo={alternarModo} />

        <div className="flex-1 flex flex-col overflow-hidden">
          {modo === "mensal" ? (
            <>
              <div className="border-b border-gray-200">
                <CalendarioMensal
                  onDiaSelecionado={setDataSelecionada}
                  dataSelecionada={dataSelecionada}
                />
              </div>
              <div className="flex-1 overflow-y-auto">
                <Compromissos dataSelecionada={dataSelecionada} />
              </div>
            </>
          ) : (
            <div className="border-b border-gray-200">
              <CalendarioSemanal
                onDiaSelecionado={setDataSelecionada}
                dataSelecionada={dataSelecionada}
              />
            </div>
          )}
        </div>


        <div className="w-full my-3 h-[5%] px-2">
          <Link
            to="/cadastroCompromisso"
            className="block w-full text-center px-3 py-1.5 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition shadow-sm"
            state={{ dataSelecionada }}
          >
            + Adicionar Compromisso
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
