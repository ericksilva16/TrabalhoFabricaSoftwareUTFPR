import React, { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:3000/api/v1';

function OportunidadeForm({ initial = {}, tipos = [], onSubmit, submitLabel = 'Salvar' }) {
  const [titulo, setTitulo] = useState(initial.titulo || '');
  const [descricao, setDescricao] = useState(initial.descricao || '');
  const [link, setLink] = useState(initial.link || '');
  const [dataLimite, setDataLimite] = useState(initial.dataLimite ? initial.dataLimite.slice(0,10) : '');
  const [tipoId, setTipoId] = useState(initial.tipoOportunidadeId || '');
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState(initial.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [cursos, setCursos] = useState(initial.cursos || []);
  const [cursoInput, setCursoInput] = useState('');

  // Initialize from `initial` only when `initial` changes (e.g. editing an item).
  // Do NOT depend on `tipos` here — otherwise when tipos load they would
  // reset any user-typed values and clear the form.
  // Sync fields only when switching the edited item by id
  useEffect(() => {
    if (initial && typeof initial.id !== 'undefined') {
      setTitulo(initial.titulo || '');
      setDescricao(initial.descricao || '');
      setLink(initial.link || '');
      setDataLimite(initial.dataLimite ? initial.dataLimite.slice(0,10) : '');
      setTipoId(initial.tipoOportunidadeId || '');
      setTags(initial.tags || []);
      setCursos(initial.cursos || []);
    }
  }, [initial?.id]);

  // When tipos are loaded, if no tipo is selected yet, set a sensible default.
  // Don't overwrite an already selected value to avoid wiping user input.
  useEffect(() => {
    if ((!tipoId || tipoId === '') && tipos && tipos.length > 0) {
      setTipoId(tipos[0].id);
    }
  }, [tipos]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({ titulo: titulo.trim(), descricao: descricao.trim(), link: link || null, dataLimite: dataLimite || null, tipoOportunidadeId: Number(tipoId), tags, cursos });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700">Título</label>
        <input value={titulo} onChange={e => setTitulo(e.target.value)} required className="mt-1 block w-full border rounded-md p-2" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Descrição</label>
        <textarea value={descricao} onChange={e => setDescricao(e.target.value)} required rows={4} className="mt-1 block w-full border rounded-md p-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">Link (opcional)</label>
          <input value={link} onChange={e => setLink(e.target.value)} className="mt-1 block w-full border rounded-md p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Data limite (opcional)</label>
          <input type="date" value={dataLimite} onChange={e => setDataLimite(e.target.value)} className="mt-1 block w-full border rounded-md p-2" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tipo de Oportunidade</label>
        <select value={tipoId} onChange={e => setTipoId(e.target.value)} required className="mt-1 block w-full border rounded-md p-2">
          {tipos.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
        </select>
      </div>

      {/* Tags e Cursos (cliente) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tags</label>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <input value={tagInput} onChange={e=>setTagInput(e.target.value)} placeholder="Ex.: Remoto" className="min-w-0 flex-1 border rounded-md p-2" />
            <button type="button" onClick={() => { const t = tagInput.trim(); if (t && !tags.includes(t)) { setTags([...tags, t]); setTagInput(''); } }} className="px-3 py-2 bg-blue-600 text-white rounded shrink-0">Adicionar</button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map(t => (
              <span key={t} className="px-2 py-1 rounded-full text-sm border bg-gray-100">
                {t}
                <button type="button" className="ml-2 text-gray-500" onClick={() => setTags(tags.filter(x=>x!==t))}>×</button>
              </span>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Cursos</label>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <input value={cursoInput} onChange={e=>setCursoInput(e.target.value)} placeholder="Ex.: Engenharia de Software" className="min-w-0 flex-1 border rounded-md p-2" />
            <button type="button" onClick={() => { const c = cursoInput.trim(); if (c && !cursos.includes(c)) { setCursos([...cursos, c]); setCursoInput(''); } }} className="px-3 py-2 bg-blue-600 text-white rounded shrink-0">Adicionar</button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {cursos.map(c => (
              <span key={c} className="px-2 py-1 rounded-full text-sm border bg-gray-100">
                {c}
                <button type="button" className="ml-2 text-gray-500" onClick={() => setCursos(cursos.filter(x=>x!==c))}>×</button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-md">{loading ? 'Salvando...' : submitLabel}</button>
      </div>
    </form>
  );
}

export default function AdminOportunidades() {
  const [oportunidades, setOportunidades] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState(null);
  const [candidatos, setCandidatos] = useState(null); // null | array
  const [candidatosDe, setCandidatosDe] = useState(null); // oportunidade selecionada

  function getToken() { try { return localStorage.getItem('token'); } catch { return null; } }

  async function fetchTipos() {
    try {
      const res = await fetch(`${API_BASE}/tipos-oportunidade`, { headers: { 'Authorization': `Bearer ${getToken()}` } });
      if (!res.ok) return;
      const data = await res.json();
      setTipos(data);
    } catch (e) { console.error(e); }
  }

  async function fetchOportunidades() {
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${API_BASE}/oportunidades`, { headers: { 'Authorization': `Bearer ${getToken()}` } });
      if (!res.ok) throw new Error('Falha ao buscar oportunidades');
      const data = await res.json();
      setOportunidades(data);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  useEffect(() => { fetchTipos(); fetchOportunidades(); }, []);

  async function handleCreate(payload) {
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/oportunidades`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` }, body: JSON.stringify({ titulo: payload.titulo, descricao: payload.descricao, link: payload.link, dataLimite: payload.dataLimite, tipoOportunidadeId: payload.tipoOportunidadeId }) });
      if (!res.ok) throw new Error('Falha ao criar oportunidade');
      const created = await res.json();
      // Merge client-only extras
      const withExtras = { ...created, tags: payload.tags || [], cursos: payload.cursos || [] };
      setOportunidades(prev => [withExtras, ...prev]);
    } catch (e) { setError(e.message); }
  }

  async function handleUpdate(id, payload) {
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/oportunidades/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` }, body: JSON.stringify({ titulo: payload.titulo, descricao: payload.descricao, link: payload.link, dataLimite: payload.dataLimite, tipoOportunidadeId: payload.tipoOportunidadeId }) });
      if (!res.ok) throw new Error('Falha ao atualizar');
      const updated = await res.json();
      // Keep client extras in list item
      const withExtras = { ...updated, tags: payload.tags || [], cursos: payload.cursos || [] };
      setOportunidades(prev => prev.map(o => o.id === updated.id ? withExtras : o));
      setEditing(null);
    } catch (e) { setError(e.message); }
  }

  async function handleDelete(id) {
    if (!confirm('Confirma exclusão desta oportunidade?')) return;
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/oportunidades/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${getToken()}` } });
      if (!res.ok) throw new Error('Falha ao excluir');
      setOportunidades(prev => prev.filter(o => o.id !== id));
    } catch (e) { setError(e.message); }
  }

  async function abrirCandidatos(oportunidade) {
    setError(null);
    setCandidatos(null);
    setCandidatosDe(oportunidade);
    try {
      const res = await fetch(`${API_BASE}/oportunidades/${oportunidade.id}/candidatos`, { headers: { 'Authorization': `Bearer ${getToken()}` } });
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
      <h3 className="text-xl font-semibold mb-4">Gerenciar Oportunidades</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-2">Criar nova oportunidade</h4>
          <OportunidadeForm tipos={tipos} onSubmit={handleCreate} submitLabel="Criar" />
        </div>
        <div>
          <h4 className="font-medium mb-2">Oportunidades existentes</h4>
          {loading && <div>Carregando...</div>}
          {error && <div className="text-red-600">{error}</div>}
          <div className="space-y-3">
            {oportunidades.map(o => (
              <div key={o.id} className="bg-white p-3 rounded-lg shadow flex items-start justify-between">
                <div>
                  <div className="font-semibold">{o.titulo}</div>
                  <div className="text-sm text-gray-600">{o.dataLimite ? new Date(o.dataLimite).toLocaleDateString() : ''} • {o.tipo?.nome || ''}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditing(o)} className="px-3 py-1 bg-yellow-500 text-white rounded">Editar</button>
                  <button onClick={() => handleDelete(o.id)} className="px-3 py-1 bg-red-600 text-white rounded">Excluir</button>
                  <button onClick={() => abrirCandidatos(o)} className="px-3 py-1 bg-blue-600 text-white rounded">Candidatos</button>
                </div>
              </div>
            ))}
            {oportunidades.length === 0 && !loading && <div className="text-gray-500">Nenhuma oportunidade cadastrada.</div>}
          </div>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-3xl bg-white p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-lg font-semibold">Editar Oportunidade</h4>
              <button onClick={() => setEditing(null)} className="text-gray-500">Fechar</button>
            </div>
            <OportunidadeForm initial={editing} tipos={tipos} onSubmit={(payload) => handleUpdate(editing.id, payload)} submitLabel="Salvar alterações" />
          </div>
        </div>
      )}

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
