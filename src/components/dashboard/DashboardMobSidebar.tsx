'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import cn from '@/utilis/cn';
import {
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const navigation = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Banner Management', href: '/banner-management', icon: UsersIcon },
  { name: 'About Us Management', href: '/about-us-management', icon: FolderIcon },
  { name: 'Why Choose Us', href: '/why-choose-management', icon: CalendarIcon },
  { name: 'Products Management', href: '/products-management', icon: DocumentDuplicateIcon },
  { name: 'Gallery Management', href: '/gallery-management', icon: ChartPieIcon },
  { name: 'Contact Information', href: '/contact-information', icon: ChartPieIcon },
  { name: 'Cattle Management', href: '/cattle-management', icon: ChartPieIcon },
];

const DashboardMobSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="relative flex grow flex-col gap-y-5 overflow-y-auto bg-primary-bg px-6 pb-4 ">
      <div className="relative flex h-16 shrink-0 items-center">
        <Image src="/logo.png" alt="Your Company" width={70} height={70} />
      </div>

      <nav className="relative flex flex-1 flex-col">
        <ul className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul className="-mx-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        isActive
                          ? 'bg-primary-bg text-custom-green'
                          : 'text-sidebar-text hover:bg-primary-bg hover:text-custom-green',
                        'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold'
                      )}
                    >
                      <item.icon
                        className={cn(
                          isActive
                            ? 'text-custom-green'
                            : 'text-sidebar-text group-hover:text-custom-green',
                          'size-6 shrink-0'
                        )}
                      />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>

          <li className="mt-auto">
            <a
              href="#"
              className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-sidebar-text hover:bg-primary-bg hover:text-custom-green"
            >
              <Cog6ToothIcon className="size-6 shrink-0 text-sidebar-text group-hover:text-white" />
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DashboardMobSidebar;
