'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { updateBanner } from '@/app/actions/banner.action';

interface Props {
  open: boolean;
  onClose: () => void;
  banner: any | null;
  onUpdated: (banner: any) => void;
}

const DashUpdateBannerModal = ({
  open,
  onClose,
  banner,
  onUpdated,
}: Props) => {
  const [preview, setPreview] = useState<string | null>(null);

  const initialValues = useMemo(
    () => ({
      title: banner?.title || '',
      description: banner?.description || '',
      imageFile: null as File | null,
    }),
    [banner]
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
    }),
    onSubmit: async (values) => {
      if (!banner) return;

      const formData = new FormData();
      if (values.imageFile) {
        formData.append('file', values.imageFile);
      }

      const updated = await updateBanner(banner.id, formData, {
        title: values.title,
        description: values.description,
      });

      if (updated) {
        onUpdated(updated);
        onClose();
        setPreview(null);
      }
    },
  });

  const hasChanged =
    formik.values.title !== banner?.title ||
    formik.values.description !== banner?.description ||
    formik.values.imageFile !== null;

  if (!open || !banner) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div onClick={onClose} className="absolute inset-0 bg-black/40" />

      <div className="relative w-full max-w-lg rounded-lg bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-gray px-6 py-4">
          <h2 className="text-lg font-semibold">Update Banner</h2>
          <button onClick={onClose}>
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-5 px-6 py-6">
            {/* Image */}
            <label className="block text-sm font-medium">Banner Image</label>
            <label className="flex h-36 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-border-gray border-dashed bg-gray">
              <img
                src={preview || banner.image}
                className="h-full w-full rounded-md object-cover"
              />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  formik.setFieldValue('imageFile', file);
                  setPreview(URL.createObjectURL(file));
                }}
              />
            </label>

            {/* Title */}
            <input
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              className="w-full rounded-md border border-border-gray px-4 py-2 text-sm"
            />

            {/* Description */}
            <textarea
              name="description"
              rows={3}
              value={formik.values.description}
              onChange={formik.handleChange}
              className="w-full rounded-md border border-border-gray px-4 py-2 text-sm"
            />

            {/* Read only fields */}
            <input
              value={banner.buttonText}
              disabled
              className="w-full rounded-md border border-border-gray bg-gray px-4 py-2 text-sm"
            />
            <input
              value={banner.buttonLink}
              disabled
              className="w-full rounded-md border border-border-gray bg-gray px-4 py-2 text-sm"
            />
          </div>

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
              disabled={!hasChanged}
              className={`rounded-md px-6 py-2 text-sm text-white ${
                hasChanged
                  ? 'bg-active-nav'
                  : 'cursor-not-allowed bg-disable-gray'
              }`}
            >
              Update Banner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashUpdateBannerModal;
