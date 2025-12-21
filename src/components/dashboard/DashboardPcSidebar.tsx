'use client';
import { usePathname } from 'next/navigation';
import cn from '@/utilis/cn';
import Image from 'next/image';
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

const DashboardPcSidebar = () => {
  const pathname = usePathname();
  const navigation = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon },
    { name: 'Banner Management', href: '/banner-management', icon: UsersIcon },
 
    {
      name: 'Why Choose Us',
      href: '/why-choose-management',
      icon: CalendarIcon,
    },
    {
      name: 'Products Management',
      href: '/products-management',
      icon: DocumentDuplicateIcon,
    },
   
    {
      name: 'Gallery Management',
      href: '/gallery-management',
      icon: ChartPieIcon,
    },
    {
      name: 'Contact Information',
      href: '/contact-information',
      icon: ChartPieIcon,
    },
    {
      name: 'Cattle Management',
      href: '/cattle-management',
      icon: ChartPieIcon,
    },
    {
      name: 'Review Management',
      href: '/review-management',
      icon: ChartPieIcon,
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
  return (
    <div className="hidden bg-primary-bg lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col shadow-md">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-white/10  px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <Image alt="Your Company" src="/logo.png" width={70} height={70} />
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-4">
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
    </div>
  );
};

export default DashboardPcSidebar;
