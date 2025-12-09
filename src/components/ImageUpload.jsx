import React, { useState } from 'react';

export default function ImageUpload({ onImageUpload, label = "Carregar Imagem" }) {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setUploading(true);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    try {
      // Create FormData to send as multipart
      const formData = new FormData();
      formData.append('file', file);

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/v1/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Falha no upload da imagem');
      }

      const data = await response.json();
      // Assume backend returns { url: "..." }
      if (onImageUpload) {
        onImageUpload(data.url);
      }
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      alert('Erro ao fazer upload da imagem');
      setPreview(null);
      setFileName('');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      
      <div className="flex items-center gap-4">
        <input
          type="file"
          id="image-input"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
          className="hidden"
        />
        
        <label
          htmlFor="image-input"
          className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition cursor-pointer disabled:opacity-50"
        >
          {uploading ? 'Enviando...' : 'Escolher Arquivo'}
        </label>

        {fileName && (
          <span className="text-sm text-gray-600">{fileName}</span>
        )}
      </div>

      {preview && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Preview:</p>
          <img
            src={preview}
            alt="Preview"
            className="w-full max-w-xs h-32 object-cover rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
