import React, { useState, useEffect } from "react"
import NewsCard from "./ui/NewsCard";
import AvisoCard from "./ui/AvisoCard";

const API_BASE = 'http://localhost:3000/api/v1';

function Noticias({ onNoticiaSelecionada }) {
    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function fetchNoticias() {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_BASE}/noticias`);
            if (!res.ok) throw new Error('Falha ao carregar notícias');
            const data = await res.json();
            setNoticias(Array.isArray(data) ? data : []);
        } catch (e) {
            setError(e.message);
        } finally { setLoading(false); }
    }

    useEffect(() => { fetchNoticias(); }, []);

    const primeiraNoticia = noticias[0];
    const outrasNoticias = noticias.slice(1, 3);
    const restNoticias = noticias.slice(3);

    const truncarTexto = (texto, limite) => {
        if (!texto) return '';
        return texto.length > limite ? texto.substring(0, limite) + '...' : texto;
    };

    const handleNoticiaSelecionada = (noticia) => {
        if (onNoticiaSelecionada) {
            onNoticiaSelecionada(noticia);
        }
    };

    return (
        <>
            <div className="w-[%] mx-auto px-4 py-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Notícias da Semana</h1>

                {error && <div className="text-red-600 mb-4">{error}</div>}
                {loading && <div className="text-gray-500 mb-4">Carregando notícias...</div>}

                <div className="flex flex-col md:flex-row gap-4">
                    {/* Notícia principal à esquerda */}
                    {primeiraNoticia && (
                        <div
                            onClick={() => handleNoticiaSelecionada(primeiraNoticia)}
                            className="relative md:flex-1 rounded-lg flex items-start justify-end flex-col 
                            bg-gradient-to-b from-transparent to-black/70
                            transform transition duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer min-h-[300px] md:min-h-[420px] bg-gray-300"
                            style={primeiraNoticia.imageUrl ? {
                                backgroundImage: `url(${primeiraNoticia.imageUrl})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            } : {}}
                        >
                            <div className="relative w-full md:w-4/5 p-6 md:p-12 mt-auto">
                                <h2 className="text-white mb-2 text-2xl md:text-3xl lg:text-4xl font-semibold line-clamp-2">{primeiraNoticia.titulo}</h2>
                                <p className="text-white text-sm md:text-base line-clamp-1 mb-2">{truncarTexto(primeiraNoticia.descricao, 80)}</p>
                                <button className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition duration-300 cursor-pointer">
                                    Ler mais
                                </button>   
                            </div>
                        </div>
                    )}

                    {/* Notícias secundárias à direita */}
                    <div className="flex flex-col gap-4 md:flex-1">
                        {outrasNoticias.map((noticia) => (
                            <div
                                key={noticia.id}
                                onClick={() => handleNoticiaSelecionada(noticia)}
                                className="relative rounded-lg flex items-start justify-end flex-col 
                                bg-gradient-to-b from-transparent to-black/70
                                transform transition duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer min-h-[140px] md:min-h-[200px] bg-gray-300"
                                style={noticia.imageUrl ? {
                                    backgroundImage: `url(${noticia.imageUrl})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                } : {}}
                            >
                                <div className="relative w-full md:w-4/5 p-6 md:p-10 mt-auto">
                                    <h2 className="text-white mb-2 text-xl md:text-2xl font-semibold line-clamp-1">{noticia.titulo}</h2>
                                    <p className="text-white text-sm md:text-sm line-clamp-1 mb-2">{truncarTexto(noticia.descricao, 60)}</p>
                                    <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition duration-300 cursor-pointer">
                                        Ler mais
                                    </button>   
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {restNoticias.length > 0 && (
                    <div className="h-auto mt-20 px-0 w-full">
                        <div className="grid gap-8 
                                        grid-cols-1 
                                        sm:grid-cols-2 
                                        md:grid-cols-3 
                                        lg:grid-cols-4
                                        justify-start">
                            {restNoticias.map((noticia) => (
                                <div 
                                    key={noticia.id}
                                    onClick={() => handleNoticiaSelecionada(noticia)}
                                    className="cursor-pointer"
                                >
                                    <NewsCard titulo={noticia.titulo} descricao={noticia.descricao} imageUrl={noticia.imageUrl} linkUrl={noticia.linkUrl} data={noticia.createdAt} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">Avisos</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {noticias.length > 0 ? (
                            noticias.slice(0, 2).map((aviso) => (
                                <div key={aviso.id}>
                                    <AvisoCard title={aviso.titulo} date={aviso.createdAt ? new Date(aviso.createdAt).toLocaleDateString('pt-BR') : ''}>
                                        {aviso.descricao}
                                    </AvisoCard>
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-500">Nenhum aviso disponível.</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Noticias;
