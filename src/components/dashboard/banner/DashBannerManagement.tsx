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
      <div className="relative overflow-x-auto rounded-xl bg-white shadow-sm border border-border-gray">
        <table className="min-w-[1100px] w-full border-collapse text-sm">
          <thead>
            <tr className="border-b  border-border-gray text-sidebar-text font-semibold">
              <th className="px-6 py-4 w-[80px] text-left">Order</th>
              <th className="px-6 py-4 w-[140px] text-left">Banner</th>
              <th className="px-6 py-4 text-left">Title</th>
              <th className="px-6 py-4 text-left">Description</th>
              <th className="px-6 py-4 w-[120px] text-left">Status</th>
              <th className="px-6 py-4 w-[160px] text-left">Created</th>
              <th className="px-6 py-4 w-[140px] text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {banners.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-10 text-center text-sm text-sidebar-text"
                >
                  No banners created yet
                </td>
              </tr>
            )}

            {banners.map((banner) => (
              <tr
                key={banner.id}
                className="border-b border-border-gray hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium">{banner.order + 1}</td>

                <td className="px-6 py-4">
                  <div className="h-14 w-24 overflow-hidden rounded-md">
                    <img
                      src={banner.image}
                      alt="banner"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </td>

                <td className="px-6 py-4 font-medium text-sidebar-text max-w-[180px] truncate">
                  {banner.title}
                </td>

                <td className="px-6 py-4 max-w-[260px]">
                  <p className="line-clamp-2 text-sidebar-text">
                    {banner.description}
                  </p>
                </td>

                <td className="px-6 py-4">
                  <span className="w-fit rounded-full bg-active-nav px-3 py-1 text-xs font-medium text-white">
                    {banner.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-sidebar-text">
                  {banner.created}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => setEditBanner(banner)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-bg"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => handleDeleteBanner(banner.id)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-red transition"
                    >
                      <TrashIcon className="h-4 w-4 text-custom-red" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
