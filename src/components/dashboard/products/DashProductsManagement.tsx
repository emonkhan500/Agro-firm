'use client';

import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import DashProductModal from './DashProductModal';
import { deleteProduct } from '@/app/actions/products.action';
import Swal from 'sweetalert2';

interface Product {
  id: number;
  title: string;
  image: string;
  created: string;
}

interface Props {
  initialProducts: Product[];
}

const DashProductsManagement = ({ initialProducts }: Props) => {
  const [openModal, setOpenModal] = useState(false);

  const handleDeleteProduct = async (id: number) => {
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

    const deleted = await deleteProduct(id);

    if (deleted) {
      await Swal.fire({
        title: 'Deleted!',
        text: 'Product has been deleted successfully.',
        icon: 'success',
      });
    } else {
      await Swal.fire({
        title: 'Error!',
        text: 'Failed to delete product.',
        icon: 'error',
      });
    }
  };

  return (
    <section className="mt-10">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Product Management</h1>
          <p className="mt-1 text-sm text-gray-600">
            You are managing a total of{' '}
            <span className="font-semibold">{initialProducts.length}</span>{' '}
            products
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="h-12 rounded-md bg-active-nav px-6 text-sm font-medium text-white"
        >
          + Add New Product
        </button>
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto rounded-xl bg-white shadow-sm">
        <div className="min-w-[900px]">
          <div className="grid grid-cols-[80px_140px_1.5fr_160px_160px] border-b bg-gray-50 px-6 py-4 text-sm font-semibold">
            <p>#</p>
            <p>Image</p>
            <p>Product Name</p>
            <p>Created</p>
            <p className="text-center">Actions</p>
          </div>

          {initialProducts.length > 0 ? (
            initialProducts.map((item, index) => (
              <div
                key={item.id}
                className="grid grid-cols-[80px_140px_1.5fr_160px_160px] items-center border-b px-6 py-4 text-sm "
              >
                <p>{index + 1}</p>

                <img
                  src={item.image}
                  alt={item.title}
                  className="h-14 w-24 rounded-md object-cover "
                />

                <p className="font-medium">{item.title}</p>
                <p className="text-gray-500">{item.created}</p>
                <div className="flex justify-center gap-2">
                  <button className="h-9 w-9 rounded-full bg-primary-bg flex items-center justify-center">
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(item.id)}
                    className="h-9 w-9 rounded-full bg-primary-bg flex items-center justify-center"
                  >
                    <TrashIcon className="h-4 w-4 text-custom-red" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-10 text-center text-sm text-gray-500">
              No products found
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <DashProductModal open={openModal} onClose={() => setOpenModal(false)} />
    </section>
  );
};

export default DashProductsManagement;
