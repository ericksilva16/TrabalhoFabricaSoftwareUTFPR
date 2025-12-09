import React, { useState, useMemo } from "react";
import { MdOutlineFilterAlt } from "react-icons/md";
import Card from "./ui/Card.jsx"; 
import Noticias from "./Noticias.jsx"; 
import Estagios from "./Estagios.jsx";
import Oportunidades from "./Oportunidades.jsx";
import MinhasInscricoes from "./MinhasInscricoes.jsx";
import { isAluno } from "../utils/auth";

const conteudos = {
  universidade: [
    {
      id: 1,
      setor: "Administrativa",
      titulo: "Secretaria Acadêmica",
      desc: "Responsável por matrículas, histórico escolar e documentos acadêmicos",
      local: "Prédio Central - Sala 101",
      tel: "(11) 1234-5678",
      mail: "secretaria@universidade.edu.br",
      horario: "08:00 - 17:00",
    },
    {
      id: 2,
      setor: "Serviços",
      titulo: "Sistema de Bibliotecas",
      desc: "Empréstimo de livros, consulta ao acervo e salas de estudo.",
      local: "Prédio da Biblioteca",
      tel: "(11) 1234-5679",
      mail: "biblioteca@universidade.edu.br",
      horario: "07:30 - 22:00",
    },
    {
      id: 3,
      setor: "Acadêmica",
      titulo: "Coordenação de TCC",
      desc: "Normas e orientações para o Trabalho de Conclusão de Curso.",
      local: "Bloco D - Sala 205",
      tel: "(11) 1234-5680",
      mail: "tcc@universidade.edu.br",
      horario: "09:00 - 18:00",
    },
  ],
  noticias: [], 
  oportunidades: [
    {
      id: 1,
      setor: "Pesquisa",
      tel: "N/A",
      mail: "contato@ic.br",
      titulo: "Bolsa de Iniciação Científica",
      desc: "Projeto de pesquisa em Inteligência Artificial para estudantes de graduação.",
      local: "Departamento de Ciência da Computação",
      horario: "Inscrições até 20/10/2025",
    },
    {
      id: 2,
      setor: "Intercâmbio",
      tel: "N/A",
      mail: "relacoes@uni.br",
      titulo: "Programa de Mobilidade Acadêmica",
      desc: "Intercâmbio em universidades parceiras no exterior, focado em Engenharias.",
      local: "Assessoria Internacional",
      horario: "Inscrições até 15/11/2025",
    },
    {
      id: 3,
      setor: "Extensão",
      tel: "(11) 98765-4321",
      mail: "cursinho@uni.br",
      titulo: "Voluntariado Cursinho Popular",
      desc: "Vagas para voluntários (professores e monitores) no cursinho pré-vestibular.",
      local: "Faculdade de Educação",
      horario: "Início em 01/02/2026",
    },
  ],
  estagios: [
    {
      id: 1,
      setor: "Desenvolvimento Web",
      titulo: "Estágio Front-end React",
      desc: "Oportunidade de estágio para atuar com desenvolvimento de interfaces em React, focando em usabilidade e performance.",
      local: "São Paulo - SP",
      tel: "(46) 99887-7665",
      mail: "recrutamento@techsolutions.com",
      horario: "Híbrido",
    },
    {
      id: 2,
      setor: "Marketing Digital",
      titulo: "Estágio em Mídias Sociais",
      desc: "Suporte na criação de conteúdo, agendamento de posts e análise de métricas nas principais redes sociais.",
      local: "Curitiba - PR",
      tel: "(46) 3555-4444",
      mail: "vagas@agenciacriativa.com",
      horario: "Remoto",
    },
    {
      id: 3,
      setor: "Dados",
      titulo: "Estágio em Análise de Dados",
      desc: "Apoio na coleta, tratamento e visualização de dados para tomada de decisão.",
      local: "Rio de Janeiro - RJ",
      tel: "(21) 99999-8888",
      mail: "rh@datafuture.com",
      horario: "Presencial",
    },
  ],
  eventos: [
    {
      id: 1,
      setor: "Acadêmico",
      titulo: "Semana Acadêmica de Engenharia",
      desc: "Palestras e workshops sobre as inovações em diversas áreas da engenharia e tecnologia.",
      local: "Auditório Central",
      tel: "N/A",
      mail: "contato@semanaengenharia.com",
      horario: "Novembro",
    },
    {
      id: 2,
      setor: "Extensão",
      titulo: "Introdução ao Desenvolvimento Mobile",
      desc: "Workshop prático focado nos fundamentos do desenvolvimento de aplicativos nativos (Android/iOS).",
      local: "Sala de Treinamento 305",
      tel: "N/A",
      mail: "organizacao@workshopmobile.com",
      horario: "Março",
    },
    {
      id: 3,
      setor: "Cultural",
      titulo: "Festival de Bandas da Universidade",
      desc: "Apresentação de bandas formadas por alunos da instituição. Aberto ao público.",
      local: "Concha Acústica",
      tel: "N/A",
      mail: "cultura@uni.br",
      horario: "Maio",
    },
  ],
};

const FILTER_MAPPING = {
  universidade: {
    categoria: "setor",
    departamento: "titulo", 
  },
  noticias: {},
  oportunidades: {
    tipo: "setor", 
    departamento: "local", 
  },
  estagios: {
    localizacao: "local",
    modalidade: "horario", 
  },
  eventos: {
    tipo: "setor",
    periodo: "horario", 
  },
};

