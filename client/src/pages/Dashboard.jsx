import React, { useEffect, useState } from 'react';
import API from '../api';

function Dashboard() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFiles = async () => {
    try {
      const res = await API.get('/files');
      setFiles(res.data.files);
    } catch {
      alert('Failed to fetch files');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return;

    try {
      await API.delete(`/files/${id}`);
      setFiles(files.filter((file) => file._id !== id));
      alert('✅ File deleted');
    } catch {
      alert('❌ Delete failed');
    }
  };

  

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">📂 Your Uploaded Files</h2>
      {loading ? (
        <p>🔄 Loading files...</p>
      ) : files.length === 0 ? (
        <p className="text-gray-600">No files uploaded yet.</p>
      ) : (
        <ul className="space-y-4">
          {files.map((file) => (
            <li
              key={file._id}
              className="bg-gray-100 p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{file.originalName}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
                 <p className="text-sm text-gray-400">
    Expires on:{' '}
    {new Date(new Date(file.createdAt).getTime() + 7 * 24 * 60 * 60 * 1000)
      .toLocaleDateString()}
  </p>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href={file.downloadLink}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Download
                </a>

                <button
          onClick={() => navigator.clipboard.writeText(file.downloadLink)}
          className="text-green-600 hover:underline"
        >
          Copy Link
        </button>

                <button
                  onClick={() => handleDelete(file._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
