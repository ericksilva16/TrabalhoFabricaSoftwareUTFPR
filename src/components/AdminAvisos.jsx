import React, { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:3000/api/v1';

function AvisoForm({ initial = {}, onSubmit, submitLabel = 'Salvar' }) {
  const [title, setTitle] = useState(initial.title || '');
  const [content, setContent] = useState(initial.content || '');
  const [date, setDate] = useState(initial.date ? initial.date.slice(0,10) : '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle(initial.title || '');
    setContent(initial.content || '');
    setDate(initial.date ? initial.date.slice(0,10) : '');
  }, [initial]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({ title: title.trim(), content: content.trim(), date: date || null });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700">Título</label>
        <input value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full border rounded-md p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Conteúdo</label>
        <textarea value={content} onChange={e => setContent(e.target.value)} required rows={5} className="mt-1 block w-full border rounded-md p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Data (opcional)</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="mt-1 block w-auto border rounded-md p-2" />
      </div>
      <div className="flex gap-2">
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-md">{loading ? 'Salvando...' : submitLabel}</button>
      </div>
    </form>
  );
}

export default function AdminAvisos() {
  const [avisos, setAvisos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState(null);

  function getToken() {
    try { return localStorage.getItem('token'); } catch (e) { return null; }
  }

  async function fetchAvisos() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/avisos`, { headers: { 'Authorization': `Bearer ${getToken()}` } });
      if (!res.ok) throw new Error('Falha ao buscar avisos');
      const data = await res.json();
      setAvisos(data);
    } catch (e) {
      setError(e.message);
    } finally { setLoading(false); }
  }

  useEffect(() => { fetchAvisos(); }, []);

  async function handleCreate(payload) {
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/avisos`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Falha ao criar aviso');
      const created = await res.json();
      setAvisos(prev => [created, ...prev]);
    } catch (e) { setError(e.message); }
  }

  async function handleUpdate(id, payload) {
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/avisos/${id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Falha ao atualizar aviso');
      const updated = await res.json();
      setAvisos(prev => prev.map(a => a.id === updated.id ? updated : a));
      setEditing(null);
    } catch (e) { setError(e.message); }
  }

  async function handleDelete(id) {
    if (!confirm('Confirma exclusão deste aviso?')) return;
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/avisos/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${getToken()}` } });
      if (!res.ok) throw new Error('Falha ao excluir');
      setAvisos(prev => prev.filter(a => a.id !== id));
    } catch (e) { setError(e.message); }
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Gerenciar Avisos</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-2">Criar novo aviso</h4>
          <AvisoForm onSubmit={handleCreate} submitLabel="Criar" />
        </div>

        <div>
          <h4 className="font-medium mb-2">Avisos existentes</h4>
          {loading && <div>Carregando...</div>}
          {error && <div className="text-red-600">{error}</div>}
          <div className="space-y-3">
            {avisos.map(a => (
              <div key={a.id} className="bg-white p-3 rounded-lg shadow flex items-start justify-between">
                <div>
                  <div className="font-semibold">{a.title}</div>
                  <div className="text-sm text-gray-600">{a.date ? new Date(a.date).toLocaleDateString() : ''}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditing(a)} className="px-3 py-1 bg-yellow-500 text-white rounded">Editar</button>
                  <button onClick={() => handleDelete(a.id)} className="px-3 py-1 bg-red-600 text-white rounded">Excluir</button>
                </div>
              </div>
            ))}
            {avisos.length === 0 && !loading && <div className="text-gray-500">Nenhum aviso cadastrado.</div>}
          </div>
        </div>
      </div>

      {/* Edit modal area */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl bg-white p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-lg font-semibold">Editar Aviso</h4>
              <button onClick={() => setEditing(null)} className="text-gray-500">Fechar</button>
            </div>
            <AvisoForm initial={{ title: editing.title, content: editing.content, date: editing.date }} onSubmit={(payload) => handleUpdate(editing.id, payload)} submitLabel="Salvar alterações" />
          </div>
        </div>
      )}
    </div>
  );
}
