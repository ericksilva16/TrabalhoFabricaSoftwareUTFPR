import React, { useState } from 'react';
import { MdLogin } from 'react-icons/md';

export default function SideBar({ onClose, onLoginSuccess }) {
    const [mode, setMode] = useState('login'); // 'login' | 'register'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nome, setNome] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    async function handleLogin(e) {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        try {
            const res = await fetch('http://localhost:3000/api/v1/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // Backend expects { email, senha }
                body: JSON.stringify({ email: email.trim(), senha: password })
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Erro ao autenticar');
                setLoading(false);
                return;
            }

            // data should contain { user, token }
            if (data.token) {
                try {
                    localStorage.setItem('token', data.token);
                } catch (e) {
                    console.error('Erro ao gravar token no localStorage', e);
                }
            }

            setLoading(false);

            if (typeof onLoginSuccess === 'function') onLoginSuccess(data);

        } catch (err) {
            console.error(err);
            setError('Falha na conexão');
            setLoading(false);
        }
    }

    async function handleRegister(e) {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);
        try {
            const res = await fetch('http://localhost:3000/api/v1/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome: nome.trim(), email: email.trim(), senha: password, senhaConfirm: confirm })
            });
            const data = await res.json();
            if (!res.ok) {
                // Show validation errors nicely if present
                const msg = data?.message || 'Erro ao registrar';
                setError(msg);
                setLoading(false);
                return;
            }
            setSuccess('Cadastro realizado! Faça login para continuar.');
            setLoading(false);
            // Optionally switch to login mode
            setMode('login');
        } catch (err) {
            console.error(err);
            setError('Falha na conexão');
            setLoading(false);
        }
    }

    return (
                <div className="w-80 h-screen bg-white shadow-xl flex flex-col items-center py-10">
            <div className="flex flex-col items-center mb-8">
                                <MdLogin size={40} className="text-blue-800 mb-2" />
                                <h1 className="text-2xl font-bold text-blue-900">{mode === 'login' ? 'Login' : 'Cadastro'}</h1>
            </div>
            <div className="w-full px-6 text-center">
                                {mode === 'login' ? (
                                    <>
                                        <h2 className="text-lg font-semibold text-gray-700 mb-1">Entrar</h2>
                                        <p className="text-sm text-gray-500 mb-6">Acesse sua conta do Portal Universitário</p>
                                        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                                            <div className="flex flex-col gap-1">
                                                <label htmlFor="email" className="text-sm text-gray-700 font-medium">Email</label>
                                                <input type="email" id="email" name="email" required value={email} onChange={e => setEmail(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" placeholder="seu@email.com" />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <label htmlFor="password" className="text-sm text-gray-700 font-medium">Senha</label>
                                                <input type="password" id="password" name="password" required value={password} onChange={e => setPassword(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" placeholder="••••••••" />
                                            </div>
                                            {error && <div className="text-red-600 text-sm">{error}</div>}
                                            {success && <div className="text-green-700 text-sm">{success}</div>}
                                            <div className="flex gap-2 mt-2">
                                                <button type="submit" disabled={loading} className="flex-1 bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 rounded-lg transition shadow">{loading ? 'Entrando...' : 'Entrar'}</button>
                                                <button type="button" onClick={() => setMode('register')} className="px-3 py-2 rounded-lg border">Criar conta</button>
                                                <button type="button" onClick={onClose} className="px-3 py-2 rounded-lg border">Fechar</button>
                                            </div>
                                        </form>
                                    </>
                                ) : (
                                    <>
                                        <h2 className="text-lg font-semibold text-gray-700 mb-1">Cadastro</h2>
                                        <p className="text-sm text-gray-500 mb-6">Crie sua conta para acessar o portal</p>
                                        <form className="flex flex-col gap-4" onSubmit={handleRegister}>
                                            <div className="flex flex-col gap-1">
                                                <label htmlFor="nome" className="text-sm text-gray-700 font-medium">Nome</label>
                                                <input type="text" id="nome" name="nome" required value={nome} onChange={e => setNome(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" placeholder="Seu nome completo" />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <label htmlFor="email" className="text-sm text-gray-700 font-medium">Email</label>
                                                <input type="email" id="email" name="email" required value={email} onChange={e => setEmail(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" placeholder="seu@email.com" />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <label htmlFor="password" className="text-sm text-gray-700 font-medium">Senha</label>
                                                <input type="password" id="password" name="password" required value={password} onChange={e => setPassword(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" placeholder="••••••••" />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <label htmlFor="confirm" className="text-sm text-gray-700 font-medium">Confirmar senha</label>
                                                <input type="password" id="confirm" name="confirm" required value={confirm} onChange={e => setConfirm(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" placeholder="••••••••" />
                                            </div>
                                            {error && <div className="text-red-600 text-sm">{error}</div>}
                                            {success && <div className="text-green-700 text-sm">{success}</div>}
                                            <div className="flex gap-2 mt-2">
                                                <button type="submit" disabled={loading} className="flex-1 bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 rounded-lg transition shadow">{loading ? 'Cadastrando...' : 'Cadastrar'}</button>
                                                <button type="button" onClick={() => setMode('login')} className="px-3 py-2 rounded-lg border">Já tenho conta</button>
                                                <button type="button" onClick={onClose} className="px-3 py-2 rounded-lg border">Fechar</button>
                                            </div>
                                        </form>
                                    </>
                                )}
            </div>
        </div>
    );
}