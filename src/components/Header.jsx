import React from 'react';
import { MdLogin } from 'react-icons/md';

export default function Header({ onLoginClick }) {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 shadow-lg">
      <div className="flex items-center gap-3">
        <h1 className="text-white text-2xl font-bold tracking-wide drop-shadow">
          Portal Universitário
        </h1>
      </div>
      <button
        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-xl border border-white/20 transition shadow"
        onClick={onLoginClick}
      >
        <MdLogin size={24} />
        <span className="font-medium">Entrar</span>
      </button>
    </header>
  );
}