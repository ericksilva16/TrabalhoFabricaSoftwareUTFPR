import React, { useEffect, useState } from "react";
import Card from "./ui/Card";

const API_BASE = 'http://localhost:3000/api/v1';

export default function Oportunidades() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTipo, setSelectedTipo] = useState(null);

  async function fetchAll() {
    setLoading(true);
    setError(null);
    try {
      const token = (() => { try { return localStorage.getItem('token'); } catch { return null; } })();
      const res = await fetch(`${API_BASE}/oportunidades`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      if (res.status === 401) {
        setError('Você precisa estar logado para ver oportunidades.');
        setItems([]);
        return;
      }
      if (!res.ok) {
        setError('Falha ao carregar oportunidades.');
        setItems([]);
        return;
      }
      const data = await res.json();
      setItems(data);
    } finally { setLoading(false); }
  }

  useEffect(() => { fetchAll(); }, []);

  const tipos = Array.from(new Set(items.map(i => (i.tipo?.nome || 'Oportunidade'))));
  const filteredItems = selectedTipo ? items.filter(i => (i.tipo?.nome || 'Oportunidade') === selectedTipo) : items;

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
      {loading && <div className="col-span-1 md:col-span-2 lg:col-span-3">Carregando oportunidades...</div>}
      {error && <div className="col-span-1 md:col-span-2 lg:col-span-3 text-red-600 mb-4">{error}</div>}

      {!loading && !error && (
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <div className="bg-gray-100 p-4 rounded-2xl shadow w-full mt-2">
            <h3 className="font-semibold mb-2">Filtrar por tipo</h3>
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-3 py-1 text-sm rounded-full transition border ${selectedTipo === null ? 'bg-blue-800 text-white border-blue-800' : 'bg-white border-gray-300 hover:bg-gray-200'}`}
                onClick={() => setSelectedTipo(null)}
              >
                Todos
              </button>
              {tipos.map(t => (
                <button
                  key={t}
                  className={`px-3 py-1 text-sm rounded-full transition border ${selectedTipo === t ? 'bg-blue-800 text-white border-blue-800' : 'bg-white border-gray-300 hover:bg-gray-200'}`}
                  onClick={() => setSelectedTipo(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {filteredItems.map((item) => (
        <Card
          key={item.id}
          setor={item.tipo?.nome || "Oportunidade"}
          titulo={item.titulo}
          desc={item.descricao}
          local={item.link || ""}
          tel={""}
          mail={""}
          horario={item.dataLimite ? new Date(item.dataLimite).toLocaleDateString() : ""}
        />
      ))}

      {filteredItems.length === 0 && !loading && (
        <div className="col-span-1 md:col-span-2 lg:col-span-3 text-gray-500">Nenhuma oportunidade encontrada.</div>
      )}
    </div>
  );
}