import React from "react";
import Card from "./ui/Card";

export default function Universidade({ item }) {
  return (
    <Card
      setor={item.setor}
      titulo={item.titulo}
      desc={item.desc}
      local={item.local}
      tel={item.tel}
      mail={item.mail}
      horario={item.horario}
    />
  );
}