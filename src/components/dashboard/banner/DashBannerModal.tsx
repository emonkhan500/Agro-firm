'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

export interface BannerPayload {
  id: number;
  name: string;
  image: string;
  status: 'Active' | 'Inactive';
  created: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: BannerPayload) => void;
}

const DashBannerModal = ({ open, onClose, onSubmit }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      image: null as File | null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Banner name is required'),
      image: Yup.mixed().required('Banner image is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      onSubmit({
        id: Date.now(),
        name: values.name,
        image: preview!,
        status: 'Active',
        created: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      });

      resetForm();
      setPreview(null);
      onClose();
    },
  });

  if (!open) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    formik.setFieldValue('image', file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div onClick={onClose} className="absolute inset-0 bg-black/40" />

      <div className="relative w-full max-w-2xl rounded-lg bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Create New Banner</h2>
          <button onClick={onClose}>
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="px-6 py-6 space-y-5">
            {/* Name */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                Banner Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className="w-full rounded-md border px-4 py-2 text-sm"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.name}
                </p>
              )}
            </div>

            {/* Image */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Banner Image <span className="text-red-500">*</span>
              </label>

              <label className="flex h-36 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed bg-gray-50">
                {preview ? (
                  <img
                    src={preview}
                    className="h-full w-full rounded-md object-cover"
                    alt="preview"
                  />
                ) : (
                  <>
                    <span className="text-xl">⬆️</span>
                    <p className="font-medium">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">
                      PNG/JPG/JPEG/GIF/WEBP
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

              {formik.touched.image && formik.errors.image && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.image as string}
                </p>
              )}
            </div>
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
              className="rounded-md bg-active-nav px-6 py-2 text-sm text-white"
            >
              Submit Banner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashBannerModal;
