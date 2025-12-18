'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

export interface WhyUsPayload {
  id: number;
  title: string;
  image: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: WhyUsPayload) => void;
}

const DashWhyUsModal = ({ open, onClose, onSubmit }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      title: '',
      image: null as File | null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      image: Yup.mixed().required('Image is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      onSubmit({
        id: Date.now(),
        title: values.title,
        image: preview!,
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

      <div className="relative w-full max-w-xl rounded-lg bg-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-gray px-6 py-4">
          <h2 className="text-lg font-semibold">Add Why Us</h2>
          <button onClick={onClose}>
            <XMarkIcon className="h-5 w-5 text-sidebar-text" />
          </button>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-5 px-6 py-6">
            {/* Title */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                Title <span className="text-custom-red">*</span>
              </label>
              <input
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                className="w-full rounded-md border border-border-gray px-4 py-2 text-sm"
              />
              {formik.touched.title && formik.errors.title && (
                <p className="mt-1 text-xs text-custom-red">
                  {formik.errors.title}
                </p>
              )}
            </div>

            {/* Image */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Image <span className="text-custom-red">*</span>
              </label>

              <label className="flex h-36 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-border-gray border-dashed bg-gray-50">
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="h-full w-full rounded-md object-cover"
                  />
                ) : (
                  <>
                    <span className="text-xl">⬆️</span>
                    <p className="text-sm font-medium">Click to upload image</p>
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
                <p className="mt-1 text-xs text-custom-red">
                  {formik.errors.image as string}
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-border-gray px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-border-gray px-5 py-2 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-active-nav px-6 py-2 text-sm text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashWhyUsModal;
