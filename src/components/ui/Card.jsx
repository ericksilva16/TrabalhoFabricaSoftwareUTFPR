import React from 'react';
import { MdPlace, MdPhone, MdEmail, MdAccessTime } from 'react-icons/md';

export default function Card({ setor, titulo, desc, local, tel, mail, horario, actions, descMax = 160, titleMax = 60 }) {
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
    return (
        <div className="
            bg-white rounded-xl shadow p-6 w-full h-80 max-w-md mt-10 mx-auto border border-black/10
            transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-500 cursor-pointer
        ">
            <div>
                <div className='flex justify-between items-center'>
                    <h2 className="text-xl font-bold mb-1 truncate">{shortTitle}</h2>
                    <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg w-fit">
                        <p className="text-sm text-gray-500">{setor}</p>
                    </div>
                </div>
                <p className="mt-2 text-gray-700 overflow-hidden">
                    {shortDesc}
                </p>
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
