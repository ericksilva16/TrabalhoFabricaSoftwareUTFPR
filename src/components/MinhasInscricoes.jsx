import React, { useEffect, useState } from "react";
import Card from "./ui/Card";
import { isAluno } from "../utils/auth";

const API_BASE = 'http://localhost:3000/api/v1';

export default function MinhasInscricoes() {
  const [estagios, setEstagios] = useState([]);
  const [oportunidades, setOportunidades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const aluno = isAluno();

  async function carregar() {
    setLoading(true);
    setError(null);
    const token = (() => { try { return localStorage.getItem('token'); } catch { return null; } })();
    if (!token) {
      setError('Você precisa estar logado para ver suas inscrições.');
      setLoading(false);
      return;
    }
    try {
      const [rEst, rOpp] = await Promise.all([
        fetch(`${API_BASE}/estagios/inscritos`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_BASE}/oportunidades/inscritas`, { headers: { 'Authorization': `Bearer ${token}` } }),
      ]);
      const e = rEst.ok ? await rEst.json() : [];
      const o = rOpp.ok ? await rOpp.json() : [];
      const normE = (Array.isArray(e) ? e : []).filter(Boolean);
      const normO = (Array.isArray(o) ? o : []).filter(Boolean);
      setEstagios(normE);
      setOportunidades(normO);
    } catch (_) {
      setError('Falha ao carregar suas inscrições.');
      setEstagios([]);
      setOportunidades([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { carregar(); }, []);

  async function cancelarEstagio(id) {
    setError(null);
    const token = (() => { try { return localStorage.getItem('token'); } catch { return null; } })();
    if (!token) {
      setError('Você precisa estar logado para cancelar.');
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/estagios/${id}/inscrever`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) {
        setError('Falha ao cancelar inscrição no estágio.');
        return;
      }
      setEstagios((prev) => prev.filter((e) => e?.id !== id));
    } catch (_) {
      setError('Falha ao cancelar inscrição no estágio.');
    }
  }

  async function cancelarOportunidade(id) {
    setError(null);
    const token = (() => { try { return localStorage.getItem('token'); } catch { return null; } })();
    if (!token) {
      setError('Você precisa estar logado para cancelar.');
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/oportunidades/${id}/inscrever`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) {
        setError('Falha ao cancelar inscrição na oportunidade.');
        return;
      }
      setOportunidades((prev) => prev.filter((o) => o?.id !== id));
    } catch (_) {
      setError('Falha ao cancelar inscrição na oportunidade.');
    }
  }

  if (!aluno) {
    return (
      <div className="text-gray-600">Disponível apenas para alunos.</div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
      {loading && <div className="col-span-1 md:col-span-2 lg:col-span-3">Carregando suas inscrições...</div>}
      {error && <div className="col-span-1 md:col-span-2 lg:col-span-3 text-red-600 mb-4">{error}</div>}

      {(estagios?.length > 0) && (
        <div className="col-span-1 md:col-span-2 lg:col-span-3 mt-2">
          <h3 className="text-lg font-semibold mb-2">Estágios</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {estagios.map((item) => (
              <Card
                key={`e-${item?.id ?? Math.random()}`}
                setor={"Estágio"}
                titulo={item?.titulo || ""}
                desc={item?.descricao || ""}
                local={item?.link || ""}
                tel={""}
                mail={""}
                horario={item?.dataLimite ? new Date(item.dataLimite).toLocaleDateString() : ""}
                actions={
                  <button
                    onClick={() => item?.id && cancelarEstagio(item.id)}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition border bg-white text-red-700 border-red-300 hover:bg-red-50"
                  >
                    Cancelar inscrição
                  </button>
                }
              />
            ))}
          </div>
        </div>
      )}

      {(oportunidades?.length > 0) && (
        <div className="col-span-1 md:col-span-2 lg:col-span-3 mt-6">
          <h3 className="text-lg font-semibold mb-2">Oportunidades</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {oportunidades.map((item) => (
              <Card
                key={`o-${item?.id ?? Math.random()}`}
                setor={item?.tipo?.nome || "Oportunidade"}
                titulo={item?.titulo || ""}
                desc={item?.descricao || ""}
                local={item?.link || ""}
                tel={""}
                mail={""}
                horario={item?.dataLimite ? new Date(item.dataLimite).toLocaleDateString() : ""}
                actions={
                  <button
                    onClick={() => item?.id && cancelarOportunidade(item.id)}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition border bg-white text-red-700 border-red-300 hover:bg-red-50"
                  >
                    Cancelar inscrição
                  </button>
                }
              />
            ))}
          </div>
        </div>
      )}

      {!loading && !error && (estagios.length === 0 && oportunidades.length === 0) && (
        <div className="col-span-1 md:col-span-2 lg:col-span-3 text-gray-500">Você ainda não possui inscrições.</div>
      )}
    </div>
  );
}
