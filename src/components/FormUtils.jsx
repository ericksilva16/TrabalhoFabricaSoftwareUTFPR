import React from 'react';

// Input de texto normal
export function FormInput({ label, id, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-800">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        id={id}
        {...props}
        className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}

// Caixa de texto (textarea)
export function FormTextarea({ label, id, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-800">
        {label} <span className="text-red-500">*</span>
      </label>
      <textarea
        id={id}
        rows={5}
        {...props}
        className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}

// Caixa de seleção (select)
export function FormSelect({ label, id, children, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-800">
        {label} <span className="text-red-500">*</span>
      </label>
      <select
        id={id}
        {...props}
        className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
      >
        {children}
      </select>
    </div>
  );
}