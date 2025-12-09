import React, { useEffect, useState } from "react";
import Card from "./ui/Card";
import SearchInput from "./ui/SearchInput";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { isAluno, getUserId } from "../utils/auth";

const API_BASE = 'http://localhost:3000/api/v1';

export default function Oportunidades() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTipo, setSelectedTipo] = useState(null);
  const [q, setQ] = useState("");
  const [inscritasIds, setInscritasIds] = useState(new Set());
  const aluno = isAluno();
  const [favIds, setFavIds] = useState(new Set());
  const [onlyFav, setOnlyFav] = useState(false);
  const [tagSel, setTagSel] = useState([]);
  const [cursoSel, setCursoSel] = useState([]);

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
      // carregar favoritos
      try {
        const uid = getUserId();
        const rawFav = localStorage.getItem(uid ? `favOportunidades_${uid}` : 'favOportunidades');
        const arr = rawFav ? JSON.parse(rawFav) : [];
        setFavIds(new Set((Array.isArray(arr) ? arr : []).map(String)));
      } catch (_) {}
      if (token) {
        try {
          const r2 = await fetch(`${API_BASE}/oportunidades/inscritas`, { headers: { 'Authorization': `Bearer ${token}` } });
          if (r2.ok) {
            const inscritas = await r2.json();
            const ids = new Set((Array.isArray(inscritas) ? inscritas : []).map((o) => String(o?.id)));
            setInscritasIds(ids);
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
      const res = await fetch(`${API_BASE}/oportunidades/${id}/inscrever`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) {
        const msg = res.status === 409 ? 'Você já está inscrito nesta oportunidade.' : 'Falha ao realizar inscrição.';
        setError(msg);
        return;
      }
      setInscritasIds((prev) => {
        const next = new Set(prev);
        next.add(String(id));
        return next;
      });
    } catch (_) {
      setError('Falha ao realizar inscrição.');
    }
  }

  useEffect(() => { fetchAll(); }, []);

  function toggleFav(id) {
    setFavIds(prev => {
      const next = new Set(prev);
      const key = String(id);
      if (next.has(key)) next.delete(key); else next.add(key);
      try {
        const uid = getUserId();
        const storeKey = uid ? `favOportunidades_${uid}` : 'favOportunidades';
        localStorage.setItem(storeKey, JSON.stringify(Array.from(next)));
      } catch (_) {}
      return next;
    });
  }

  const tipos = Array.from(new Set(items.map(i => (i.tipo?.nome || 'Oportunidade'))));
  const filteredItems = (selectedTipo ? items.filter(i => (i.tipo?.nome || 'Oportunidade') === selectedTipo) : items)
    .filter(i => {
      if (!q) return true;
      const text = `${i.titulo || ''} ${i.descricao || ''}`.toLowerCase();
      return text.includes(q.toLowerCase());
    })
    .filter(i => onlyFav ? favIds.has(String(i.id)) : true)
    .filter(i => tagSel.length ? (Array.isArray(i.tags) && tagSel.every(t=> i.tags.includes(t))) : true)
    .filter(i => cursoSel.length ? (Array.isArray(i.cursos) && cursoSel.every(c=> i.cursos.includes(c))) : true);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
      {loading && <div className="col-span-1 md:col-span-2 lg:col-span-3">Carregando oportunidades...</div>}
      {error && <div className="col-span-1 md:col-span-2 lg:col-span-3 text-red-600 mb-4">{error}</div>}

      {!loading && !error && (
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <div className="bg-gray-100 p-4 rounded-2xl shadow w-full mt-2 mb-2">
            <h3 className="font-semibold mb-2">Filtros de oportunidade</h3>
            <div className="mb-3">
              <SearchInput value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Buscar por título ou descrição" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Tipo</div>
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
              <button
                className={`ml-auto px-3 py-1 text-sm rounded-full transition border ${onlyFav ? 'bg-blue-800 text-white border-blue-800' : 'bg-white border-gray-300 hover:bg-gray-200'}`}
                onClick={()=> setOnlyFav(v=>!v)}
              >
                Somente favoritos
              </button>
            </div>
            <div className="mt-3">
              <div className="text-sm text-gray-600 mb-1">Tags</div>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set([].concat(...(items||[]).map(i=> Array.isArray(i.tags)? i.tags : [])))).map(t => (
                  <button
                    key={`tag-${t}`}
                    className={`px-3 py-1 text-sm rounded-full transition border ${tagSel.includes(t) ? 'bg-blue-800 text-white border-blue-800' : 'bg-white border-gray-300 hover:bg-gray-200'}`}
                    onClick={()=> setTagSel(prev => prev.includes(t) ? prev.filter(x=>x!==t) : [...prev, t])}
                  >{t}</button>
                ))}
                {tagSel.length>0 && (
                  <button className="ml-auto px-3 py-1 text-sm rounded-full transition border bg-white border-gray-300 hover:bg-gray-200" onClick={()=> setTagSel([])}>Limpar tags</button>
                )}
              </div>
            </div>
            <div className="mt-3">
              <div className="text-sm text-gray-600 mb-1">Cursos</div>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set([].concat(...(items||[]).map(i=> Array.isArray(i.cursos)? i.cursos : [])))).map(c => (
                  <button
                    key={`curso-${c}`}
                    className={`px-3 py-1 text-sm rounded-full transition border ${cursoSel.includes(c) ? 'bg-blue-800 text-white border-blue-800' : 'bg-white border-gray-300 hover:bg-gray-200'}`}
                    onClick={()=> setCursoSel(prev => prev.includes(c) ? prev.filter(x=>x!==c) : [...prev, c])}
                  >{c}</button>
                ))}
                {cursoSel.length>0 && (
                  <button className="ml-auto px-3 py-1 text-sm rounded-full transition border bg-white border-gray-300 hover:bg-gray-200" onClick={()=> setCursoSel([])}>Limpar cursos</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredItems.map((item) => {
        const jaInscrito = inscritasIds.has(String(item.id));
        const isFav = favIds.has(String(item.id));
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
        const favBtn = (
          <button
            onClick={()=> toggleFav(item.id)}
            className={`ml-2 p-2 rounded-full border ${isFav ? 'bg-pink-100 border-pink-300 text-pink-700' : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-200'}`}
            title={isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            {isFav ? <MdFavorite size={18} /> : <MdFavoriteBorder size={18} />}
          </button>
        );

        return (
          <Card
            key={item.id}
            setor={item.tipo?.nome || "Oportunidade"}
            titulo={item.titulo}
            desc={item.descricao}
            local={item.link || ""}
            tel={""}
            mail={""}
            horario={item.dataLimite ? new Date(item.dataLimite).toLocaleDateString() : ""}
            tags={item.tags || []}
            cursos={item.cursos || []}
            actions={<div className="flex items-center">{actions}{favBtn}</div>}
          />
        );
      })}

      {filteredItems.length === 0 && !loading && (
        <div className="col-span-1 md:col-span-2 lg:col-span-3 text-gray-500">Nenhuma oportunidade encontrada.</div>
      )}
    </div>
  );
}