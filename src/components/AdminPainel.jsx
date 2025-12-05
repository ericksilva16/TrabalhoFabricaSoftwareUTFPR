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
    { key: "estagios", label: "Vagas de Estágio" },
    { key: "vaga", label: "Cadastrar Nova Vaga" },
    { key: "oportunidades", label: "Oportunidades" },
    { key: "noticia", label: "Nova Notícia" },
    { key: "avisos", label: "Avisos" },
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
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-blue-900">Painel Administrativo</h2>
        <p className="text-sm text-gray-600">Gerencie conteúdo do portal com segurança.</p>
      </div>

      <div className="flex justify-start gap-2 mb-6 flex-wrap">
        {abas.map((aba) => (
          <button
            key={aba.key}
            onClick={() => setAbaAtiva(aba.key)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all border text-sm
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

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          {/* Header helper per tab */}
          {abaAtiva === 'estagios' && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-blue-900">Vagas de Estágio cadastradas</h3>
              <p className="text-sm text-gray-600">Veja, filtre e gerencie as vagas existentes.</p>
            </div>
          )}
          {abaAtiva === 'vaga' && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-blue-900">Cadastrar nova vaga</h3>
              <p className="text-sm text-gray-600">Preencha os campos para publicar uma nova vaga de estágio.</p>
            </div>
          )}
          {abaAtiva === 'oportunidades' && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-blue-900">Oportunidades</h3>
              <p className="text-sm text-gray-600">Gerencie outras oportunidades disponíveis.</p>
            </div>
          )}
          {abaAtiva === 'noticia' && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-blue-900">Nova notícia</h3>
              <p className="text-sm text-gray-600">Publique atualizações e comunicados importantes.</p>
            </div>
          )}
          {abaAtiva === 'avisos' && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-blue-900">Avisos</h3>
              <p className="text-sm text-gray-600">Crie avisos rápidos para o portal.</p>
            </div>
          )}

          {/* Conteúdo da aba */}
          <div className="mt-2">{renderForm()}</div>
        </div>
      </div>
    </div>
  );
}
