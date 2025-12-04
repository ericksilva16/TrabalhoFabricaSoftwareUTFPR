import React, { useEffect, useState } from "react";
import Card from "./ui/Card";

const API_BASE = 'http://localhost:3000/api/v1';

export default function Estagios() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchAll() {
    setLoading(true);
    setError(null);
    try {
      const token = (() => { try { return localStorage.getItem('token'); } catch { return null; } })();
      const res = await fetch(`${API_BASE}/estagios`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      if (res.status === 401) {
        setError('Você precisa estar logado para ver os estágios.');
        setItems([]);
        return;
      }
      if (!res.ok) {
        setError('Falha ao carregar estágios.');
        setItems([]);
        return;
      }
      const data = await res.json();
      setItems(data);
    } finally { setLoading(false); }
  }

  useEffect(() => { fetchAll(); }, []);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
      {loading && <div className="col-span-1 md:col-span-2 lg:col-span-3">Carregando estágios...</div>}
      {error && <div className="col-span-1 md:col-span-2 lg:col-span-3 text-red-600 mb-4">{error}</div>}
      {items.map((item) => (
        <Card
          key={item.id}
          setor={"Estágio"}
          titulo={item.titulo}
          desc={item.descricao}
          local={item.link || ""}
          tel={""}
          mail={""}
          horario={item.dataLimite ? new Date(item.dataLimite).toLocaleDateString() : ""}
        />
      ))}
      {items.length === 0 && !loading && (
        <div className="col-span-1 md:col-span-2 lg:col-span-3 text-gray-500">Nenhum estágio encontrado.</div>
      )}
    </div>
  );
}