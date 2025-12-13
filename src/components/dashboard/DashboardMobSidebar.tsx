'use client';

import {
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

import Image from 'next/image';
import cn from '@/utilis/cn';

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon, current: true },
  {
    name: 'Banner Management',
    href: '/banner-management',
    icon: UsersIcon,
    current: false,
  },
  {
    name: 'About Us Management',
    href: '/about-us-management',
    icon: FolderIcon,
    current: false,
  },
  {
    name: 'Why Choose Us',
    href: '/why-choose-management',
    icon: CalendarIcon,
    current: false,
  },
  {
    name: 'Products Management',
    href: '/products-management',
    icon: DocumentDuplicateIcon,
    current: false,
  },
  {
    name: 'gallery Management',
    href: '/gallery-management',
    icon: ChartPieIcon,
    current: false,
  },
  {
    name: 'Contact Information',
    href: '/contact-information',
    icon: ChartPieIcon,
    current: false,
  },
  {
    name: 'Cattle Management',
    href: '/cattle-management',
    icon: ChartPieIcon,
    current: false,
  },
];
const teams = [
  { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
  { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
  { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
];
const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
];
const DashboardMobSidebar = () => {
  return (
    <div className="relative flex grow flex-col gap-y-5 overflow-y-auto bg-sidebar-bg px-6 pb-4 ring ring-white/10 before:pointer-events-none before:absolute before:inset-0 before:bg-black/10">
      <div className="relative flex h-16 shrink-0 items-center">
        <Image alt="Your Company" src="/logo.png" width={70} height={70} />
      </div>
      <nav className="relative flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={cn(
                      item.current
                        ? 'bg-primary-bg text-custom-green'
                        : 'text-sidebar-text hover:bg-primary-bg hover:text-custom-green',
                      'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold'
                    )}
                  >
                    <item.icon
                      aria-hidden="true"
                      className={cn(
                        item.current
                          ? 'text-custom-green'
                          : 'text-sidebar-text group-hover:text-custom-green',
                        'size-6 shrink-0'
                      )}
                    />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </li>

          <li className="mt-auto">
            <a
              href="#"
              className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-sidebar-text hover:bg-primary-bg hover:text-custom-green"
            >
              <Cog6ToothIcon
                aria-hidden="true"
                className="size-6 shrink-0 text-sidebar-text group-hover:text-white"
              />
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DashboardMobSidebar;
