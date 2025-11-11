import React from 'react';
import { FormInput, FormTextarea, FormSelect } from './FormUtils'; // Importa nossos helpers

export default function FormNovaVaga() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold mb-6">Nova Vaga de Estágio</h3>
      
      <form className="space-y-4">
        <FormInput
          label="Título da Vaga"
          id="titulo-vaga"
          placeholder="Digite título da vaga"
        />
        
        <FormInput
          label="Empresa"
          id="empresa"
          placeholder="Digite empresa"
        />

        <FormTextarea
          label="Descrição"
          id="descricao"
          placeholder="Digite descrição"
        />

        <FormSelect label="Área" id="area">
          <option value="">Selecione área</option>
          <option value="ti">Computação</option>
          <option value="marketing">Marketing</option>
          <option value="adm">Administração</option>
        </FormSelect>

        <FormInput
          label="Localização"
          id="localizacao"
          placeholder="Digite localização"
        />
        
        <FormSelect label="Modalidade" id="modalidade">
          <option value="">Selecione modalidade</option>
          <option value="presencial">Presencial</option>
          <option value="hibrido">Híbrido</option>
          <option value="remoto">Remoto</option>
        </FormSelect>

        <FormInput
          label="Salário"
          id="salario"
          placeholder="Digite salário"
        />

        <button
          type="submit"
          className="w-full bg-blue-800 text-white font-semibold py-3 rounded-lg hover:bg-blue-900 transition-all mt-6"
        >
          Publicar Vaga
        </button>
      </form>
    </div>
  );
}