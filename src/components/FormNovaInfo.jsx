import React from 'react';
import { FormInput, FormTextarea, FormSelect } from './FormUtils'; // Importa nossos helpers

export default function FormNovaInfo() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold mb-6">Nova Informação Universitária</h3>
      
      <form className="space-y-4">
        <FormInput
          label="Nome/Título"
          id="nome-info"
          placeholder="Digite nome/título"
        />

        <FormTextarea
          label="Descrição"
          id="desc-info"
          placeholder="Digite descrição"
        />

        <FormSelect label="Categoria" id="categoria-info">
          <option value="">Selecione categoria</option>
          <option value="servico">Serviço</option>
          <option value="departamento">Departamento</option>
        </FormSelect>
        
        <FormInput
          label="Departamento"
          id="depto-info"
          placeholder="Digite departamento"
        />

        <FormInput
          label="Localização"
          id="local-info"
          placeholder="Digite localização"
        />

        <FormInput
          label="Telefone"
          id="tel-info"
          placeholder="Digite telefone"
        />

        <FormInput
          label="Email"
          id="email-info"
          placeholder="Digite email"
        />

        <button
          type="submit"
          className="w-full bg-blue-800 text-white font-semibold py-3 rounded-lg hover:bg-blue-900 transition-all mt-6"
        >
          Salvar Informação
        </button>
      </form>
    </div>
  );
}