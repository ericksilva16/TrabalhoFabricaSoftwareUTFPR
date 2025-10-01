import React, { useState } from 'react';
import { MdOutlineFilterAlt } from 'react-icons/md';
import Card from './ui/Card';
import Universidade from './Universidade';
import Noticias from './Noticias';
import Oportunidades from './Oportunidades';
import Estagios from './Estagios';
import Eventos from './Eventos';


export default function Menu() {
  const [abaAtiva, setAbaAtiva] = useState("universidade");

  const abas = [
    { key: "universidade", label: "Universidade" },
    { key: "noticias", label: "Notícias" },
    { key: "oportunidades", label: "Oportunidades" },
    { key: "estagios", label: "Estágios" },
    { key: "eventos", label: "Eventos" },
  ];

  // os conteúdos dos cards ficam aqui
  const conteudos = {
    universidade: [
      { id: 1, setor: "Administrativo", titulo: "Secretaria Acadêmica", desc: "Responsável por matrículas, histórico escolar e documentos acadêmicos", local: "Prédio Central - Sala 101", tel: "(11) 1234-5678", mail: "secretaria@universidade.edu.br", horario: "08:00 - 17:00" },
      { id: 2, setor: "Biblioteca", titulo: "Biblioteca Central", desc: "Empréstimo de livros e acesso a materiais de estudo", local: "Prédio Central - Sala 201", tel: "(11) 2345-6789", mail: "biblioteca@universidade.edu.br", horario: "08:00 - 20:00" },
      { id: 3, setor: "Biblioteca", titulo: "Biblioteca Central", desc: "Empréstimo de livros e acesso a materiais de estudo", local: "Prédio Central - Sala 201", tel: "(11) 2345-6789", mail: "biblioteca@universidade.edu.br", horario: "08:00 - 20:00" },
      { id: 4, setor: "Biblioteca", titulo: "Biblioteca Central", desc: "Empréstimo de livros e acesso a materiais de estudo", local: "Prédio Central - Sala 201", tel: "(11) 2345-6789", mail: "biblioteca@universidade.edu.br", horario: "08:00 - 20:00" },
      { id: 5, setor: "Biblioteca", titulo: "Biblioteca Central", desc: "Empréstimo de livros e acesso a materiais de estudo", local: "Prédio Central - Sala 201", tel: "(11) 2345-6789", mail: "biblioteca@universidade.edu.br", horario: "08:00 - 20:00" },
      { id: 6, setor: "Biblioteca", titulo: "Biblioteca Central", desc: "Empréstimo de livros e acesso a materiais de estudo", local: "Prédio Central - Sala 201", tel: "(11) 2345-6789", mail: "biblioteca@universidade.edu.br", horario: "08:00 - 20:00" },
      { id: 7, setor: "Biblioteca", titulo: "Biblioteca Central", desc: "Empréstimo de livros e acesso a materiais de estudo", local: "Prédio Central - Sala 201", tel: "(11) 2345-6789", mail: "biblioteca@universidade.edu.br", horario: "08:00 - 20:00" },
      { id: 7, setor: "Biblioteca", titulo: "Biblioteca Central", desc: "Empréstimo de livros e acesso a materiais de estudo", local: "Prédio Central - Sala 201", tel: "(11) 2345-6789", mail: "biblioteca@universidade.edu.br", horario: "08:00 - 20:00" }
    ],
    noticias: [],
    oportunidades: [],
    estagios: [],
    eventos: [],
  };

  return (
    <>
      <div className='w-[80%] flex flex-col items-center mx-auto mt-10'>
        <nav className="bg-gray-300 p-1 mt-5 w-full mx-auto rounded-2xl">
          <ul className="flex space-x-2">
            {abas.map(aba => (
              <li
                key={aba.key}
                className={`w-[25%] p-3 flex justify-center rounded-2xl cursor-pointer transition
                  ${abaAtiva === aba.key ? 'bg-white shadow font-semibold' : 'bg-transparent hover:bg-white/70 text-black'}`}
                onClick={() => setAbaAtiva(aba.key)}
              >
                <a className="text-black">{aba.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className='mr-auto mt-10 w-full'>
          <h2 className='text-2xl font-bold'>{abas.find(a => a.key === abaAtiva)?.label}</h2>
          <div className='bg-gray-200 mt-5 rounded-lg w-[100%] p-3'>
            <input type="text" placeholder='Buscar por nome ou descrição' className='w-full outline-none' />
          </div>
          <button className='flex items-center gap-2 mt-5 px-4 py-2 bg-white border border-black/20 border-[1px] rounded-lg shadow hover:bg-gray-100 transition'>
            <MdOutlineFilterAlt size={20} />
            Filtros
          </button>
        </div>
      </div>

      <div className='w-[80%] flex flex-wrap justify-center mx-auto mt-10 mb-20'>
        {conteudos[abaAtiva]?.map(item => (
          <Universidade key={item.id} item={item} />
        ))}

        {abaAtiva === "noticias" && <Noticias />}
      {abaAtiva === "oportunidades" && <Oportunidades />}
      {abaAtiva === "estagios" && <Estagios />}
      {abaAtiva === "eventos" && <Eventos/>}
      
      </div>

      
      
    </>
  );
}