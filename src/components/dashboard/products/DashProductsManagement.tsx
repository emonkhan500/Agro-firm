'use client';

import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import DashProductModal from './DashProductModal';
import DashProductUpdateModal from './DashProductUpdateModal';
import { deleteProduct } from '@/app/actions/products.action';
import Swal from 'sweetalert2';

interface Product {
  id: number;
  title: string;
  image: string;
  created: string;
  description?: string;
}

interface Props {
  initialProducts: Product[];
}

const DashProductsManagement = ({ initialProducts }: Props) => {
  console.log(initialProducts);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setOpenUpdateModal(true);
  };

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

    await Swal.fire({
      title: deleted ? 'Deleted!' : 'Error!',
      text: deleted
        ? 'Product has been deleted successfully.'
        : 'Failed to delete product.',
      icon: deleted ? 'success' : 'error',
    });
  };

  return (
    <section className="mt-10">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Product Management</h1>
          <p className="mt-1 text-sm text-sidebar-text">
            You are managing a total of{' '}
            <span className="font-semibold">{initialProducts.length}</span>{' '}
            products
          </p>
        </div>

        <button
          onClick={() => setOpenCreateModal(true)}
          className="h-12 rounded-md bg-active-nav px-6 text-sm font-medium text-white"
        >
          + Add New Product
        </button>
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto rounded-xl bg-white shadow-sm border border-border-gray">
        <table className="min-w-[900px] w-full text-sm">
          <thead>
            <tr className="border-b border-border-gray bg-gray font-semibold">
              <th className="px-6 py-4 w-[80px]">#</th>
              <th className="px-6 py-4 w-[140px]">Image</th>
              <th className="px-6 py-4">Product Name</th>
              <th className="px-6 py-4 w-[160px]">Created</th>
              <th className="px-6 py-4 w-[160px] text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {initialProducts.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-border-gray hover:bg-gray"
              >
                <td className="px-6 py-4">{index + 1}</td>

                <td className="px-6 py-4">
                  <img
                    src={item.image}
                    className="h-14 w-24 rounded-md object-cover"
                  />
                </td>

                <td className="px-6 py-4 font-medium">{item.title}</td>
                <td className="px-6 py-4">{item.created}</td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleEditProduct(item)}
                      className="h-9 w-9 rounded-full bg-primary-bg flex items-center justify-center"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => handleDeleteProduct(item.id)}
                      className="h-9 w-9 rounded-full bg-primary-bg flex items-center justify-center"
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

      {/* Modals */}
      <DashProductModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      />

      <DashProductUpdateModal
        open={openUpdateModal}
        product={selectedProduct}
        onClose={() => {
          setOpenUpdateModal(false);
          setSelectedProduct(null);
        }}
      />
    </section>
  );
};

export default DashProductsManagement;
