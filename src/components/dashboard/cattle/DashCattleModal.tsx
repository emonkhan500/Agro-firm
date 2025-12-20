'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { createCattle } from '@/app/actions/cattle.action';
import { Upload } from 'lucide-react';
import RichTextArea from '@/components/ui/RichTextArea';

export interface CattlePayload {
  title: string;
  image: File | null;
  description: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

const DashCattleModal = ({ open, onClose }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);

  const formik = useFormik<CattlePayload>({
    initialValues: {
      title: '',
      image: null,
      description: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Cattle name is required'),
      image: Yup.mixed().required('Cattle image is required'),
      description: Yup.string().required('Cattle description is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('image', values.image as File);
      formData.append('description', values.description);

      await createCattle(formData);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center px-2">
      <div onClick={onClose} className="absolute inset-0 bg-black/40" />

      {/* 🔹 width increased */}
      <div className="relative w-full max-w-2xl rounded-lg bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-gray px-6 py-4">
          <h2 className="text-lg font-semibold">Add New Cattle</h2>
          <button onClick={onClose}>
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-5 px-6 py-6">
            {/* Title */}
            <div>
              <label className="text-sm font-medium">Cattle Name *</label>
              <input
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 w-full rounded-md border border-border-gray px-4 py-2 text-sm"
              />
              {formik.touched.title && formik.errors.title && (
                <p className="text-xs text-custom-red">{formik.errors.title}</p>
              )}
            </div>

            {/* Image */}
            <div>
              <label className="text-sm font-medium">Cattle Image *</label>
              <label className="mt-2 flex h-36 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-border-gray border-dashed bg-gray-50">
                {preview ? (
                  <img
                    src={preview}
                    className="h-full w-full rounded-md object-cover"
                  />
                ) : (
                  <>
                    <Upload className="mb-4" />
                    <p className="font-medium">Click to upload cattle image</p>
                    <p className="text-xs text-sidebar-text">
                      PNG / JPG / JPEG
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
                <p className="text-xs text-custom-red">
                  {formik.errors.image as string}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium">
                Cattle Description *
              </label>

              {/* ✅ FIXED WRAPPER */}
              <div className="mt-1 rounded-md border border-border-gray">
                <div className="max-h-[260px] overflow-y-auto">
                  <RichTextArea
                    height={160}
                    defaultValue={formik.values.description}
                    onChange={(value) =>
                      formik.setFieldValue('description', value)
                    }
                    handleBlur={() =>
                      formik.setFieldTouched('description', true)
                    }
                  />
                </div>
              </div>

              {formik.touched.description && formik.errors.description && (
                <p className="text-xs text-custom-red">
                  {formik.errors.description}
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
              Add Cattle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashCattleModal;
