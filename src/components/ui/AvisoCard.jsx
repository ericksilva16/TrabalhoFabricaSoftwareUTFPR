import React from 'react';

export default function AvisoCard({ title = 'Aviso importante', date = '02 Dez 2025', children }) {
  return (
    <div className="w-full bg-white rounded-2xl shadow-md p-4 sm:p-6 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500 font-medium">AVISO</div>
        <div className="text-xs text-gray-400">{date}</div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

      <div className="text-sm text-gray-700">{children || 'Nenhum detalhe adicional fornecido para este aviso.'}</div>

      <div className="mt-2">
        <button className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition">
          Ver mais
        </button>
      </div>
    </div>
  );
}
