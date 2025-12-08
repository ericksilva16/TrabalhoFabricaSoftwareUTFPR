import React, { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:3000/api/v1';

export default function FormNovaVaga() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [link, setLink] = useState('');
  const [dataLimite, setDataLimite] = useState('');
  const [status, setStatus] = useState('ABERTO');
  const [cidade, setCidade] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [horario, setHorario] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [savingId, setSavingId] = useState(null);
  const [candidatosDe, setCandidatosDe] = useState(null);
  const [candidatos, setCandidatos] = useState(null);

  function getToken() { try { return localStorage.getItem('token'); } catch { return null; } }

  async function fetchAll() {
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${API_BASE}/estagios`, { headers: { 'Authorization': `Bearer ${getToken()}` } });
      if (!res.ok) throw new Error('Falha ao carregar estágios');
      const data = await res.json();
      setItems(data);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  useEffect(() => { fetchAll(); }, []);

  async function handleCreate(e) {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      const payload = {
        titulo: titulo.trim(),
        descricao: descricao.trim(),
        link: link || null,
        dataLimite: dataLimite || null,
        status,
        // campos extras apenas no cliente
        cidade: cidade.trim() || null,
        telefone: telefone.trim() || null,
        email: email.trim() || null,
        horario: horario.trim() || null,
      };
      const res = await fetch(`${API_BASE}/estagios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
        body: JSON.stringify({
          titulo: payload.titulo,
          descricao: payload.descricao,
          link: payload.link,
          dataLimite: payload.dataLimite,
          status: payload.status,
        })
      });
      if (!res.ok) throw new Error('Falha ao criar estágio');
      const created = await res.json();
      // Mesclar os extras apenas no cliente para exibição
      const withExtras = { ...created, cidade: payload.cidade, telefone: payload.telefone, email: payload.email, horario: payload.horario };
      // Persistir extras localmente mapeados por ID para que apareçam nas listagens públicas
      try {
        const raw = localStorage.getItem('estagioExtras');
        const map = raw ? JSON.parse(raw) : {};
        map[String(created.id)] = { cidade: payload.cidade, telefone: payload.telefone, email: payload.email, horario: payload.horario };
        localStorage.setItem('estagioExtras', JSON.stringify(map));
      } catch (_) {}
      setItems(prev => [withExtras, ...prev]);
      setTitulo(''); setDescricao(''); setLink(''); setDataLimite(''); setStatus('ABERTO');
      setCidade(''); setTelefone(''); setEmail(''); setHorario('');
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  async function handleDelete(id) {
    if (!confirm('Confirma excluir esta vaga?')) return;
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/estagios/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${getToken()}` } });
      if (!res.ok) throw new Error('Falha ao excluir estágio');
      setItems(prev => prev.filter(i => i.id !== id));
    } catch (e) { setError(e.message); }
  }

  async function alterarStatus(id, novoStatus) {
    setError(null);
    setSavingId(id);
    try {
      const res = await fetch(`${API_BASE}/estagios/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
        body: JSON.stringify({ status: novoStatus })
      });
      if (!res.ok) throw new Error('Falha ao atualizar status');
      setItems(prev => prev.map(i => i.id === id ? { ...i, status: novoStatus } : i));
    } catch (e) { setError(e.message); }
    finally { setSavingId(null); }
  }

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
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold mb-6">Gerenciar Vagas de Estágio</h3>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <form onSubmit={handleCreate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Título da Vaga</label>
          <input value={titulo} onChange={e => setTitulo(e.target.value)} required placeholder="Digite título da vaga" className="mt-1 block w-full border rounded-md p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Descrição</label>
          <textarea value={descricao} onChange={e => setDescricao(e.target.value)} required placeholder="Digite descrição" rows={4} className="mt-1 block w-full border rounded-md p-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Link (opcional)</label>
            <input value={link} onChange={e => setLink(e.target.value)} placeholder="https://..." className="mt-1 block w-full border rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Data limite (opcional)</label>
            <input type="date" value={dataLimite} onChange={e => setDataLimite(e.target.value)} className="mt-1 block w-full border rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select value={status} onChange={e => setStatus(e.target.value)} className="mt-1 block w-full border rounded-md p-2">
              <option value="ABERTO">Aberto</option>
              <option value="FECHADO">Fechado</option>
              <option value="EM_ANDAMENTO">Em andamento</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Cidade</label>
            <input value={cidade} onChange={e => setCidade(e.target.value)} placeholder="Ex.: Curitiba" className="mt-1 block w-full border rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Telefone</label>
            <input value={telefone} onChange={e => setTelefone(e.target.value)} placeholder="(41) 99999-9999" className="mt-1 block w-full border rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="contato@empresa.com" className="mt-1 block w-full border rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Horário</label>
            <input value={horario} onChange={e => setHorario(e.target.value)} placeholder="Ex.: 8h às 14h" className="mt-1 block w-full border rounded-md p-2" />
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-blue-800 text-white font-semibold py-3 rounded-lg hover:bg-blue-900 transition-all mt-2">
          {loading ? 'Publicando...' : 'Publicar Vaga'}
        </button>
      </form>

      <div className="mt-8">
        <h4 className="font-medium mb-2">Vagas cadastradas</h4>
        {loading && <div>Carregando...</div>}
        <div className="space-y-3">
          {items.map(i => (
            <div key={i.id} className="bg-white p-3 rounded-lg shadow flex items-start justify-between">
              <div>
                <div className="font-semibold">{i.titulo}</div>
                <div className="text-sm text-gray-600">{i.dataLimite ? new Date(i.dataLimite).toLocaleDateString() : ''} • {i.status || ''}</div>
                <div className="mt-2">
                  <label className="text-sm text-gray-700 mr-2">Status:</label>
                  <select
                    className="border rounded-md p-1 text-sm"
                    value={i.status || 'ABERTO'}
                    onChange={(ev)=> alterarStatus(i.id, ev.target.value)}
                    disabled={savingId === i.id}
                  >
                    <option value="ABERTO">Aberto</option>
                    <option value="FECHADO">Fechado</option>
                    <option value="EM_ANDAMENTO">Em andamento</option>
                  </select>
                </div>
                <div className="mt-2 text-sm text-gray-700">
                  {i.cidade && <span className="mr-2">Cidade: {i.cidade}</span>}
                  {i.telefone && <span className="mr-2">• Tel: {i.telefone}</span>}
                  {i.email && <span className="mr-2">• Email: {i.email}</span>}
                  {i.horario && <span>• Horário: {i.horario}</span>}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => abrirCandidatos(i)} className="px-3 py-1 bg-blue-600 text-white rounded">Candidatos</button>
                <button onClick={() => handleDelete(i.id)} className="px-3 py-1 bg-red-600 text-white rounded">Excluir</button>
              </div>
            </div>
          ))}
          {items.length === 0 && !loading && <div className="text-gray-500">Nenhuma vaga cadastrada.</div>}
        </div>
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