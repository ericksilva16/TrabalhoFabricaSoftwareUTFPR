import React from 'react';
import { FormInput, FormTextarea, FormSelect } from './FormUtils'; // Importa nossos helpers

export default function FormNovaNoticia() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold mb-6">Nova Notícia</h3>
      
      <form className="space-y-4">
        <FormInput
          label="Título"
          id="titulo-noticia"
          placeholder="Digite título"
        />
        
        <FormInput
          label="Resumo"
          id="resumo"
          placeholder="Digite resumo"
        />

        <FormTextarea
          label="Conteúdo"
          id="conteudo"
          placeholder="Digite conteúdo"
        />

        <FormInput
          label="Autor"
          id="autor"
          placeholder="Digite autor"
        />
        
        <FormSelect label="Tipo" id="tipo">
          <option value="">Selecione tipo</option>
          <option value="aviso">Aviso</option>
          <option value="noticia">Notícia</option>
        </FormSelect>
        
        <FormSelect label="Departamento" id="departamento">
          <option value="">Selecione departamento</option>
          <option value="dacom">DACOM</option>
          <option value="daeln">DAELN</option>
        </FormSelect>

        <FormSelect label="Categoria" id="categoria">
          <option value="">Selecione categoria</option>
          <option value="institucional">Institucional</option>
          <option value="academico">Acadêmico</option>
        </FormSelect>

        <button
          type="submit"
          className="w-full bg-blue-800 text-white font-semibold py-3 rounded-lg hover:bg-blue-900 transition-all mt-6"
        >
          Publicar Notícia
        </button>
      </form>
    </div>
  );
}