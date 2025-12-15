'use client';

import { useEffect, useState } from 'react';
import {
  CloudArrowUpIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import DashMediaModal from './DashMediaModal';
import Image from 'next/image';

const DashMediaManagement = () => {
  const [openModal, setOpenModal] = useState(false);
  const [media, setMedia] = useState<string[]>([]);
  useEffect(() => {
    fetch('/uploads/media.json')
      .then((res) => res.json())
      .then((data) => setMedia(data));
  }, []);

  const handleUpload = (imageUrl: string) => {
    setMedia((prev) => [imageUrl, ...prev]);
  };

  return (
    <section className="p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-md">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            placeholder="Search media..."
            className="w-full rounded-lg border border-contact-border py-4 pl-10 pr-4 text-sm focus:outline-none"
          />
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 rounded-lg bg-active-nav px-6 xl:px-10 py-4 text-base font-medium text-white"
        >
          <CloudArrowUpIcon className="h-5 w-5" />
          Upload Media
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {media.map((src, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-lg border bg-gray-50"
          >
            <Image
              src={src}
              alt="media"
              width={300}
              height={140}
              className="h-[140px] w-full object-cover"
            />
          </div>
        ))}
      </div>

      <DashMediaModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleUpload}
      />
    </section>
  );
};

export default DashMediaManagement;
