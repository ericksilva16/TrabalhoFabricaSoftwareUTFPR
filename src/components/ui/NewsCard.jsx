import React from "react"

export default function NewsCard() {
    return(
        <div className="w-90 h-110 bg-white rounded-4xl mt-10">
            <div className="flex">
                <p className="">BLOG</p>
                <span className="ml-10">10 JUL 2025</span>
            </div>
            <div>
                <h1>Lorem Ipsom Dolor</h1>
            </div>
            <div>
                <img src="" alt="" />
            </div>
            <div>
                Luiz Gustavo é eleito melhor aluno da UTFPR
            </div>
            <div>
                <div><img src="" alt="" /></div>
                <p>Erinaldo Pereira</p>
            </div>
        </div>
    );
}