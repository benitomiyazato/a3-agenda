import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adicionarCompromisso } from "../api/compromissos";
import type { Compromisso } from "../tipos/compromissos";

export default function CadastroCompromisso() {
    const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [categoria, setCategoria] = useState("");
  const [local, setLocal] = useState("");
  const [link, setLink] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!titulo.trim()) {
      setErro("O título é obrigatório.");
      return;
    }

    if (!dataInicio) {
      setErro("A data/hora de início é obrigatória.");
      return;
    }

    try {
      const novoCompromisso: Omit<Compromisso, "id"> = {
        titulo,
        descricao,
        data: new Date(dataInicio),
        categoria,
        local,
        link,
      };

      await adicionarCompromisso(novoCompromisso);
      setTitulo("");
      setDescricao("");
      setDataInicio("");
      setDataFim("");
      setCategoria("");
      setLocal("");
      setLink("");
      setErro("");

      navigate("/");
    } catch (err) {
      console.error(err);
      setErro("Erro ao salvar compromisso.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="relative mb-4 h-10 flex items-center">
        <Link
            to="/"
            className="absolute left-0 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-300 transition text-gray-700"
        >
            ←
        </Link>

        <h1 className="w-full text-center text-2xl font-bold text-gray-800">
            Novo Compromisso
        </h1>
        </div>

      {erro && (
        <div className="bg-red-100 text-red-700 p-2 mb-3 rounded">{erro}</div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <label className="block mb-1 font-medium">Título *</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Data/Hora Início *</label>
          <input
            type="datetime-local"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Data/Hora Fim</label>
          <input
            type="datetime-local"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Categoria</label>
          <input
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Local</label>
          <input
            type="text"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Link</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-3 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition shadow-sm"
        >
          Salvar Compromisso
        </button>
      </form>
    </div>
  );
}
