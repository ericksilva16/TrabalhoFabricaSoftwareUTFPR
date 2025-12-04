import React from "react";
import { MdLogin, MdAdminPanelSettings } from "react-icons/md";

export default function Header({ onLoginClick, onAdminClick, isAdmin, user, onLogout }) {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 shadow-lg">
      <div className="flex items-center gap-3">
        <h1 className="text-white text-2xl font-bold tracking-wide drop-shadow">
          Portal Universitário
        </h1>
      </div>

      <div className="flex gap-3">
        {/* If user is not logged, show Login button */}
        {!user && (
          <button
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-xl border border-white/20 transition shadow"
            onClick={onLoginClick}
          >
            <MdLogin size={22} />
            <span className="font-medium">Entrar</span>
          </button>
        )}

        {/* Show username and Logout when logged */}
        {user && (
          <div className="flex items-center gap-3">
            <span className="text-white font-medium">{user.nome || user.name || user.email}</span>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 transition"
            >
              Sair
            </button>
          </div>
        )}

        {/* Botão de Admin - aparece apenas para administradores */}
        {isAdmin && (
          <button
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-xl border border-yellow-600 transition shadow"
            onClick={onAdminClick}
          >
            <MdAdminPanelSettings size={22} />
            <span className="font-medium">Admin</span>
          </button>
        )}
      </div>
    </header>
  );
}
