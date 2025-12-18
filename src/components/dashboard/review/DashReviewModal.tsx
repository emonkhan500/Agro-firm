'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { createReview } from '@/app/actions/review.actions';

interface Props {
  open: boolean;
  onClose: () => void;
}

const DashReviewModal = ({ open, onClose }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      place: '',
      review: '',
      image: null as File | null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      place: Yup.string().required('Place is required'),
      review: Yup.string().required('Review is required'),
      image: Yup.mixed().required('Image is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      const fd = new FormData();
      fd.append('name', values.name);
      fd.append('place', values.place);
      fd.append('review', values.review);
      fd.append('image', values.image as File);

      await createReview(fd);

      resetForm();
      setPreview(null);
      onClose();
    },
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div onClick={onClose} className="absolute inset-0 bg-black/40" />

      <div className="relative w-full max-w-lg rounded-lg bg-white shadow-lg">
        {/* Header */}
        <div className="flex justify-between border-b border-border-gray px-6 py-4">
          <h2 className="text-lg font-semibold">Add New Review</h2>
          <button onClick={onClose}>
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-4 px-6 py-6">
            <input
              name="name"
              placeholder="Customer Name"
              onChange={formik.handleChange}
              className="w-full rounded-md border border-border-gray px-4 py-2"
            />

            <input
              name="place"
              placeholder="Place"
              onChange={formik.handleChange}
              className="w-full rounded-md border border-border-gray px-4 py-2"
            />

            <textarea
              name="review"
              placeholder="Customer Review"
              rows={3}
              onChange={formik.handleChange}
              className="w-full rounded-md border border-border-gray px-4 py-2"
            />

            <label className="flex h-32 cursor-pointer items-center justify-center rounded-md border-2 border-border-gray border-dashed">
              {preview ? (
                <img
                  src={preview}
                  className="h-full w-full object-cover rounded-md"
                />
              ) : (
                <p>Click to upload image</p>
              )}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  formik.setFieldValue('image', file);
                  setPreview(URL.createObjectURL(file));
                }}
              />
            </label>
          </div>

          <div className="flex justify-end border-t border-border-gray px-6 py-4">
            <button
              type="submit"
              className="rounded-md bg-active-nav px-6 py-2 text-white"
            >
              Add Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashReviewModal;
