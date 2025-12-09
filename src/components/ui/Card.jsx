import React from 'react';
import { MdPlace, MdPhone, MdEmail, MdAccessTime } from 'react-icons/md';

export default function Card({ setor, titulo, desc, local, tel, mail, horario, status, actions, descMax = 160, titleMax = 60, tags = [], cursos = [] }) {
    const shortDesc = (() => {
        if (!desc) return '';
        const text = String(desc);
        if (text.length <= descMax) return text;
        return text.slice(0, descMax).trimEnd() + '…';
    })();
    const shortTitle = (() => {
        if (!titulo) return '';
        const text = String(titulo);
        if (text.length <= titleMax) return text;
        return text.slice(0, titleMax).trimEnd() + '…';
    })();

    const statusUpper = String(status || '').toUpperCase();
    const statusCfg = (() => {
        switch (statusUpper) {
            case 'ABERTO':
                return { label: 'Aberto', cls: 'bg-green-100 text-green-800 border-green-200' };
            case 'FECHADO':
                return { label: 'Fechado', cls: 'bg-red-100 text-red-800 border-red-200' };
            case 'EM_ANDAMENTO':
                return { label: 'Em andamento', cls: 'bg-amber-100 text-amber-800 border-amber-200' };
            default:
                return status ? { label: String(status), cls: 'bg-gray-100 text-gray-800 border-gray-200' } : null;
        }
    })();
    return (
        <div className="
            bg-white rounded-xl shadow p-6 w-full max-w-md mt-10 mx-auto border border-black/10 overflow-hidden
            transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-500 cursor-pointer
        ">
            <div>
                                <div className='flex justify-between items-center'>
                    <h2 className="text-xl font-bold mb-1 truncate">{shortTitle}</h2>
                                        <div className="flex items-center gap-2 w-fit">
                                                {statusCfg && (
                                                    <span className={`px-2 py-1 rounded-lg border text-xs font-medium ${statusCfg.cls}`}>{statusCfg.label}</span>
                                                )}
                                                {setor && (
                                                    <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-lg w-fit">
                                                            <p className="text-sm text-gray-500">{setor}</p>
                                                    </div>
                                                )}
                    </div>
                </div>
                <p className="mt-2 text-gray-700 overflow-hidden">
                    {shortDesc}
                </p>
                {(tags?.length || cursos?.length) && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {tags?.map((t, idx) => (
                            <span key={`tag-${idx}`} className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">{t}</span>
                        ))}
                        {cursos?.map((c, idx) => (
                            <span key={`curso-${idx}`} className="text-xs px-2 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">{c}</span>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-4 space-y-1 text-gray-600">
                {(local || tel || mail || horario) && (
                    <>
                        {local && (
                            <p className="flex items-center gap-2">
                                <MdPlace /> {local}
                            </p>
                        )}
                        {tel && (
                            <p className="flex items-center gap-2">
                                <MdPhone /> {tel}
                            </p>
                        )}
                        {mail && (
                            <p className="flex items-center gap-2">
                                <MdEmail /> {mail}
                            </p>
                        )}
                        {horario && (
                            <p className="flex items-center gap-2">
                                <MdAccessTime /> {horario}
                            </p>
                        )}
                    </>
                )}
                <div className='bg-white p-2 rounded-lg w-fit mt-2 border border-black/10'>
                    <p className='text-[13px]'>{setor}</p>
                </div>
                {actions && (
                    <div className="mt-4">
                        {actions}
                    </div>
                )}
            </div>
        </div>
    );
}
