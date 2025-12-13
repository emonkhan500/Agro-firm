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

const DashboardPcSidebar = () => {
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
  return (
    <div className="hidden bg-sidebar-bg lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-white/10 bg-black/10 px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <Image alt="Your Company" src="/logo.png" width={70} height={70} />
        </div>
        <nav className="flex flex-1 flex-col">
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
    </div>
  );
};

export default DashboardPcSidebar;
