import React from "react";
import Card from "./ui/Card"; 

export default function Estagios() {
  const listaEstagios = [
   {
      id: 1,
      setor: "Desenvolvimento Web",
      titulo: "Estágio Front-end React",
      desc: "Oportunidade de estágio para atuar com desenvolvimento de interfaces em React, focando em usabilidade e performance.",
      local: "Empresa Tech Solutions - Bairro Industrial",
      tel: "(46) 99887-7665",
      mail: "recrutamento@techsolutions.com",
      horario: "4 ou 6 horas diárias", 
    },
    {
      id: 2,
      setor: "Marketing Digital",
      titulo: "Estágio em Mídias Sociais",
      desc: "Suporte na criação de conteúdo, agendamento de posts e análise de métricas nas principais redes sociais.",
      local: "Agência Criativa - Centro",
      tel: "(46) 3555-4444",
      mail: "vagas@agenciacriativa.com",
      horario: "6 horas diárias",
   },
 ];

  return (
    <>
    {listaEstagios.map((item) => (
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