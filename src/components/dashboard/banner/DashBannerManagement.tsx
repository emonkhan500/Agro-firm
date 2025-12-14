'use client';

import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import DashBannerModal, { BannerPayload } from './DashBannerModal';

interface Banner extends BannerPayload {
  order: number;
}

const DashBannerManagement = () => {
  const [openModal, setOpenModal] = useState(false);

  const [banners, setBanners] = useState<Banner[]>([
    {
      id: 1,
      order: 0,
      name: 'Banner 1',
      image: '',
      status: 'Active',
      created: 'December 9, 2025',
    },
  ]);

  const handleAddBanner = (banner: BannerPayload) => {
    setBanners((prev) => [...prev, { ...banner, order: prev.length }]);
  };

  return (
    <section className="mt-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Banner Management</h1>
        <p className="mt-1">
          You are managing a total of{' '}
          <span className="font-semibold">{banners.length}</span> banners
        </p>
      </div>

      {/* Action */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setOpenModal(true)}
          className="rounded-md bg-active-nav px-6 py-2.5 text-white"
        >
          Create New Banner
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg bg-white">
        <div className="min-w-[900px] grid grid-cols-[80px_150px_1fr_120px_150px_180px] border-b px-6 py-4 font-semibold">
          <p>Order</p>
          <p>Banner</p>
          <p>Name</p>
          <p>Status</p>
          <p>Created</p>
          <p>Actions</p>
        </div>

        {banners.map((banner) => (
          <div
            key={banner.id}
            className="min-w-[900px] grid grid-cols-[80px_150px_1fr_120px_150px_180px] items-center border-b px-6 py-4"
          >
            <p>{banner.order}</p>

            <div className="h-12 w-20 rounded bg-gray-200" />

            <p>{banner.name}</p>

            <span className="w-fit rounded-full bg-active-nav px-3 py-1 text-sm text-white">
              {banner.status}
            </span>

            <p className="text-sm">{banner.created}</p>

            <div className="flex gap-2">
              <button className="h-9 w-9 rounded-full bg-primary-bg flex items-center justify-center">
                <PencilIcon className="h-4 w-4" />
              </button>
              <button className="h-9 w-9 rounded-full bg-primary-bg flex items-center justify-center">
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <DashBannerModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleAddBanner}
      />
    </section>
  );
};

export default DashBannerManagement;
