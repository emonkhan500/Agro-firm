'use client';

import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import Swal from 'sweetalert2';
import DashReviewModal from './DashReviewModal';
import { deleteReview } from '@/app/actions/review.actions';
import DashUpdateReviewModal from './DashUpdateReviewModal';

export interface Review {
  id: number;
  name: string;
  place: string;
  review: string;
  image: string;
  created: string;
}

interface Props {
  initialReviews: Review[];
}

const DashReviewManagement = ({ initialReviews }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (!result.isConfirmed) return;

    const success = await deleteReview(id);

    await Swal.fire({
      title: success ? 'Deleted!' : 'Error!',
      text: success
        ? 'Review deleted successfully.'
        : 'Failed to delete review.',
      icon: success ? 'success' : 'error',
    });
  };

  return (
    <section className="mt-10">
      {/* Header */}
      <div className="mb-6 flex justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Review Management</h1>
          <p className="text-sm text-sidebar-text">
            Total <b>{initialReviews?.length}</b> reviews
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="h-12 rounded-md bg-active-nav px-6 text-white"
        >
          + Add New Review
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
        <div className="min-w-[900px]">
          <div className="grid grid-cols-[80px_120px_1fr_160px_160px] border-b px-6 py-4 font-semibold">
            <p>#</p>
            <p>Image</p>
            <p>Review</p>
            <p>Created</p>
            <p className="text-center">Actions</p>
          </div>

          {initialReviews?.map((item, i) => (
            <div
              key={item.id}
              className="grid grid-cols-[80px_120px_1fr_160px_160px] items-center border-b px-6 py-4"
            >
              <p>{i + 1}</p>

              <img
                src={item.image}
                className="h-12 w-12 rounded-full object-cover"
              />

              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-sidebar-text">
                  {item.place} — {item.review}
                </p>
              </div>

              <p>{item.created}</p>

              <div className="flex justify-center gap-2">
                <button
                  onClick={() => {
                    setSelectedReview(item);
                    setEditModal(true);
                  }}
                  className="h-9 w-9 rounded-full bg-primary-bg flex items-center justify-center"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="h-9 w-9 rounded-full bg-primary-bg flex items-center justify-center"
                >
                  <TrashIcon className="h-4 w-4 text-custom-red" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DashReviewModal open={openModal} onClose={() => setOpenModal(false)} />
      <DashUpdateReviewModal
        open={editModal}
        reviewData={selectedReview}
        onClose={() => {
          setEditModal(false);
          setSelectedReview(null);
        }}
      />
    </section>
  );
};

export default DashReviewManagement;
