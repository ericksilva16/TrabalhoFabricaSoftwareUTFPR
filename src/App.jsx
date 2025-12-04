import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SideBar from "./components/ui/SideBar";
import Menu from "./components/Menu";
import AdminPainel from "./components/AdminPainel";
import { isAdmin as checkIsAdmin } from './utils/auth';

export default function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [modoAdmin, setModoAdmin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [closing, setClosing] = useState(false);
  const [fade, setFade] = useState(false);

  // -------- LOGIN SIDEBAR --------
  const handleOpenLogin = () => {
    setShowSidebar(true);
    setClosing(false);
  };

  const handleCloseLogin = () => {
    setClosing(true);
    setTimeout(() => {
      setShowSidebar(false);
      setClosing(false);
    }, 350);
  };

  // -------- ADMIN MODE --------
  const handleToggleAdmin = () => {
    if (modoAdmin) {
      setFade(true);
      setTimeout(() => {
        setModoAdmin(false);
        setFade(false);
      }, 350);
    } else {
      // Only allow toggling into admin mode if client detects admin role
      if (isAdmin) setModoAdmin(true);
    }
  };

  useEffect(() => {
    // On mount, check whether logged user is admin
    try {
      setIsAdmin(checkIsAdmin());
      // restore user from localStorage if present
      const raw = localStorage.getItem('user');
      if (raw) {
        try { setUser(JSON.parse(raw)); } catch (e) { setUser(null); }
      }
    } catch (e) {
      setIsAdmin(false);
    }
  }, []);

  function handleLogout() {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (e) {}
    setUser(null);
    setIsAdmin(false);
    setModoAdmin(false);
  }

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Cabeçalho com dois botões */}
      <Header onLoginClick={handleOpenLogin} onAdminClick={handleToggleAdmin} isAdmin={isAdmin} user={user} onLogout={handleLogout} />

      {/* Conteúdo principal */}
      <div
        className={`transition-opacity duration-300 ${
          fade ? "opacity-0" : "opacity-100"
        }`}
      >
        {!modoAdmin ? (
          <Menu />
        ) : (
          <div className="p-6">
            <AdminPainel />
            <div className="flex justify-center mt-10">
              <button
                onClick={handleToggleAdmin}
                className="px-6 py-3 bg-gray-200 text-blue-900 font-semibold rounded-lg hover:bg-gray-300 transition-all"
              >
                ← Voltar ao Portal
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SIDEBAR LOGIN */}
      {showSidebar && (
        <>
          <div
            className={`fixed inset-0 bg-white/70 z-40 transition-opacity duration-300 ${
              closing ? "animate-fade-out" : "animate-fade-in"
            }`}
            onClick={handleCloseLogin}
          />
          <div className="fixed right-0 top-0 z-50 h-full">
            <div
              className={`h-full ${
                closing ? "animate-slide-out" : "animate-slide-in"
              }`}
            >
              <SideBar onClose={handleCloseLogin} onLoginSuccess={(data) => { 
                // data is expected to be { user, token }
                try { localStorage.setItem('user', JSON.stringify(data.user)); } catch (e) {}
                setUser(data.user);
                setIsAdmin(checkIsAdmin());
                handleCloseLogin();
              }} />
            </div>
          </div>
        </>
      )}

      {/* Tailwind custom animations */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease;
          }
          @keyframes fade-out {
            from { opacity: 1; }
            to { opacity: 0; }
          }
          .animate-fade-out {
            animation: fade-out 0.3s ease;
          }
          @keyframes slide-in {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          .animate-slide-in {
            animation: slide-in 0.35s cubic-bezier(0.4,0,0.2,1);
          }
          @keyframes slide-out {
            from { transform: translateX(0); }
            to { transform: translateX(100%); }
          }
          .animate-slide-out {
            animation: slide-out 0.35s cubic-bezier(0.4,0,0.2,1);
          }
        `}
      </style>
    </div>
  );
}
