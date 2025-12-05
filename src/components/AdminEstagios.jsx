import React, { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:3000/api/v1';

export default function AdminEstagios() {
  const [estagios, setEstagios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [candidatos, setCandidatos] = useState(null);
  const [candidatosDe, setCandidatosDe] = useState(null);

  function getToken() { try { return localStorage.getItem('token'); } catch { return null; } }

  async function fetchCriados() {
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${API_BASE}/estagios/criados`, { headers: { 'Authorization': `Bearer ${getToken()}` } });
      if (!res.ok) throw new Error('Falha ao buscar estágios criados');
      const data = await res.json();
      setEstagios(Array.isArray(data) ? data : []);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  useEffect(() => { fetchCriados(); }, []);

  async function abrirCandidatos(estagio) {
    setError(null);
    setCandidatos(null);
    setCandidatosDe(estagio);
    try {
      const res = await fetch(`${API_BASE}/estagios/${estagio.id}/candidatos`, { headers: { 'Authorization': `Bearer ${getToken()}` } });
      if (!res.ok) throw new Error('Falha ao buscar candidatos');
      const data = await res.json();
      setCandidatos(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message);
      setCandidatos([]);
    }
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Meus Estágios Criados</h3>
      {loading && <div>Carregando...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <div className="space-y-3">
        {estagios.map(e => (
          <div key={e.id} className="bg-white p-3 rounded-lg shadow flex items-start justify-between">
            <div>
              <div className="font-semibold">{e.titulo}</div>
              <div className="text-sm text-gray-600">{e.dataLimite ? new Date(e.dataLimite).toLocaleDateString() : ''} • {e.status || ''}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => abrirCandidatos(e)} className="px-3 py-1 bg-blue-600 text-white rounded">Candidatos</button>
            </div>
          </div>
        ))}
        {estagios.length === 0 && !loading && <div className="text-gray-500">Nenhum estágio criado.</div>}
      </div>

      {candidatosDe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-3xl bg-white p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-lg font-semibold">Candidatos — {candidatosDe.titulo}</h4>
              <button onClick={() => { setCandidatosDe(null); setCandidatos(null); }} className="text-gray-500">Fechar</button>
            </div>
            {!candidatos && <div>Carregando...</div>}
            {candidatos && candidatos.length === 0 && <div className="text-gray-500">Nenhum candidato.</div>}
            {candidatos && candidatos.length > 0 && (
              <div className="divide-y">
                {candidatos.map(c => (
                  <div key={c.id} className="py-2">
                    <div className="font-medium">{c.nome || 'Sem nome'}</div>
                    <div className="text-sm text-gray-600">{c.email || ''}</div>
                    <div className="text-sm text-gray-600">{c.curso || ''} {c.telefone ? `• ${c.telefone}` : ''}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