export default function Menu() {
  const [abaAtiva, setAbaAtiva] = useState("universidade");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState({});
  const [noticiaSelecionada, setNoticiaSelecionada] = useState(null);

  const filtrosPorAba = {
    universidade: {
      categoria: ["Institucional", "Acadêmica", "Administrativa", "Serviços"],
      departamento: [
        "Secretaria Acadêmica",
        "Sistema de Bibliotecas",
        "Coordenação de TCC",
      ],
    },
    noticias: {
    },
    oportunidades: {
      tipo: ["Bolsa", "Pesquisa", "Extensão", "Monitoria", "Intercâmbio"],
      departamento: [
        "Departamento de Ciência da Computação",
        "Assessoria Internacional",
        "Faculdade de Educação",
      ],
    },
    estagios: {
      localizacao: [
        "São Paulo - SP",
        "Rio de Janeiro - RJ",
        "Curitiba - PR",
      ],
      modalidade: ["Presencial", "Remoto", "Híbrido"],
    },
    eventos: {
      tipo: ["Acadêmico", "Cultural", "Esportivo", "Extensão", "Pesquisa"],
      periodo: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Novembro"],
    },
  };

  const abasBase = [
    { key: "universidade", label: "Universidade" },
    { key: "noticias", label: "Notícias" },
    { key: "oportunidades", label: "Oportunidades" },
    { key: "estagios", label: "Estágios" },
  ];
  const abas = isAluno()
    ? [...abasBase, { key: "minhas", label: "Minhas Inscrições" }]
    : abasBase;

  const handleFilterClick = (group, option) => {
    setActiveFilters((prevFilters) => {
      const currentFilter = prevFilters[group];
      return {
        ...prevFilters,
        [group]: currentFilter === option ? null : option,
      };
    });
  };

  const handleNoticiaSelecionada = (noticia) => {
    if (noticia?.linkUrl && noticia.linkUrl.trim() !== '') {
      // Se tem link externo válido, abre em nova aba
      window.open(noticia.linkUrl, '_blank');
    } else {
      // Caso contrário, salva como selecionada
      setNoticiaSelecionada(noticia);
    }
  };
  // Limpa filtros ao trocar de aba
  const handleAbaClick = (abaKey) => {
    setAbaAtiva(abaKey);
    setSearchTerm("");
    setActiveFilters({});
  }

  const filteredContent = useMemo(() => {
    const currentData = conteudos[abaAtiva] || [];

    const dataAfterSearch = currentData.filter((item) => {
      const term = searchTerm.toLowerCase();
      return (
        item.titulo.toLowerCase().includes(term) ||
        item.desc.toLowerCase().includes(term)
      );
    });

    const dataAfterFilters = dataAfterSearch.filter((item) => {
      return Object.entries(activeFilters).every(([group, value]) => {
        if (!value) return true;

        const fieldName = FILTER_MAPPING[abaAtiva][group];
        if (!fieldName) return true; 

        return item[fieldName]?.toLowerCase().includes(value.toLowerCase());
      });
    });

    return dataAfterFilters;
  }, [abaAtiva, searchTerm, activeFilters]);

  const renderFiltros = () => {
    const filtros = filtrosPorAba[abaAtiva];
    if (!filtros || Object.keys(filtros).length === 0) return null;

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
                {opcoes.map((opt) => {
                  const isActive = activeFilters[grupo] === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => handleFilterClick(grupo, opt)}
                      className={`px-3 py-1 text-sm rounded-full transition border
                        ${
                          isActive
                            ? "bg-blue-800 text-white border-blue-800"
                            : "bg-white border-gray-300 hover:bg-gray-200"
                        }
                      `}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] flex flex-col items-center mx-auto mt-10">
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
              onClick={() => handleAbaClick(aba.key)} 
            >
              {aba.label}
            </li>
          ))}
        </ul>
      </nav>

      <div className="mr-auto mt-10 w-full">
        <h2 className="text-2xl font-bold">
          {abas.find((a) => a.key === abaAtiva)?.label}
        </h2>
        
        {abaAtiva !== 'noticias' && abaAtiva !== 'estagios' && abaAtiva !== 'oportunidades' && abaAtiva !== 'minhas' && (
          <>
            <div className="bg-gray-200 mt-5 rounded-lg w-full p-3">
              <input
                type="text"
                placeholder="Buscar por nome ou descrição"
                className="w-full outline-none bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {renderFiltros()}
          </>
        )}
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center mt-10 mb-20">
        {abaAtiva === "noticias" ? (
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <Noticias onNoticiaSelecionada={handleNoticiaSelecionada} />
          </div>
        ) : abaAtiva === "estagios" ? (
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <Estagios />
          </div>
        ) : abaAtiva === "oportunidades" ? (
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <Oportunidades />
          </div>
        ) : abaAtiva === "minhas" ? (
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <MinhasInscricoes />
          </div>
        ) : (
          filteredContent.map((item) => (
            <Card
              key={item.id}
              setor={item.setor}
              titulo={item.titulo}
              desc={item.desc}
              local={item.local}
              tel={item.tel}
              mail={item.mail}
              horario={item.horario}
            />
          ))
        )}
        
        {abaAtiva !== 'noticias' && abaAtiva !== 'estagios' && abaAtiva !== 'oportunidades' && abaAtiva !== 'minhas' && filteredContent.length === 0 && (
           <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-gray-500 mt-10">
             <p>Nenhum resultado encontrado para os filtros aplicados.</p>
           </div>
        )}
      </div>
    </div>
  );
}



