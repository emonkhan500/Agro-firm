'use client';

import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import DashWhyUsModal, { WhyUsPayload } from './DashWhyUsModal';

interface WhyUs extends WhyUsPayload {
  order: number;
}

const DashWhyUsManagement = () => {
  const [openModal, setOpenModal] = useState(false);
  const [whyUsList, setWhyUsList] = useState<WhyUs[]>([]);

  const handleAddWhyUs = (data: WhyUsPayload) => {
    setWhyUsList((prev) => [...prev, { ...data, order: prev.length + 1 }]);
  };

  return (
    <section className="mt-10 ">
      {/* Header */}
      <div className="flex justify-between my-10">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">Why Us Management</h1>
          <p className="mt-1">
            You are managing a total of{' '}
            <span className="font-semibold">{whyUsList.length}</span> items
          </p>
        </div>

        {/* Action */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={() => setOpenModal(true)}
            className="rounded-md bg-active-nav px-10 text-white mx-10 h-12"
          >
            + Add Why Us
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg bg-white">
        <div className="min-w-[700px] grid grid-cols-[80px_150px_1fr_150px] border-b px-6 py-4 font-semibold">
          <p>Order</p>
          <p>Image</p>
          <p>Title</p>
          <p>Actions</p>
        </div>
        {whyUsList.length === 0 && (
          <p className="px-6 py-4 text-sm text-gray-500 text-center">
            No data added yet.
          </p>
        )}
        {whyUsList.map((item) => (
          <div
            key={item.id}
            className="min-w-[700px] grid grid-cols-[80px_150px_1fr_150px] items-center border-b px-6 py-4"
          >
            <p>{item.order}</p>

            <img
              src={item.image}
              alt="why-us"
              className="h-12 w-20 rounded object-cover"
            />

            <p className="font-medium">{item.title}</p>

            <div className="flex gap-2">
              <button className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-bg">
                <PencilIcon className="h-4 w-4" />
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-bg">
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <DashWhyUsModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleAddWhyUs}
      />
    </section>
  );
};

export default DashWhyUsManagement;
