'use client';

import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import Swal from 'sweetalert2';
import DashCattleModal from './DashCattleModal';
import { deleteCattle } from '@/app/actions/cattle.action';

export interface Cattle {
  id: number;
  title: string;
  image: string;
  created: string;
}

interface Props {
  initialCattles: Cattle[];
}

const DashCattleManagement = ({ initialCattles }: Props) => {
  const [openModal, setOpenModal] = useState(false);

  const handleDeleteCattle = async (id: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (!result.isConfirmed) return;

    const success = await deleteCattle(id);

    await Swal.fire({
      title: success ? 'Deleted!' : 'Error!',
      text: success
        ? 'Cattle has been deleted successfully.'
        : 'Failed to delete cattle.',
      icon: success ? 'success' : 'error',
    });
  };

  return (
    <section className="mt-10">
      {/* header */}
      <div className="mb-6 flex justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Cattle Management</h1>
          <p className="text-sm text-gray-600">
            Total <b>{initialCattles.length}</b> cattles
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="h-12 rounded-md bg-active-nav px-6 text-white"
        >
          + Add New Cattle
        </button>
      </div>

      {/* table */}
      <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
        <div className="min-w-[900px]">
            <div className="grid grid-cols-[80px_140px_1.5fr_160px_160px] border-b bg-gray-50 px-6 py-4 text-sm font-semibold">
            <p>#</p>
            <p>Image</p>
            <p>Product Name</p>
            <p>Created</p>
            <p className="text-center">Actions</p>
          </div>
          {initialCattles.map((item, i) => (
            <div key={item.id} className="grid grid-cols-[80px_140px_1.5fr_160px_160px] px-6 py-4">
              <p>{i + 1}</p>
              <img src={item.image} className="h-14 w-24 rounded-md object-cover" />
              <p>{item.title}</p>
              <p>{item.created}</p>
                <div className="flex justify-center gap-2">
                  <button className="h-9 w-9 rounded-full bg-primary-bg flex items-center justify-center">
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCattle(item.id)}
                    className="h-9 w-9 rounded-full bg-primary-bg flex items-center justify-center"
                  >
                    <TrashIcon className="h-4 w-4 text-custom-red" />
                  </button>
                </div>
            </div>
          ))}
        </div>
      </div>

      <DashCattleModal open={openModal} onClose={() => setOpenModal(false)} />
    </section>
  );
};

export default DashCattleManagement;
