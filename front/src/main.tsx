// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import './index.css'
import App from "./App";
import CadastroCompromisso from "./components/CadastroCompromisso";
import UpdateCompromisso from "./components/UpdateCompromisso";
// import CadastroCompromisso from "./components/CadastroCompromisso"; // cria este componente

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cadastroCompromisso" element={<CadastroCompromisso />} />
        <Route path="/updateCompromisso/:id" element={<UpdateCompromisso />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
