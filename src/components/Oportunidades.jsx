import React from "react";
import Card from "./ui/Card"; 

export default function Oportunidades() {
  const oportunidades = [
  {
    id: 1,
    setor: "Pesquisa", 
    tel: "N/A", 
    mail: "contato@ic.br",

    titulo: "Bolsa de Iniciação Científica",
    desc: "Projeto de pesquisa em Inteligência Artificial para estudantes de graduação.",
    local: "Laboratório de Computação",
    horario: "Inscrições até 20/10/2025", 
  },
  {
    id: 2,
    setor: "Internacional",
    tel: "N/A",
    mail: "relacoes@uni.br",
    titulo: "Programa de Mobilidade Acadêmica",
    desc: "Intercâmbio em universidades parceiras no exterior, focado em Engenharias.",
    local: "Coordenação de Relações Internacionais",
    horario: "Inscrições até 15/11/2025",
  },
  ];

  return (
    <>
    {oportunidades.map((item) => (
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
  </>
  );
}