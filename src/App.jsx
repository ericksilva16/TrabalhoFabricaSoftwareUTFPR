import React, { useState } from 'react';
import Header from './components/header';
import SideBar from './components/ui/SideBar';
import Menu from './components/Menu';
import Noticias from './components/Noticias'

export default function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [closing, setClosing] = useState(false);

  const handleOpen = () => {
    setShowSidebar(true);
    setClosing(false);
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setShowSidebar(false);
      setClosing(false);
    }, 350); // tempo igual ao da animação
  };

  return (
    <div className="relative min-h-screen">
      <Header onLoginClick={handleOpen} />
      <Menu />
      {showSidebar && (
        <>
          {/* Overlay animado */}
          <div
            className={`fixed inset-0 bg-white/70 z-40 transition-opacity duration-300 ${closing ? 'animate-fade-out' : 'animate-fade-in'}`}
            onClick={handleClose}
          />
          {/* Sidebar animada */}
          <div className="fixed right-0 top-0 z-50 h-full">
            <div className={`h-full ${closing ? 'animate-slide-out' : 'animate-slide-in'}`}>
              <SideBar />
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