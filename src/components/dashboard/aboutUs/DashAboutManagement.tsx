'use client';

import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

import DashAboutUsModal, { WhyUsPayload } from './DashAboutUsModal';

const DashAboutManagement = () => {
  const [openModal, setOpenModal] = useState(false);
  const [aboutUsList, setAboutUsList] = useState<WhyUsPayload[]>([]);

  const handleAddAboutUs = (data: WhyUsPayload) => {
    setAboutUsList((prev) => [...prev, data]);
  };

  return (
    <section className="my-10 ">
      {/* Header */}
      <div className="my-20 flex items-center justify-between ">
        <div>
          <h1 className="text-2xl font-semibold">About Us Management</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your About us content
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="rounded-md bg-active-nav  h-12 text-sm text-white px-10 mx-10"
        >
          + Add New About Us
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg bg-white">
        <div className="min-w-[900px] grid grid-cols-[80px_1fr_2fr_150px] border-b px-6 py-4 font-semibold">
          <p>SL</p>
          <p>Heading</p>
          <p>Description</p>
          <p>Actions</p>
        </div>

        {aboutUsList.length === 0 && (
          <p className="px-6 py-4 text-sm text-gray-500 text-center">
            No data added yet.
          </p>
        )}

        {aboutUsList.map((item, index) => (
          <div
            key={item.id}
            className="min-w-[900px] grid grid-cols-[80px_1fr_2fr_150px] items-center border-b px-6 py-4"
          >
            <p>{index + 1}</p>
            <p className="font-medium">{item.heading}</p>
            <p className="text-sm text-gray-600">{item.description}</p>

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

      {/* Modal */}
      <DashAboutUsModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleAddAboutUs}
      />
    </section>
  );
};

export default DashAboutManagement;
