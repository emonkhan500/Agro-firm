'use client';

import { Pencil, Trash2 } from 'lucide-react';
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
      <div className="overflow-x-auto rounded-xl bg-white shadow-sm border border-border-gray">
        <table className="min-w-[900px] w-full border-collapse">
          <thead>
            <tr className="border-b border-border-gray text-left">
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Review</th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {initialReviews?.map((item, i) => (
              <tr
                key={item.id}
                className="border-b border-border-gray hover:bg-gray-50"
              >
                <td className="px-6 py-4">{i + 1}</td>

                <td className="px-6 py-4">
                  <img
                    src={item.image}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </td>

                <td className="px-6 py-4">
                  <p className="font-medium">{item.name}</p>
                </td>

                <td className="px-6 py-4">{item.place}</td>

                <td className="px-6 py-4 text-sm text-sidebar-text max-w-[200px] md:max-w-[300px] truncate">
                  {item.review}
                </td>

                <td className="px-6 py-4">{item.created}</td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedReview(item);
                        setEditModal(true);
                      }}
                      className="h-9 w-9 rounded-full bg-primary-bg flex items-center justify-center"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="h-9 w-9 rounded-full bg-red flex items-center justify-center"
                    >
                      <Trash2 className="h-4 w-4 text-custom-red" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DashReviewModal open={openModal} onClose={() => setOpenModal(false)} />
      {editModal && selectedReview && (
        <DashUpdateReviewModal
          open={editModal}
          reviewData={selectedReview}
          onClose={() => {
            setEditModal(false);
            setSelectedReview(null);
          }}
        />
      )}
    </section>
  );
};

export default DashReviewManagement;
