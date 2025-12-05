import React, { useEffect, useState } from "react";
import Card from "./ui/Card";
import { isAluno } from "../utils/auth";

const API_BASE = 'http://localhost:3000/api/v1';

export default function Estagios() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inscritosIds, setInscritosIds] = useState(new Set());
  const aluno = isAluno();

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
      // Carregar IDs já inscritos, para sinalizar e desabilitar o botão
      if (token) {
        try {
          const r2 = await fetch(`${API_BASE}/estagios/inscritos`, { headers: { 'Authorization': `Bearer ${token}` } });
          if (r2.ok) {
            const inscritos = await r2.json();
            const ids = new Set((Array.isArray(inscritos) ? inscritos : []).map((e) => String(e?.id)));
            setInscritosIds(ids);
          }
        } catch (_) {}
      }
    } finally { setLoading(false); }
  }

  async function inscrever(id) {
    const token = (() => { try { return localStorage.getItem('token'); } catch { return null; } })();
    if (!token) {
      setError('Você precisa estar logado para se inscrever.');
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/estagios/${id}/inscrever`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) {
        const msg = res.status === 409 ? 'Você já está inscrito neste estágio.' : 'Falha ao realizar inscrição.';
        setError(msg);
        return;
      }
      // Atualiza estado local
      setInscritosIds((prev) => {
        const next = new Set(prev);
        next.add(String(id));
        return next;
      });
    } catch (_) {
      setError('Falha ao realizar inscrição.');
    }
  }

  useEffect(() => { fetchAll(); }, []);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
      {loading && <div className="col-span-1 md:col-span-2 lg:col-span-3">Carregando estágios...</div>}
      {error && <div className="col-span-1 md:col-span-2 lg:col-span-3 text-red-600 mb-4">{error}</div>}
      {items.map((item) => {
        const jaInscrito = inscritosIds.has(String(item.id));
        const actions = aluno ? (
          <button
            onClick={() => !jaInscrito && inscrever(item.id)}
            disabled={jaInscrito}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition border ${
              jaInscrito
                ? 'bg-gray-200 text-gray-600 border-gray-300 cursor-not-allowed'
                : 'bg-blue-600 text-white border-blue-700 hover:bg-blue-700'
            }`}
          >
            {jaInscrito ? 'Inscrito' : 'Inscrever-se'}
          </button>
        ) : null;

        return (
          <Card
            key={item.id}
            setor={"Estágio"}
            titulo={item.titulo}
            desc={item.descricao}
            local={item.link || ""}
            tel={""}
            mail={""}
            horario={item.dataLimite ? new Date(item.dataLimite).toLocaleDateString() : ""}
            actions={actions}
          />
        );
      })}
      {items.length === 0 && !loading && (
        <div className="col-span-1 md:col-span-2 lg:col-span-3 text-gray-500">Nenhum estágio encontrado.</div>
      )}
    </div>
  );
}