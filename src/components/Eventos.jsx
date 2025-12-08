import React, { useState } from "react";
import Card from "./ui/Card";
import SearchInput from "./ui/SearchInput";

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

    const [q, setQ] = useState("");
    const filtered = listaEventos.filter(e => {
        if (!q) return true;
        const text = `${e.titulo} ${e.desc} ${e.setor}`.toLowerCase();
        return text.includes(q.toLowerCase());
    });

    return (
        <div className="w-full">
            <div className="bg-gray-100 p-4 rounded-2xl shadow w-full mt-2 mb-6">
                <h3 className="font-semibold mb-2">Eventos</h3>
                <SearchInput value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Buscar por título, descrição ou setor" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                {filtered.map((item) => (
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
                {filtered.length === 0 && (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 text-gray-500">Nenhum evento encontrado.</div>
                )}
            </div>
        </div>
    );
}