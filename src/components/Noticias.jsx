import React from "react"
import NewsCard from "./ui/NewsCard";
import AvisoCard from "./ui/AvisoCard";

function Noticias() {
    return (
        <>
            <div className="w-[%] mx-auto px-4 py-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Notícias da Semana</h1>

                <div className="flex flex-col md:flex-row gap-4">
                    {/* div notícia principal à esquerda */}
                    <div className="relative md:flex-1 rounded-lg flex items-start justify-end flex-col 
                    bg-[url(./assets/news-img.jpg)] bg-cover bg-center bg-no-repeat
                    transform transition duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer min-h-[300px] md:min-h-[420px]">
                        <div className="absolute inset-0 bg-black/50 rounded-lg"></div>
                        <div className="relative w-full md:w-4/5 p-6 md:p-12 mt-auto">
                            <h2 className="text-white mb-4 text-2xl md:text-3xl lg:text-4xl font-semibold">Notícia 1</h2>
                            <p className="text-white text-sm md:text-lg">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, officia doloribus consequuntur explicabo esse, eligendi id atque beatae autem deleniti soluta omnis? Laborum exercitationem, corrupti quia maxime vel minus natus!</p>
                            <button className="mt-4 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition duration-300 cursor-pointer">
                                Ler mais
                            </button>   
                        </div>
                    </div>

                    {/* div notícias secundarias à direita */}
                    <div className="flex flex-col gap-4 md:flex-1">
                        <div className="relative rounded-lg flex items-start justify-end flex-col 
                        bg-[url(./assets/news-img2.jpg)] bg-cover bg-center bg-no-repeat
                        transform transition duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer min-h-[140px] md:min-h-[200px]">
                            <div className="absolute inset-0 bg-black/50 rounded-lg"></div>

                            <div className="relative w-full md:w-4/5 p-6 md:p-10 mt-auto">
                                <h2 className="text-white mb-3 text-xl md:text-2xl font-semibold">Notícia 2</h2>
                                <p className="text-white text-sm md:text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum voluptatibus odit cupiditate aperiam ab voluptatem illo possimus inventore? Error, optio doloribus? Magni amet et omnis ex, delectus id quasi blanditiis.</p>
                                <button className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition duration-300 cursor-pointer">
                                    Ler mais
                                </button>   
                            </div>
                        </div>
                        <div className="relative rounded-lg flex items-start justify-end flex-col 
                        bg-[url(./assets/news-img3.jpg)] bg-cover bg-center bg-no-repeat
                        transform transition duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer min-h-[140px] md:min-h-[200px]">
                            <div className="absolute inset-0 bg-black/50 rounded-lg"></div>
                            
                            <div className="relative w-full md:w-4/5 p-6 md:p-10 mt-auto">
                                <h2 className="text-white mb-3 text-xl md:text-2xl font-semibold">Notícia 3</h2>
                                <p className="text-white text-sm md:text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum voluptatibus odit cupiditate aperiam ab voluptatem illo possimus inventore? Error, optio doloribus? Magni amet et omnis ex, delectus id quasi blanditiis.</p>
                                <button className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition duration-300 cursor-pointer">
                                    Ler mais
                                </button>   
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-auto mt-20 px-0 w-full">
                    <div className="grid gap-8 
                                    grid-cols-1 
                                    sm:grid-cols-2 
                                    md:grid-cols-3 
                                    lg:grid-cols-4
                                    justify-start">
                        <NewsCard />
                        <NewsCard />
                        <NewsCard />
                        <NewsCard />
                        <NewsCard />
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">Avisos</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <AvisoCard title="Mudança no horário da secretaria" date="01 Dez 2025">
                                A secretaria funcionará em regime especial na próxima semana, das 09:00 às 13:00.
                            </AvisoCard>
                        </div>

                        <div>
                            <AvisoCard title="Palestra sobre estágios" date="30 Nov 2025">
                                Aula aberta com orientações sobre cadastro e oportunidades de estágio para alunos de todos os cursos.
                            </AvisoCard>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Noticias;
