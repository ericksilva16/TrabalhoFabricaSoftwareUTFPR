import React, { useEffect, useState } from "react";
import Card from "./ui/Card";
import { isAluno, getUserId } from "../utils/auth";
import SearchInput from "./ui/SearchInput";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

const API_BASE = 'http://localhost:3000/api/v1';

export default function Estagios() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inscritosIds, setInscritosIds] = useState(new Set());
  // filtros
  const [q, setQ] = useState("");
  const [cidade, setCidade] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("");
  const [comTelefone, setComTelefone] = useState(false);
  const [comEmail, setComEmail] = useState(false);
  const [comHorario, setComHorario] = useState(false);
  const [onlyFav, setOnlyFav] = useState(false);
  const [favIds, setFavIds] = useState(new Set());
  const [tagSel, setTagSel] = useState([]);
  const [cursoSel, setCursoSel] = useState([]);
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
      // Merge extras salvos localmente, se existirem
      let merged = data;
      try {
        const raw = localStorage.getItem('estagioExtras');
        const map = raw ? JSON.parse(raw) : {};
        if (map && typeof map === 'object') {
          merged = (Array.isArray(data) ? data : []).map((d) => {
            const extras = map[String(d?.id)];
            return extras ? { ...d, ...extras } : d;
          });
        }
      } catch (_) {}
      setItems(merged);
      // carregar favoritos
      try {
        const uid = getUserId();
        const rawFav = localStorage.getItem(uid ? `favEstagios_${uid}` : 'favEstagios');
        const arr = rawFav ? JSON.parse(rawFav) : [];
        setFavIds(new Set((Array.isArray(arr) ? arr : []).map(String)));
      } catch (_) {}
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
  function toggleFav(id) {
    setFavIds(prev => {
      const next = new Set(prev);
      const key = String(id);
      if (next.has(key)) next.delete(key); else next.add(key);
      try {
        const uid = getUserId();
        const storeKey = uid ? `favEstagios_${uid}` : 'favEstagios';
        localStorage.setItem(storeKey, JSON.stringify(Array.from(next)));
      } catch (_) {}
      return next;
    });
  }

  async function inscrever(id) {
    const token = (() => { try { return localStorage.getItem('token'); } catch { return null; } })();
    if (!token) {
      setError('Você precisa estar logado para se inscrever.');
      return;
    }
    // Evitar inscrição se a vaga estiver fechada
    const alvo = items.find(it => String(it.id) === String(id));
    if (alvo && String(alvo.status || '').toUpperCase() === 'FECHADO') {
      setError('Inscrições encerradas para esta vaga.');
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
    <div className="w-full">
      {/* Barra de filtros — estilo semelhante ao de Oportunidades */}
      <div className="bg-gray-100 p-4 rounded-2xl shadow w-full mt-2 mb-6">
        <h3 className="font-semibold mb-2">Filtros de estágio</h3>
        {/* Busca */}
        <div className="mb-3">
          <SearchInput
            value={q}
            onChange={(e)=>setQ(e.target.value)}
            placeholder="Buscar por título ou descrição"
          />
        </div>
        {/* Chips de cidade */}
        <div className="mb-3">
          <div className="text-sm text-gray-600 mb-1">Cidade</div>
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1 text-sm rounded-full transition border ${cidade === '' ? 'bg-blue-800 text-white border-blue-800' : 'bg-white border-gray-300 hover:bg-gray-200'}`}
              onClick={()=> setCidade('')}
            >
              Todas
            </button>
            {Array.from(new Set((items||[]).map(i=>i.cidade).filter(Boolean))).sort().map((c)=>(
              <button
                key={c}
                className={`px-3 py-1 text-sm rounded-full transition border ${cidade === c ? 'bg-blue-800 text-white border-blue-800' : 'bg-white border-gray-300 hover:bg-gray-200'}`}
                onClick={()=> setCidade(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        {/* Chips de status */}
        <div className="mb-3">
          <div className="text-sm text-gray-600 mb-1">Status</div>
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1 text-sm rounded-full transition border ${statusFiltro === '' ? 'bg-blue-800 text-white border-blue-800' : 'bg-white border-gray-300 hover:bg-gray-200'}`}
              onClick={()=> setStatusFiltro('')}
            >
              Todos
            </button>
            {['ABERTO','EM_ANDAMENTO','FECHADO'].map(s => (
              <button
                key={s}
                className={`px-3 py-1 text-sm rounded-full transition border ${statusFiltro === s ? 'bg-blue-800 text-white border-blue-800' : 'bg-white border-gray-300 hover:bg-gray-200'}`}
                onClick={()=> setStatusFiltro(s)}
              >
                {s === 'ABERTO' ? 'Aberto' : s === 'FECHADO' ? 'Fechado' : 'Em andamento'}
              </button>
            ))}
          </div>
        </div>
        {/* Chips de contato */}
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-3 py-1 text-sm rounded-full transition border ${comTelefone ? 'bg-blue-800 text-white border-blue-800' : 'bg-white border-gray-300 hover:bg-gray-200'}`}
            onClick={()=> setComTelefone(v=>!v)}
          >
            Com telefone
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-full transition border ${comEmail ? 'bg-blue-800 text-white border-blue-800' : 'bg-white border-gray-300 hover:bg-gray-200'}`}
            onClick={()=> setComEmail(v=>!v)}
          >
            Com email
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-full transition border ${comHorario ? 'bg-blue-800 text-white border-blue-800' : 'bg-white border-gray-300 hover:bg-gray-200'}`}
            onClick={()=> setComHorario(v=>!v)}
          >
            Com horário
          </button>
          <button
            onClick={()=>{ setQ(''); setCidade(''); setStatusFiltro(''); setComTelefone(false); setComEmail(false); setComHorario(false); }}
            className="ml-auto px-3 py-1 text-sm rounded-full transition border bg-white border-gray-300 hover:bg-gray-200"
          >
            Limpar filtros
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-full transition border ${onlyFav ? 'bg-blue-800 text-white border-blue-800' : 'bg-white border-gray-300 hover:bg-gray-200'}`}
            onClick={()=> setOnlyFav(v=>!v)}
          >
            Somente favoritos
          </button>
        </div>
        {/* Tags */}
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
        {/* Cursos */}
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

      {/* Lista de cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
      {loading && <div className="col-span-1 md:col-span-2 lg:col-span-3">Carregando estágios...</div>}
      {error && <div className="col-span-1 md:col-span-2 lg:col-span-3 text-red-600 mb-4">{error}</div>}
      {(items
        .filter((it)=>{
          if (!q) return true;
          const text = `${it.titulo||''} ${it.descricao||''}`.toLowerCase();
          return text.includes(q.toLowerCase());
        })
        .filter((it)=> cidade ? (it.cidade === cidade) : true)
        .filter((it)=> statusFiltro ? (String(it.status||'').toUpperCase() === statusFiltro) : true)
        .filter((it)=> comTelefone ? Boolean(it.telefone) : true)
        .filter((it)=> comEmail ? Boolean(it.email) : true)
        .filter((it)=> comHorario ? Boolean(it.horario) : true)
        .filter((it)=> onlyFav ? favIds.has(String(it.id)) : true)
        .filter((it)=> tagSel.length ? (Array.isArray(it.tags) && tagSel.every(t=> it.tags.includes(t))) : true)
        .filter((it)=> cursoSel.length ? (Array.isArray(it.cursos) && cursoSel.every(c=> it.cursos.includes(c))) : true)
      ).map((item) => {
        const jaInscrito = inscritosIds.has(String(item.id));
        const fechado = String(item.status || '').toUpperCase() === 'FECHADO';
        const isFav = favIds.has(String(item.id));
        const actions = aluno ? (
          <button
            onClick={() => !jaInscrito && !fechado && inscrever(item.id)}
            disabled={jaInscrito || fechado}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition border ${
              jaInscrito || fechado
                ? 'bg-gray-200 text-gray-600 border-gray-300 cursor-not-allowed'
                : 'bg-blue-600 text-white border-blue-700 hover:bg-blue-700'
            }`}
          >
            {jaInscrito ? 'Inscrito' : (fechado ? 'Inscrições encerradas' : 'Inscrever-se')}
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
            setor={"Estágio"}
            titulo={item.titulo}
            desc={item.descricao}
            local={item.cidade || item.link || ""}
            tel={item.telefone || ""}
            mail={item.email || ""}
            horario={item.horario || (item.dataLimite ? new Date(item.dataLimite).toLocaleDateString() : "")}
            status={item.status}
            tags={item.tags || []}
            cursos={item.cursos || []}
            actions={<div className="flex items-center">{actions}{favBtn}</div>}
          />
        );
      })}
        {items.length === 0 && !loading && (
        <div className="col-span-1 md:col-span-2 lg:col-span-3 text-gray-500">Nenhum estágio encontrado.</div>
      )}
      </div>
    </div>
  );
}