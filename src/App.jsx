import React, { useState, useEffect } from "react";
import Header from "./components/Header";
// Full-screen login gate replaces sidebar
import Login from "./components/ui/Login";
import Menu from "./components/Menu";
import AdminPainel from "./components/AdminPainel";
import { isAdmin as checkIsAdmin, getUserId, migrateFavoritesForUser } from './utils/auth';

export default function App() {
  // Remove sidebar flow; gate with full-screen login instead
  const [modoAdmin, setModoAdmin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [fade, setFade] = useState(false);

  // -------- LOGIN FULLSCREEN (no sidebar) --------
  const handleLoginSuccess = (data) => {
    try { localStorage.setItem('user', JSON.stringify(data.user)); } catch (e) {}
    setUser(data.user);
    setIsAdmin(checkIsAdmin());
    // Migrate legacy favorites to per-user keys
    try {
      const uid = getUserId();
      if (uid) migrateFavoritesForUser(uid);
    } catch (_) {}
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
      {/* Gate: show full-screen login if not authenticated */}
      { !user ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          {/* Cabeçalho */}
          <Header onAdminClick={handleToggleAdmin} isAdmin={isAdmin} user={user} onLogout={handleLogout} />

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
        </>
      )}
    </div>
  );
}
