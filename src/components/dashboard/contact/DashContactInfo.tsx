'use client';

import { getContacts, deleteContact } from '@/app/actions/contact.actions';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created: string;
}

const DashContactInfo = () => {
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const loadContacts = async () => {
    const data = await getContacts();
    setContacts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This message will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      await deleteContact(id);
      await loadContacts();

      Swal.fire('Deleted!', 'Message has been deleted.', 'success');
    }
  };

  return (
    <section className="   overflow-hidden">
      <div className="mx-3 md:mx-0 mt-16">
        <h1 className="text-2xl font-semibold">Banner Management</h1>
        <p className="mt-1 text-sm text-sidebar-text">
          Total Masseges:{' '}
          <span className="font-semibold text-lg">{contacts.length}</span>
        </p>
      </div>
      <div className="overflow-x-auto border border-border-gray bg-white mt-10 rounded-xl">
        <table className="min-w-full text-left text-sm  ">
          <thead className="bg-gray border-b border-border-gray">
            <tr>
              <th className="px-4 py-3 font-semibold">#</th>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Phone</th>
              <th className="px-4 py-3 font-semibold">Message</th>
              <th className="px-4 py-3 font-semibold text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center">
                  Loading...
                </td>
              </tr>
            ) : contacts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center">
                  No message here
                </td>
              </tr>
            ) : (
              contacts.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b last:border-none hover:bg-gray border-border-gray"
                >
                  <td className="px-4 py-4">{index + 1}</td>
                  <td className="px-4 py-4 font-medium">{item.name}</td>
                  <td className="px-4 py-4">{item.email}</td>
                  <td className="px-4 py-4">{item.phone}</td>
                  <td className="px-4 py-4 max-w-[320px] truncate">
                    {item.message}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-red "
                      >
                        <TrashIcon className="w-5 h-5 text-custom-red" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DashContactInfo;
