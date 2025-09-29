import React from "react"

export default function Noticias() {
    return (
        <>
            <div className="w-[80%] h-[650px] mx-auto">
                <h1 className="text-6xl mb-6">Notícias da Semana</h1>

                <div className="flex gap-4 h-full">
                    {/* div notícia principal à esquerda */}
                    <div className="relative flex-1 rounded-lg flex items-start justify-center flex-col 
                    bg-[url(./assets/news-img.jpg)] bg-cover bg-center bg-no-repeat
                    transform transition duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                        <div className="absolute inset-0 bg-black/50 rounded-lg"></div>
                        <div className="relative w-[80%] mt-auto p-15">
                            <h2 className="text-white mb-5 text-3xl font-semibold">Notícia 1</h2>
                            <p className="text-white text-xl">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, officia doloribus consequuntur explicabo esse, eligendi id atque beatae autem deleniti soluta omnis? Laborum exercitationem, corrupti quia maxime vel minus natus!</p>
                            <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition duration-300 cursor-pointer">
                            Ler mais
                            </button>   
                        </div>
                    </div>

                    {/* div notícias secundarias à direita */}
                    <div className="flex flex-col gap-4 flex-1">
                        <div className="relative flex-1 rounded-lg flex items-start justify-center flex-col 
                        bg-[url(./assets/news-img2.jpg)] bg-cover bg-center bg-no-repeat
                        transform transition duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                            <div className="absolute inset-0 bg-black/50 rounded-lg"></div>

                            <div className="relative w-[80%] mt-auto p-15">
                                <h2 className="text-white mb-5 text-3xl font-semibold">Notícia 2</h2>
                                <p className="text-white text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum voluptatibus odit cupiditate aperiam ab voluptatem illo possimus inventore? Error, optio doloribus? Magni amet et omnis ex, delectus id quasi blanditiis.</p>
                                <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition duration-300 cursor-pointer">
                                    Ler mais
                                </button>   
                            </div>
                        </div>
                        <div className="relative flex-1 rounded-lg flex items-start justify-center flex-col 
                        bg-[url(./assets/news-img3.jpg)] bg-cover bg-center bg-no-repeat
                        transform transition duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                            <div className="absolute inset-0 bg-black/50 rounded-lg"></div>
                            
                            <div className="relative w-[80%] mt-auto p-15">
                                <h2 className="text-white mb-5 text-3xl font-semibold">Notícia 3</h2>
                                <p className="text-white text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum voluptatibus odit cupiditate aperiam ab voluptatem illo possimus inventore? Error, optio doloribus? Magni amet et omnis ex, delectus id quasi blanditiis.</p>
                                <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition duration-300 cursor-pointer">
                                    Ler mais
                                </button>   
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-[60vh]">
                    <h1 className="text-6xl mt-20">Avisos</h1>
                    <div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}
