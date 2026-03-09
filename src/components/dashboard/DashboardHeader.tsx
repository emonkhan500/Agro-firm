import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline';
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/20/solid';

const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
];
type DashboardHeaderProps = {
  setSidebarOpen: (open: boolean) => void;
};

const DashboardHeader = ({ setSidebarOpen }: DashboardHeaderProps) => {
  return (
    <div className="lg:pl-72 bg-primary-bg py-4 shadow-2xs">
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-white/10  px-4  sm:gap-x-6 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="-m-2.5 p-2.5 text-gray-400 hover:text-white lg:hidden"
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon aria-hidden="true" className="size-6" />
        </button>

        {/* Separator */}
        <div aria-hidden="true" className="h-6 w-px bg-white/10 lg:hidden " />

        <div className="flex flex-1 justify-between self-stretch lg:gap-x-6 ">
          <form
            action="#"
            method="GET"
            className="grid flex-1 min-w-0 my-2 max-w-xl "
          >
            <input
              name="search"
              placeholder="Search"
              aria-label="Search"
              className="col-start-1 row-start-1 block size-full border border-border-gray px-10 md:px-18 text-base text-sidebar-text outline-hidden placeholder:text-sidebar-text sm:text-sm/6 rounded-xl bg-sidebar-bg "
            />
            <MagnifyingGlassIcon
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-sidebar-text ml-4 md:ml-8"
            />
          </form>
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-sidebar-text hover:text-custom-green"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6 " />
            </button>

            {/* Separator */}
            <div
              aria-hidden="true"
              className="hidden lg:block lg:h-6 lg:w-px lg:bg-white/10"
            />

            {/* Profile dropdown */}
            <Menu as="div" className="relative">
              <MenuButton className="relative flex items-center">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="size-8 rounded-full"
                />
                <span className="hidden lg:flex lg:items-center">
                  <span
                    aria-hidden="true"
                    className="ml-4 text-sm/6 font-semibold text-sidebar-text"
                  >
                    Tom Cook
                  </span>
                </span>
              </MenuButton>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
