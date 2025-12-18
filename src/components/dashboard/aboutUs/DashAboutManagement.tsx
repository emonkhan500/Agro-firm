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
          <p className="mt-1 text-sm text-sidebar-text">
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
      <div className="overflow-x-auto rounded-lg bg-white border border-border-gray">
        <table className="min-w-[900px] w-full border-collapse">
          <thead>
            <tr className="border-b border-border-gray text-left font-semibold">
              <th className="px-6 py-4 w-[80px]">SL</th>
              <th className="px-6 py-4">Heading</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4 w-[150px]">Actions</th>
            </tr>
          </thead>

          <tbody>
            {aboutUsList.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-6 text-center text-sm text-sidebar-text"
                >
                  No data added yet.
                </td>
              </tr>
            )}

            {aboutUsList.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-border-gray hover:bg-gray-50"
              >
                <td className="px-6 py-4">{index + 1}</td>

                <td className="px-6 py-4 font-medium">{item.heading}</td>

                <td className="px-6 py-4 text-sm text-sidebar-text">
                  {item.description}
                </td>

                <td className="px-6 py-4">
                  <div className="flex gap-2">
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
