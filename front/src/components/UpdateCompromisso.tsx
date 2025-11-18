import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { buscarCompromissoPorId, editarCompromisso } from "../api/compromissos"; // Supondo que você tenha uma função de get
import type { Compromisso } from "../tipos/compromissos";

export default function UpdateCompromisso() {
  const { id } = useParams<{ id: string }>(); // Pega o ID da URL
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [categoria, setCategoria] = useState("");
  const [local, setLocal] = useState("");
  const [link, setLink] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    // Carregar os dados do compromisso quando o componente for montado
    const loadCompromisso = async () => {
      try {
        if (id) {
          const compromisso = await buscarCompromissoPorId(Number(id)); // Buscar compromisso pelo ID
          console.log(compromisso);
          setTitulo(compromisso.titulo);
          setDescricao(compromisso.descricao);
          setDataInicio(new Date(compromisso.dataInicio).toISOString().slice(0, 16));
          setDataFim(compromisso.dataFim ? new Date(compromisso.dataFim).toISOString().slice(0, 16) : "");
          setCategoria(compromisso.categoria);
          setLocal(compromisso.local);
          setLink(compromisso.link);
        }
      } catch (err) {
        console.error(err);
        setErro("Erro ao carregar compromisso.");
      }
    };

    loadCompromisso();
  }, [id]);

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
      const compromissoAtualizado: Partial<Compromisso> = {
        titulo,
        descricao,
        dataInicio: new Date(dataInicio),
        dataFim: dataFim ? new Date(dataFim) : undefined,
        categoria,
        local,
        link,
      };

      if (id) {
        await editarCompromisso(Number(id), compromissoAtualizado);
        navigate('/'); 
      }
    } catch (err) {
      console.error(err);
      setErro("Erro ao atualizar compromisso.");
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
          Compromisso
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
          Atualizar Compromisso
        </button>
      </form>
    </div>
  );
}
