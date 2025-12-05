import React from 'react';
import { MdPlace, MdPhone, MdEmail, MdAccessTime } from 'react-icons/md';

export default function Card({ setor, titulo, desc, local, tel, mail, horario, actions }) {
    return (
        <div className="
            bg-white rounded-xl shadow p-6 w-full h-80 max-w-md mt-10 mx-auto border border-black/10
            transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-500 cursor-pointer
        ">
            <div>
                <div className='flex justify-between items-center'>
                    <h2 className="text-xl font-bold mb-1">{titulo}</h2>
                    <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg w-fit">
                        <p className="text-sm text-gray-500">{setor}</p>
                    </div>
                </div>
                <p className="mt-2 text-gray-700">
                    {desc}
                </p>
            </div>

            <div className="mt-4 space-y-1 text-gray-600">
                <p className="flex items-center gap-2">
                    <MdPlace /> {local}
                </p>
                <p className="flex items-center gap-2">
                    <MdPhone /> {tel}
                </p>
                <p className="flex items-center gap-2">
                    <MdEmail /> {mail}
                </p>
                <p className="flex items-center gap-2">
                    <MdAccessTime /> {horario}
                </p>
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
