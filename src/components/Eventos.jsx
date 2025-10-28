import React from "react";
import Card from "./ui/Card"; 

export default function Eventos() {
 const listaEventos = [
 {
    id: 1,
    setor: "Seminário",
    titulo: "Semana Acadêmica de Engenharia",
    desc: "Palestras e workshops sobre as inovações em diversas áreas da engenharia e tecnologia.",
    local: "Auditório Central",
    tel: "N/A", 
    mail: "contato@semanaengenharia.com",
    horario: "25 a 29 de Novembro", 
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
];

 return (
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