import React from "react";
import newsPhoto from "../../assets/news-photo1.jpg";

export default function NewsCard({ titulo, descricao, imagemUrl, linkUrl, data }) {
  const CardContent = () => (
    <div className="w-full bg-white rounded-3xl shadow p-4 sm:p-5 flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 cursor-pointer">
      {/* Topo */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <p className="font-semibold">NOTÍCIA</p>
        <span className="ml-3">{data ? new Date(data).toLocaleDateString('pt-BR') : '10 JUL 2025'}</span>
      </div>

      {/* Título */}
      <div className="mt-2">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-900 line-clamp-2">
          {titulo || 'Lorem Ipsom Dolor'}
        </h1>
      </div>

      {/* Imagem */}
      <div className="w-full h-44 sm:h-48 mt-3 overflow-hidden rounded-xl">
        <img
          className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out hover:scale-110"
          src={imagemUrl || newsPhoto}
          alt={titulo || 'Notícia'}
        />
      </div>

      {/* Subtítulo */}
      <div className="mt-4 font-semibold text-gray-900 text-sm sm:text-base line-clamp-2">
        {descricao || 'Clique para mais detalhes'}
      </div>
    </div>
  );

  if (linkUrl) {
    return (
      <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="no-underline">
        <CardContent />
      </a>
    );
  }

  return <CardContent />;
}