import { StrictMode } from 'react'
import './Header.css';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

export default function Header() {
  return (
    <header>
      <div className="header-top">
        <span className="logo">gov.br</span>
        <nav>
          <a href="#">COMUNICA BR</a>
          <a href="#">ACESSO À INFORMAÇÃO</a>
          <a href="#">PARTICIPE</a>
          <a href="#">LEGISLAÇÃO</a>
          <a href="#">ÓRGÃOS DO GOVERNO</a>
        </nav>
      </div>
      <div className="header-bottom">
        <span className="portal-title">Meu portal personalizado</span>
        <select>
          <option>Estudante</option>
        </select>
        <select>
          <option>Dois Vizinhos</option>
        </select>
        <span className="icons">
          <span title="Modo escuro">🌙</span>
          <span title="Acessibilidade">🧑‍🦯</span>
        </span>
        <select>
          <option>PT</option>
        </select>
        <button className="entrar-btn">Entrar</button>
      </div>
    </header>
  );
}