'use client';

import { useState } from 'react';
import {
  CloudArrowUpIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import DashMediaModal from './DashMediaModal';
import Image from 'next/image';
import { deleteMedia } from '@/app/actions/media.actions';

interface Props {
  initialMedia: string[];
}

const DashMediaManagement = ({ initialMedia }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [media, setMedia] = useState<string[]>(initialMedia);
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleUpload = (imageUrl: string) => {
    setMedia((prev) => [imageUrl, ...prev]);
  };

  const handleDelete = async (src: string) => {
    setDeleting(src);

    // optimistic UI
    setMedia((prev) => prev.filter((item) => item !== src));

    try {
      await deleteMedia(src);
      alert('Deleted successfully');
    } catch (err) {
      console.error(err);
      alert('Delete failed');
      // rollback if needed
      setMedia((prev) => [src, ...prev]);
    } finally {
      setDeleting(null);
    }
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

      {/* Media Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {media.map((src) => (
          <div
            key={src}
            className="group relative h-96 w-full overflow-hidden rounded shadow"
          >
            <Image src={src} alt="media" fill className="object-cover" />

            {/* Hover Overlay */}
            <div className="absolute inset-0 flex items-start justify-end bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <button
                onClick={() => handleDelete(src)}
                disabled={deleting === src}
                className="m-3 rounded bg-custom-red p-3 text-white disabled:opacity-50"
              >
                <TrashIcon className="h-6 w-6" />
              </button>
            </div>
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
