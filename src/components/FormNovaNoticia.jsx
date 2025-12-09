import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:3000/api/v1';

function getToken() {
  return localStorage.getItem('token');
}

export default function FormNovaNoticia() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchNoticias() {
    try {
      const res = await fetch(`${API_BASE}/noticias`);
      if (!res.ok) throw new Error('Falha ao carregar notícias');
      const data = await res.json();
      setNoticias(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    fetchNoticias();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = getToken();
      const payload = {
        titulo,
        descricao,
        imagemUrl: imageUrl || null,   // <-- corrigido
        linkUrl: linkUrl || null
      };
      
      const res = await fetch(`${API_BASE}/noticias`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Falha ao criar notícia');
      
      setTitulo('');
      setDescricao('');
      setImagemUrl('');
      setLinkUrl('');
      fetchNoticias();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Tem certeza que deseja deletar esta notícia?')) return;

    try {
      const token = getToken();
      const res = await fetch(`${API_BASE}/noticias/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error('Falha ao deletar notícia');
      fetchNoticias();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold mb-6">Nova Notícia</h3>
      
      {error && <div className="text-red-600 mb-4 p-3 bg-red-100 rounded">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            placeholder="Digite o título da notícia"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
            placeholder="Digite a descrição da notícia"
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">URL da Imagem</label>
          <input
            type="url"
            value={imagemUrl}
            onChange={(e) => setImagemUrl(e.target.value)}
            placeholder="https://exemplo.com/imagem.jpg"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Link da Notícia (opcional)</label>
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://exemplo.com/noticia"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? 'Publicando...' : 'Publicar Notícia'}
        </button>
      </form>

      <hr className="my-8" />

      <h4 className="text-lg font-bold mb-4">Notícias Publicadas ({noticias.length})</h4>
      <div className="space-y-3">
        {noticias.length === 0 ? (
          <p className="text-gray-500">Nenhuma notícia publicada</p>
        ) : (
          noticias.map((noticia) => (
            <div key={noticia.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex justify-between items-start gap-4">
                {noticia.imagemUrl && (
                  <img
                    src={noticia.imagemUrl}
                    alt={noticia.titulo}
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-800">{noticia.titulo}</h5>
                  <p className="text-sm text-gray-600 mt-1">{noticia.descricao.substring(0, 100)}...</p>
                  {noticia.linkUrl && (
                    <a
                      href={noticia.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                    >
                      Acessar notícia
                    </a>
                  )}
                  <p className="text-xs text-gray-400 mt-2">
                    {noticia.createdAt ? new Date(noticia.createdAt).toLocaleDateString('pt-BR') : ''}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(noticia.id)}
                  className="ml-4 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition whitespace-nowrap"
                >
                  Deletar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}