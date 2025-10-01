// Arquivo: Eventos.js

import React from "react";
import Card from "./ui/Card"; // Ajuste o caminho conforme a sua estrutura

export default function Eventos() {
  // Dados de exemplo para Eventos, adaptados para as props do Card.js
  const listaEventos = [
    {
      id: 1,
      setor: "Seminário",
      titulo: "Semana Acadêmica de Engenharia",
      desc: "Palestras e workshops sobre as inovações em diversas áreas da engenharia e tecnologia.",
      local: "Auditório Central",
      tel: "N/A", // Não aplicável para eventos, mas necessário para a prop
      mail: "contato@semanaengenharia.com",
      horario: "25 a 29 de Novembro", // Usado para a data do evento
    },
    {
      id: 2,
      setor: "Workshop",
      titulo: "Introdução ao Desenvolvimento Mobile",
      desc: "Workshop prático focado nos fundamentos do desenvolvimento de aplicativos nativos (Android/iOS).",
      local: "Sala de Treinamento 305",
      tel: "N/A",
      mail: "organizacao@workshopmobile.com",
      horario: "Sábado, 09h00 às 17h00",
    },
    // Adicione mais eventos aqui...
  ];

  return (
    // Usa o mesmo container flexível
    <>
      {listaEventos.map((item) => (
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