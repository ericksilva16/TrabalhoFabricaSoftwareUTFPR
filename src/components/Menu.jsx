import React, { useState } from 'react';
import { MdOutlineFilterAlt } from 'react-icons/md';
import Card from './ui/Card';

export default function Menu() {
  const [abaAtiva, setAbaAtiva] = useState("universidade");

  const conteudos = {
    universidade: [
      { id: 1, setor: "Administrativo", titulo: "Secretaria Acadêmica", desc: "Responsável por matrículas, histórico escolar e documentos acadêmicos", local: "Prédio Central - Sala 101", tel: "(11) 1234-5678", mail: "secretaria@universidade.edu.br", horario: "08:00 - 17:00" },
    ],
    noticias: [],
    oportunidades: [],
    estagios: [],
    eventos: [],
  };

  const abas = [
    { key: "universidade", label: "Universidade" },
    { key: "noticias", label: "Notícias" },
    { key: "oportunidades", label: "Oportunidades" },
    { key: "estagios", label: "Estágios" },
    { key: "eventos", label: "Eventos" },
  ];

  return (
    <>
      <div className='w-[80%] flex flex-col items-center mx-auto mt-10'>
        <nav className="bg-gray-300 p-1 mt-5 w-full mx-auto rounded-2xl">
          <ul className="flex space-x-2">
            {abas.map(aba => (
              <li
                key={aba.key}
                className={`w-80 p-3 flex justify-center rounded-2xl cursor-pointer transition
                  ${abaAtiva === aba.key ? 'bg-white shadow font-semibold' : 'bg-transparent hover:bg-white/70 text-black'}`}
                onClick={() => setAbaAtiva(aba.key)}
              >
                <a className="text-black">{aba.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className='mr-auto mt-10 w-full'>
          <h2 className='text-2xl font-bold'>Informações da Universidade</h2>
          <div className='bg-gray-200 mt-5 rounded-lg w-[100%] p-3'>
            <input type="text" placeholder='Buscar por nome ou descrição' className='w-full outline-none' />
          </div>
          <button className='flex items-center gap-2 mt-5 px-4 py-2 bg-white border border-black/20 border-[1px] rounded-lg shadow hover:bg-gray-100 transition'>
            <MdOutlineFilterAlt size={20} />
            Filtros
          </button>
        </div>
      </div>

      <div className='w-[80%] flex flex-wrap gap-10 justify-center mx-auto mt-10 mb-20'>
        {conteudos[abaAtiva]?.map(item => (
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
        ))}
      </div>
    </>
  );
}