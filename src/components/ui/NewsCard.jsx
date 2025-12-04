import React from "react";
import newsPhoto from "../../assets/news-photo1.jpg";
import authorPhoto from "../../assets/author-photo.jpg";

export default function NewsCard() {
  return (
    <div className="w-full bg-white rounded-3xl shadow p-4 sm:p-5 flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 cursor-pointer">
      {/* Topo */}
      <div className="flex items-center text-sm text-gray-500">
        <p className="font-semibold">BLOG</p>
        <span className="ml-3">10 JUL 2025</span>
      </div>

      {/* Título */}
      <div className="mt-2">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
          Lorem Ipsom Dolor
        </h1>
      </div>

      {/* Imagem */}
      <div className="w-full h-44 sm:h-48 mt-3 overflow-hidden rounded-xl">
        <img
          className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out hover:scale-110"
          src={newsPhoto}
          alt="Notícia"
        />
      </div>

      {/* Subtítulo */}
      <div className="mt-4 font-semibold text-gray-900 text-sm sm:text-base">
        Luiz Gustavo é eleito melhor aluno da UTFPR
      </div>

      {/* Autor */}
      <div className="flex items-center mt-4">
        <img
          src={authorPhoto}
          alt="Autor"
          className="w-8 h-8 rounded-full mr-2 border border-gray-200"
        />
        <p className="text-gray-700 text-sm">Autor</p>
      </div>
    </div>
  );
}
