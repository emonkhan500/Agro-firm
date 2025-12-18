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
      <div className="overflow-x-auto rounded-lg bg-white border border-border-gray">
        <table className="min-w-[700px] w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border-gray font-semibold text-left">
              <th className="px-6 py-4 w-[80px]">Order</th>
              <th className="px-6 py-4 w-[150px]">Image</th>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4 w-[150px] text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {whyUsList.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-6 text-center text-sm text-sidebar-text"
                >
                  No data added yet.
                </td>
              </tr>
            )}

            {whyUsList.map((item) => (
              <tr
                key={item.id}
                className="border-b border-border-gray hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">{item.order}</td>

                <td className="px-6 py-4">
                  <img
                    src={item.image}
                    alt="why-us"
                    className="h-12 w-20 rounded object-cover"
                  />
                </td>

                <td className="px-6 py-4 font-medium">{item.title}</td>

                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-bg">
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-bg">
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
