import React from 'react';
import { MdSearch } from 'react-icons/md';

export default function SearchInput({ value, onChange, placeholder = 'Buscar', className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white border border-gray-300 rounded-full pl-10 pr-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
      />
    </div>
  );
}
