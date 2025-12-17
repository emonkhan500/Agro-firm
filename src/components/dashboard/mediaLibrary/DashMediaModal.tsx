'use client';

import { uploadMedia } from '@/app/actions/media.actions';
import { CloudArrowUpIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (imageUrl: string) => void;
}

const DashMediaModal = ({ open, onClose, onSubmit }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  const handleAction = async (formData: FormData) => {
    setLoading(true);
    try {
      const res = await uploadMedia(formData);
      onSubmit(res.fileUrl);
      setPreview(null);
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
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <form action={handleAction}>
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
                  <p className="text-xs text-gray-500">PNG, JPG, JPEG, WEBP</p>
                  <p className="text-xs text-gray-500">Max size: 4MB</p>
                </>
              )}
              <input
                type="file"
                name="file"
                hidden
                accept="image/*"
                onChange={handlePreview}
                required
              />
            </label>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border px-5 py-2 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!preview || loading}
              className="rounded-md bg-blue-600 px-6 py-2 text-sm text-white disabled:opacity-50"
            >
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashMediaModal;
