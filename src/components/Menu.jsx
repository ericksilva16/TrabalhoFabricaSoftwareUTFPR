import React, { useState } from "react";
import { MdOutlineFilterAlt } from "react-icons/md";
import Universidade from "./Universidade";
import Noticias from "./Noticias";
import Oportunidades from "./Oportunidades";
import Estagios from "./Estagios";
import Eventos from "./Eventos";

export default function Menu() {
  const [abaAtiva, setAbaAtiva] = useState("universidade");

  // opções de filtros específicas por aba
  const filtrosPorAba = {
    universidade: {
      categoria: ["Institucional", "Acadêmica", "Administrativa", "Serviços"],
      departamento: [
        "Pró-Reitoria de Graduação",
        "Secretaria Acadêmica",
        "Sistema de Bibliotecas",
        "Coordenação de TCC",
        "Divisão de Assuntos Estudantis",
        "Conselho Universitário",
      ],
    },
    noticias: {
      categoria: ["Institucional", "Acadêmica", "Pesquisa", "Extensão", "Eventos"],
    },
    oportunidades: {
      tipo: ["Bolsa", "Pesquisa", "Extensão", "Monitoria", "Intercâmbio"],
      departamento: [
        "Departamento de Biotecnologia",
        "Departamento de Matemática",
        "Assessoria Internacional",
        "Faculdade de Educação",
        "Programa de Pós-Graduação em Computação",
        "Departamento de Ciência da Computação",
      ],
    },
    estagios: {
      localizacao: [
        "São Paulo - SP",
        "Rio de Janeiro - RJ",
        "Belo Horizonte - MG",
        "Curitiba - PR",
        "Porto Alegre - RS",
        "Brasília - DF",
      ],
      modalidade: ["Presencial", "Remoto", "Híbrido"],
    },
    eventos: {
      tipo: ["Acadêmico", "Cultural", "Esportivo", "Extensão", "Pesquisa"],
      periodo: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
    },
  };

  const abas = [
    { key: "universidade", label: "Universidade" },
    { key: "noticias", label: "Notícias" },
    { key: "oportunidades", label: "Oportunidades" },
    { key: "estagios", label: "Estágios" },
    { key: "eventos", label: "Eventos" },
  ];

  // conteúdo de exemplo
  const conteudos = {
    universidade: [
      {
        id: 1,
        setor: "Administrativo",
        titulo: "Secretaria Acadêmica",
        desc: "Responsável por matrículas, histórico escolar e documentos acadêmicos",
        local: "Prédio Central - Sala 101",
        tel: "(11) 1234-5678",
        mail: "secretaria@universidade.edu.br",
        horario: "08:00 - 17:00",
      },
    ],
  };

  // renderiza os filtros de acordo com a aba
  const renderFiltros = () => {
    const filtros = filtrosPorAba[abaAtiva];
    if (!filtros) return null;

    return (
      <div className="bg-gray-100 p-4 rounded-2xl shadow w-full mt-5">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <MdOutlineFilterAlt /> Filtros
        </h3>
        <div className="space-y-3">
          {Object.entries(filtros).map(([grupo, opcoes]) => (
            <div key={grupo}>
              <p className="text-sm font-medium capitalize mb-1">{grupo}</p>
              <div className="flex flex-wrap gap-2">
                {opcoes.map((opt) => (
                  <button
                    key={opt}
                    className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-full hover:bg-gray-200 transition"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-[80%] flex flex-col items-center mx-auto mt-10">
      {/* NAV */}
      <nav className="bg-gray-300 p-1 mt-5 w-full mx-auto rounded-2xl">
        <ul className="flex space-x-2">
          {abas.map((aba) => (
            <li
              key={aba.key}
              className={`w-[25%] p-3 flex justify-center rounded-2xl cursor-pointer transition ${
                abaAtiva === aba.key
                  ? "bg-white shadow font-semibold"
                  : "bg-transparent hover:bg-white/70 text-black"
              }`}
              onClick={() => setAbaAtiva(aba.key)}
            >
              {aba.label}
            </li>
          ))}
        </ul>
      </nav>

      {/* BUSCA */}
      <div className="mr-auto mt-10 w-full">
        <h2 className="text-2xl font-bold">{abas.find((a) => a.key === abaAtiva)?.label}</h2>
        <div className="bg-gray-200 mt-5 rounded-lg w-full p-3">
          <input
            type="text"
            placeholder="Buscar por nome ou descrição"
            className="w-full outline-none bg-transparent"
          />
        </div>

        {/* FILTROS ABERTOS */}
        {renderFiltros()}
      </div>

      {/* CONTEÚDO */}
      <div className="w-full flex flex-wrap justify-center mt-10 mb-20">
        {abaAtiva === "universidade" &&
          conteudos.universidade.map((item) => <Universidade key={item.id} item={item} />)}
        {abaAtiva === "noticias" && <Noticias />}
        {abaAtiva === "oportunidades" && <Oportunidades />}
        {abaAtiva === "estagios" && <Estagios />}
        {abaAtiva === "eventos" && <Eventos />}
      </div>
    </div>
  );
}
