import React, { useState } from 'react';
import { MdLogin } from 'react-icons/md';

export default function Login({ onLoginSuccess }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  async function handleLogin(e) {
    e.preventDefault();
    setError(null); setSuccess(null); setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), senha: password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Erro ao autenticar');
        setLoading(false);
        return;
      }
      if (data.token) {
        try { localStorage.setItem('token', data.token); } catch (e) {}
      }
      setLoading(false);
      if (typeof onLoginSuccess === 'function') onLoginSuccess(data);
    } catch (err) {
      setError('Falha na conexão');
      setLoading(false);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError(null); setSuccess(null); setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/v1/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nome.trim(), email: email.trim(), senha: password, senhaConfirm: confirm })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.message || 'Erro ao registrar');
        setLoading(false);
        return;
      }
      setSuccess('Cadastro realizado! Faça login para continuar.');
      setLoading(false);
      setMode('login');
    } catch (err) {
      setError('Falha na conexão');
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <div className="flex flex-col items-center mb-6">
          <MdLogin size={44} className="text-blue-800 mb-2" />
          <h1 className="text-2xl font-bold text-blue-900">{mode === 'login' ? 'Bem-vindo' : 'Crie sua conta'}</h1>
          <p className="text-sm text-gray-600 mt-1">Portal Universitário UTFPR</p>
        </div>

        {mode === 'login' ? (
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm text-gray-700 font-medium">Email</label>
              <input type="email" id="email" required value={email} onChange={e => setEmail(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="seu@email.com" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm text-gray-700 font-medium">Senha</label>
              <input type="password" id="password" required value={password} onChange={e => setPassword(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="••••••••" />
            </div>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            {success && <div className="text-green-700 text-sm">{success}</div>}
            <button type="submit" disabled={loading} className="w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 rounded-lg transition shadow">{loading ? 'Entrando...' : 'Entrar'}</button>
            <button type="button" onClick={() => setMode('register')} className="w-full mt-2 border border-gray-300 rounded-lg py-2">Criar conta</button>
          </form>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleRegister}>
            <div className="flex flex-col gap-1">
              <label htmlFor="nome" className="text-sm text-gray-700 font-medium">Nome</label>
              <input type="text" id="nome" required value={nome} onChange={e => setNome(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Seu nome completo" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm text-gray-700 font-medium">Email</label>
              <input type="email" id="email" required value={email} onChange={e => setEmail(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="seu@email.com" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm text-gray-700 font-medium">Senha</label>
              <input type="password" id="password" required value={password} onChange={e => setPassword(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="••••••••" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="confirm" className="text-sm text-gray-700 font-medium">Confirmar senha</label>
              <input type="password" id="confirm" required value={confirm} onChange={e => setConfirm(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="••••••••" />
            </div>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            {success && <div className="text-green-700 text-sm">{success}</div>}
            <button type="submit" disabled={loading} className="w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 rounded-lg transition shadow">{loading ? 'Cadastrando...' : 'Cadastrar'}</button>
            <button type="button" onClick={() => setMode('login')} className="w-full mt-2 border border-gray-300 rounded-lg py-2">Já tenho conta</button>
          </form>
        )}
      </div>
    </div>
  );
}
