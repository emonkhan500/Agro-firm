'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export interface WhyUsPayload {
  id: number;
  heading: string;
  description: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: WhyUsPayload) => void;
}

const DashAboutUsModal = ({ open, onClose, onSubmit }: Props) => {
  const formik = useFormik({
    initialValues: {
      heading: '',
      description: '',
    },
    validationSchema: Yup.object({
      heading: Yup.string().required('Heading is required'),
      description: Yup.string()
        .min(10, 'Description must be at least 10 characters')
        .required('Description is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      onSubmit({
        id: Date.now(),
        heading: values.heading,
        description: values.description,
      });

      resetForm();
      onClose();
    },
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div onClick={onClose} className="absolute inset-0 bg-black/40" />

      <div className="relative w-full max-w-xl rounded-lg bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Add Why Us</h2>
          <button onClick={onClose}>
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-5 px-6 py-6">
            {/* Heading */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                Heading <span className="text-custom-red">*</span>
              </label>
              <input
                name="heading"
                value={formik.values.heading}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-md border px-4 py-2 text-sm"
              />
              {formik.touched.heading && formik.errors.heading && (
                <p className="mt-1 text-xs text-custom-red">
                  {formik.errors.heading}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                Description <span className="text-custom-red">*</span>
              </label>
              <textarea
                name="description"
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-md border px-4 py-2 text-sm"
              />
              {formik.touched.description && formik.errors.description && (
                <p className="mt-1 text-xs text-custom-red">
                  {formik.errors.description}
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashAboutUsModal;
