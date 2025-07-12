import React, { useState } from 'react';
import API from '../api';

function Upload() {
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file');

    const formData = new FormData();
    formData.append('file', file);

    try {
      await API.post('/files/upload', formData);
      alert('✅ File uploaded successfully');
      setFile(null);
    } catch (err) {
      alert('❌ Upload failed');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-xl font-semibold mb-4 text-center">📤 Upload File</h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border p-2"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default Upload;
