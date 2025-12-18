'use client';

import { useState } from 'react';
import DashBannerModal, { BannerPayload } from './DashBannerModal';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { createBanner, deleteBanner } from '@/app/actions/banner.action';
import Swal from 'sweetalert2';
import DashUpdateBannerModal from './DashUpdateBannerModal';

// Server payload type (no imageFile)
type CreateBannerPayload = {
  title: string;
  description: string;
  status: 'active' | 'inactive';
  buttonText: string;
  buttonLink: string;
};

// Banner type returned from server
interface Banner extends CreateBannerPayload {
  id: string;
  order: number;
  created: string;
  image: string; // URL from server
}

interface Props {
  initialBanners: Banner[];
}

const DashBannerManagement = ({ initialBanners }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [banners, setBanners] = useState<Banner[]>(initialBanners);
  const [editBanner, setEditBanner] = useState<Banner | null>(null);

  // Create banner
  const handleAddBanner = async (banner: BannerPayload) => {
    const formData = new FormData();
    formData.append('file', banner.imageFile);

    const payload: CreateBannerPayload = {
      title: banner.title,
      description: banner.description,
      buttonText: banner.buttonText,
      buttonLink: banner.buttonLink,
      status: banner.status,
    };

    const savedBanner = await createBanner(formData, payload);
    setBanners((prev) => [...prev, savedBanner]);
    setOpenModal(false);
  };

  // Delete banner
  const handleDeleteBanner = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (!result.isConfirmed) return;

    const deleted = await deleteBanner(id);

    if (deleted) {
      setBanners((prev) => prev.filter((b) => b.id !== id));
      await Swal.fire({
        title: 'Deleted!',
        text: 'Banner has been deleted successfully.',
        icon: 'success',
      });
    } else {
      await Swal.fire({
        title: 'Error!',
        text: 'Failed to delete banner.',
        icon: 'error',
      });
    }
  };

  return (
    <section className="mt-10">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center justify-start md:justify-between">
        <div className="mx-3 md:mx-0">
          <h1 className="text-2xl font-semibold">Banner Management</h1>
          <p className="mt-1 text-sm text-gray-600">
            You are managing a total of{' '}
            <span className="font-semibold">{banners.length}</span> banners
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="h-12 rounded-md bg-active-nav px-6 text-sm font-medium text-white mx-3 md:mx-10"
        >
          + Create New Banner
        </button>
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto rounded-xl bg-white shadow-sm">
        <div className="min-w-[1100px] whitespace-nowrap">
          {/* Table Header */}
          <div className="grid grid-cols-[80px_140px_1.5fr_2fr_120px_160px_140px] border-b bg-gray px-6 py-4 text-sm font-semibold text-sidebar-text">
            <p>Order</p>
            <p>Banner</p>
            <p>Title</p>
            <p>Description</p>
            <p>Status</p>
            <p>Created</p>
            <p className="text-center">Actions</p>
          </div>

          {/* Empty */}
          {banners.length === 0 && (
            <div className="px-6 py-10 text-center text-sm text-sidebar-text">
              No banners created yet
            </div>
          )}

          {/* Rows */}
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="grid grid-cols-[80px_140px_1.5fr_2fr_120px_160px_140px] items-center border-b px-6 py-4 text-sm transition "
            >
              <p className="font-medium">{banner.order + 1}</p>

              <div className="h-14 w-24 overflow-hidden rounded-md ">
                <img
                  src={banner.image}
                  alt="banner"
                  className="h-full w-full object-cover"
                />
              </div>

              <p className="font-medium text-sidebar-text">
                {banner.title.split(' ').slice(0, 3).join(' ')}...
              </p>

              <p className="line-clamp-2 text-sidebar-text">
                <span className="lg:hidden">
                  {banner.description.split(' ').slice(0, 4).join(' ')}...
                </span>

                <span className="hidden lg:inline">
                  {banner.description.split(' ').slice(0, 5).join(' ')}...
                </span>
              </p>

              <span className="w-fit rounded-full bg-active-nav px-3 py-1 text-xs font-medium text-white">
                {banner.status}
              </span>

              <p className="text-sidebar-text">{banner.created}</p>

              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setEditBanner(banner)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-bg"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>

                <button
                  onClick={() => handleDeleteBanner(banner.id)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-bg transition "
                >
                  <TrashIcon className="h-4 w-4 text-custom-red" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <DashBannerModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleAddBanner}
      />
      <DashUpdateBannerModal
        open={!!editBanner}
        banner={editBanner}
        onClose={() => setEditBanner(null)}
        onUpdated={(updated) =>
          setBanners((prev) =>
            prev.map((b) => (b.id === updated.id ? updated : b))
          )
        }
      />
    </section>
  );
};

export default DashBannerManagement;
