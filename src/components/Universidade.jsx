import React from "react";
import Card from "./ui/Card";

export default function Universidade({ item }) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
      <Card
        setor={item.setor}
        titulo={item.titulo}
        desc={item.desc}
        local={item.local}
        tel={item.tel}
        mail={item.mail}
        horario={item.horario}
      />
    </div>
  );
}