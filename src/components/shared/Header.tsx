'use client';

import { Menu } from '@/icon';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { label: 'HOME', path: '/' },
  { label: 'ABOUT', path: '/about-us' },
  { label: 'OUR CATTLE', path: '/cattle' },
  { label: 'GALLERY', path: '/gallery' },
  { label: 'CONTACT', path: '/contact' },
];

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-primary-bg  relative">
      <div className="w-full flex items-center justify-between 2xl:justify-center  2xl:gap-[273px] py-[7px] md:py-0 px-5 md:px-1 xl:px-20 2xl:px-20 wraper">
        {/* Logo */}
        <div className="flex">
          <Link
            href="/"
            className="h-[46px] md:h-[120px] w-[34px] md:w-[120px]"
          >
            <Image
              className="w-full h-full object-cover"
              src="/logo.png"
              alt="Logo"
              width={120}
              height={120}
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-4 lg:gap-7.5 justify-center">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`text-[16px] font-medium transition-colors
                ${
                  isActive ? 'text-active-nav underline underline-offset-4' : ''
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Link href="/contact">
          <button className="hidden md:block h-[39px] w-[145px] rounded-full font-bold text-[16px] bg-btn-bg hover:bg-btn-hover-bg">
            CALL NOW
          </button>
        </Link>

        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute  right-0 w-full bg-primary-bg z-10 flex flex-col items-center gap-6 py-8 md:hidden">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMenuOpen(false)}
                className={`text-[16px] font-medium
                ${isActive ? 'text-active-nav underline' : ''}`}
              >
                {item.label}
              </Link>
            );
          })}

          <Link href="/contact">
          <button className="hidden md:block h-[39px] w-[145px] rounded-full font-bold text-[16px] bg-btn-bg hover:bg-btn-hover-bg">
            CALL NOW
          </button>
        </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
