import React from 'react';
import { MdLogin } from 'react-icons/md';

export default function SideBar() {
    return (
        <div className="w-72 h-screen bg-white shadow-xl flex flex-col items-center py-10">
            <div className="flex flex-col items-center mb-8">
                <MdLogin size={40} className="text-blue-800 mb-2" />
                <h1 className="text-2xl font-bold text-blue-900">Login</h1>
            </div>
            <div className="w-full px-6 text-center">
                <h2 className="text-lg font-semibold text-gray-700 mb-1">Entrar</h2>
                <p className="text-sm text-gray-500 mb-6">Acesse sua conta do Portal Universitário</p>
                <form className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-sm text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            placeholder="seu@email.com"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="text-sm text-gray-700 font-medium">Senha</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-2 bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 rounded-lg transition shadow"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}