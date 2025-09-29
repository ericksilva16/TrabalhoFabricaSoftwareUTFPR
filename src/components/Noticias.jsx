import React from "react"

export default function Noticias() {
    return (
        <>
            <div className="w-[80%] h-[650px] mx-auto">
                <h1 className="text-6xl mb-6">Notícias da Semana</h1>

                <div className="flex gap-4 h-full">
                    {/* div notícia principal à esquerda */}
                    <div className="flex-1 bg-red-400 rounded-lg flex items-center justify-center">
                        <p className="text-white text-xl">Notícia em destaque</p>
                    </div>

                    {/* div notícias secundarias à direita */}
                    <div className="flex flex-col gap-4 flex-1">
                        <div className="flex-1 bg-blue-400 rounded-lg flex items-center justify-center">
                            <p className="text-white">Notícia secundária 1</p>
                        </div>
                        <div className="flex-1 bg-green-400 rounded-lg flex items-center justify-center">
                            <p className="text-white">Notícia secundária 2</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
