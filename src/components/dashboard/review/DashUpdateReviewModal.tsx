'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

import { Review } from './DashReviewManagement';
import { updateReview } from '@/app/actions/review.actions';

interface Props {
  open: boolean;
  onClose: () => void;
  reviewData: Review | null;
}

const DashUpdateReviewModal = ({ open, onClose, reviewData }: Props) => {
  if (!open || !reviewData) return null;

  const formik = useFormik({
    initialValues: {
      review: reviewData.review,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      review: Yup.string()
        .min(5, 'Minimum 5 characters')
        .required('Review is required'),
    }),
    onSubmit: async values => {
      const success = await updateReview(reviewData.id, values.review);

      await Swal.fire({
        title: success ? 'Updated!' : 'Error!',
        text: success
          ? 'Review updated successfully'
          : 'Failed to update review',
        icon: success ? 'success' : 'error',
      });

      if (success) onClose();
    },
  });

  const isChanged = formik.values.review !== reviewData.review;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div onClick={onClose} className="absolute inset-0 bg-black/40" />

      <div className="relative w-full max-w-lg rounded-lg bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Update Review</h2>
          <button onClick={onClose}>
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-5 px-6 py-6">
            {/* Image */}
            <div className="flex justify-center">
              <img
                src={reviewData.image}
                className="h-24 w-24 rounded-full object-cover"
              />
            </div>

            {/* Name */}
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                value={reviewData.name}
                disabled
                className="w-full rounded-md border bg-gray-100 px-4 py-2 text-sm"
              />
            </div>

            {/* Place */}
            <div>
              <label className="text-sm font-medium">Place</label>
              <input
                value={reviewData.place}
                disabled
                className="w-full rounded-md border bg-gray-100 px-4 py-2 text-sm"
              />
            </div>

            {/* Review */}
            <div>
              <label className="text-sm font-medium">Review *</label>
              <textarea
                rows={4}
                name="review"
                value={formik.values.review}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-md border px-4 py-2 text-sm"
              />
              {formik.touched.review && formik.errors.review && (
                <p className="mt-1 text-xs text-custom-red">
                  {formik.errors.review}
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
              disabled={!isChanged || !formik.isValid}
              className={`rounded-md px-6 py-2 text-sm text-white transition
                ${
                  !isChanged || !formik.isValid
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-active-nav'
                }`}
            >
              Update Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashUpdateReviewModal;
