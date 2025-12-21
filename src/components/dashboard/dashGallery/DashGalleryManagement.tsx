'use client';

import { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import DashGalleryModal from "./DashGalleryModal";
import DashGalleryUpdateModal from "./DashGalleryUpdateModal";
import {
  createGalleryItem,
  deleteGalleryItem,
  getGalleryList,
  GalleryItem
} from "@/app/actions/gallery.actions";

const DashGalleryManagement = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [updateItem, setUpdateItem] = useState<GalleryItem | null>(null);
  const [list, setList] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await getGalleryList();
    setList(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mt-10 pb-6">
        <h1 className="text-2xl font-bold">Gallery Management</h1>
        <button
          onClick={() => setOpenAdd(true)}
          className="bg-active-nav text-white px-4 py-2 rounded"
        >
          + Add Media
        </button>
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto mt-6 bg-white rounded-xl border border-border-gray">
        <table className="min-w-[900px] w-full text-sm">
          <thead>
            <tr className="border-b border-border-gray bg-gray font-semibold">
              <th className="px-6 py-4 w-[60px]">#</th>
              <th className="px-6 py-4 w-[140px]">Thumbnail</th>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4 w-[160px]">Cover</th>
              <th className="px-6 py-4 w-[160px] text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={5} className="px-6 py-12 text-center text-sidebar-text">Loading...</td></tr>}
            {!loading && list.length === 0 && <tr><td colSpan={5} className="px-6 py-14 text-center text-sidebar-text font-medium">No data here</td></tr>}
            {!loading && list.map((item, i) => (
              <tr key={item.id} className="border-b border-border-gray hover:bg-gray">
                <td className="px-6 py-4">{i + 1}</td>
                <td className="px-6 py-4">{item.thumbnails[0] ? <img src={item.thumbnails[0].src} className="h-14 w-24 rounded object-cover"/> : <span className="text-xs text-sidebar-text">—</span>}</td>
                <td className="px-6 py-4 font-medium">{item.title}</td>
                <td className="px-6 py-4">{item.coverImage ? <img src={item.coverImage} className="h-14 w-34 rounded object-cover"/> : <span className="text-xs text-sidebar-text">—</span>}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button className="h-9 w-9 rounded-full bg-primary-bg flex items-center justify-center" onClick={() => setUpdateItem(item)}>
                      <PencilIcon className="h-4 w-4"/>
                    </button>
                    <button onClick={async () => { await deleteGalleryItem(item.id); load(); }} className="h-9 w-9 rounded-full bg-red flex items-center justify-center">
                      <TrashIcon className="h-4 w-4 text-custom-red"/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {openAdd && <DashGalleryModal onClose={() => setOpenAdd(false)} onSubmit={async (data) => { await createGalleryItem(data); load(); }} />}

      {/* Update Modal */}
      {updateItem && <DashGalleryUpdateModal item={updateItem} onClose={() => setUpdateItem(null)} onUpdate={load} />}
    </>
  );
};

export default DashGalleryManagement;
