// Arquivo: Estagios.js

import React from "react";
import Card from "./ui/Card"; // Ajuste o caminho conforme a sua estrutura

export default function Estagios() {
  // Dados de exemplo para Estágios, adaptados para as props do Card.js
  const listaEstagios = [
    {
      id: 1,
      setor: "Desenvolvimento Web",
      titulo: "Estágio Front-end React",
      desc: "Oportunidade de estágio para atuar com desenvolvimento de interfaces em React, focando em usabilidade e performance.",
      local: "Empresa Tech Solutions - Bairro Industrial",
      tel: "(46) 99887-7665",
      mail: "recrutamento@techsolutions.com",
      horario: "4 ou 6 horas diárias", // Usado para o horário ou carga horária
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
    // Adicione mais estágios aqui...
  ];

  return (
    // Usa o mesmo container flexível
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