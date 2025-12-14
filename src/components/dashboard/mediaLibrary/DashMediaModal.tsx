'use client';

import { CloudArrowUpIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (imageUrl: string) => void;
}

const DashMediaModal = ({ open, onClose, onSubmit }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async () => {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Upload failed');
      }

      const data = await res.json();

      onSubmit(data.fileUrl); // ✅ real server URL
      setPreview(null);
      setFile(null);
      onClose();
    } catch (error) {
      console.error(error);
      alert('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div onClick={onClose} className="absolute inset-0 bg-black/40" />

      <div className="relative w-full max-w-lg rounded-lg bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Upload Media</h2>
          <button onClick={onClose}>
            <XMarkIcon className="h-5 w-5 text-sidebar-text" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <label className="flex h-48 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed bg-primary-bg">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              <>
                <CloudArrowUpIcon className="h-5 w-5" />
                <p className="mt-2 font-medium">
                  Click to upload or drag & drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, JPEG, WEBP
                </p>
              </>
            )}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-md border px-5 py-2 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!preview || loading}
            className="rounded-md bg-blue-600 px-6 py-2 text-sm text-white disabled:opacity-50"
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashMediaModal;
