import React, { useState, useEffect } from "react";
import FormNovaVaga from "./FormNovaVaga";
import FormNovaNoticia from "./FormNovaNoticia";
import FormNovaInfo from "./FormNovaInfo";
import AdminAvisos from "./AdminAvisos";
import AdminOportunidades from "./AdminOportunidades";
import AdminEstagios from "./AdminEstagios";
import { isAdmin } from '../utils/auth';

export default function AdminPainel() {
  const [abaAtiva, setAbaAtiva] = useState("noticia");

  useEffect(() => {
    // If the client is not admin, redirect to the main page and hide the panel
    if (!isAdmin()) {
      // Ensure the app resets to non-admin view by reloading to root
      window.location.replace(window.location.origin + '/');
    }
  }, []);

  const abas = [
    { key: "noticia", label: "Nova Notícia" },
    { key: "oportunidades", label: "Oportunidades" },
    { key: "estagios", label: "Estágios" },
    { key: "avisos", label: "Avisos" },
    { key: "vaga", label: "Nova Vaga de Estágio" },
    // removi a aba "evento" temporariamente, pois o form não existe ainda
    { key: "info", label: "Nova Informação" },
  ];

  const renderForm = () => {
    switch (abaAtiva) {
      case "noticia":
        return <FormNovaNoticia />;
      case "oportunidades":
        return <AdminOportunidades />;
      case "estagios":
        return <AdminEstagios />;
      case "avisos":
        return <AdminAvisos />;
      case "vaga":
        return <FormNovaVaga />;
      // caso queira adicionar o evento depois, basta criar o arquivo FormNovoEvento.jsx
      // e descomentar a linha abaixo:
      // case "evento":
      //   return <FormNovoEvento />;
      case "info":
        return <FormNovaInfo />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
        Painel Administrativo
      </h2>

      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {abas.map((aba) => (
          <button
            key={aba.key}
            onClick={() => setAbaAtiva(aba.key)}
            className={`px-5 py-2 rounded-lg font-semibold transition-all border
              ${
                abaAtiva === aba.key
                  ? "bg-blue-800 text-white border-blue-800"
                  : "bg-white border-gray-300 hover:bg-gray-100"
              }`}
          >
            {aba.label}
          </button>
        ))}
      </div>

      <div className="mt-8">{renderForm()}</div>
    </div>
  );
}
