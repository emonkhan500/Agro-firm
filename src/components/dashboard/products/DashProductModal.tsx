'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { createProduct } from '@/app/actions/products.action';

export interface ProductPayload {
  title: string;
  image: File | null;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

const DashProductModal = ({ open, onClose }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);

  const formik = useFormik<ProductPayload>({
    initialValues: {
      title: '',
      image: null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Product title is required'),
      image: Yup.mixed().required('Product image is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('image', values.image as File);

      await createProduct(formData);

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

      <div className="relative w-full max-w-lg rounded-lg bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Add New Product</h2>
          <button onClick={onClose}>
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-5 px-6 py-6">
            {/* Title */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                Product Title *
              </label>
              <input
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-md border px-4 py-2 text-sm"
              />
              {formik.touched.title && formik.errors.title && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.title}
                </p>
              )}
            </div>

            {/* Image */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Product Image *
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
                    <p className="font-medium">Click to upload product image</p>
                    <p className="text-xs text-gray-500">PNG / JPG / JPEG</p>
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
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashProductModal;
