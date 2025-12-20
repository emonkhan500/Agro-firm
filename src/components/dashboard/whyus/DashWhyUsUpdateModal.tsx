'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { Upload } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateWhyUs } from '@/app/actions/whyus.action';
import { useEffect, useState } from 'react';

interface Props {
  open: boolean;
  whyus: any;
  onClose: () => void;
  onUpdated: (item: any) => void;
}

const DashWhyUsUpdateModal = ({ open, whyus, onClose, onUpdated }: Props) => {
  const [mainPreview, setMainPreview] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      title: '',
      mainImage: null as File | null,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
    }),
    onSubmit: async (values) => {
      const fd = new FormData();
      if (values.mainImage) fd.append('mainImage', values.mainImage);

      const updated = await updateWhyUs(whyus.id, fd, {
        title: values.title,
      });

      onUpdated(updated);
      onClose();
    },
  });

  useEffect(() => {
    if (whyus) {
      formik.setValues({
        title: whyus.title,
        mainImage: null,
      });
      setMainPreview(whyus.mainImage);
    }
  }, [whyus]);

  if (!open || !whyus) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div onClick={onClose} className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 w-[520px] rounded-lg bg-white p-6">
        {/* Header */}
        <div className="mb-6 flex justify-between">
          <h2 className="text-lg font-semibold">Update Why Us</h2>
          <button onClick={onClose}>
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
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
          </div>

          {/* Main Image */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Main Image <span className="text-custom-red">*</span>
            </label>

            <label className="flex h-36 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-border-gray bg-gray">
              {mainPreview ? (
                <img
                  src={mainPreview}
                  className="h-full w-full rounded-md object-cover"
                  alt="main preview"
                />
              ) : (
                <>
                  <Upload className="mb-4" />
                  <p className="font-medium">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG/JPG/JPEG</p>
                </>
              )}

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  formik.setFieldValue('mainImage', file);
                  setMainPreview(URL.createObjectURL(file));
                }}
              />
            </label>
          </div>

          {/* Icon Image (readonly) */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Icon Image (Readonly)
            </label>

            <label className="flex h-24 items-center justify-center rounded-md border-2 border-border-gray bg-gray">
              <img
                src={whyus.iconImage}
                alt="icon"
                className="h-full w-full rounded-md object-cover"
              />
            </label>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4">
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashWhyUsUpdateModal;
