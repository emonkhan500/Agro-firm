import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-primary-bg mt-10.5 md:mt-25">
      {/* Top Section */}
      <div className="wraper px-5 lg:px-10 xl:px-20  ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 xl:gap-28 border-b border-sidebar-text py-10 md:py-[60px]">

          {/* Logo + Description */}
          <div>
            <Link
              href="/"
              className="block h-[90px] w-[54px] transition-transform duration-200 hover:scale-[1.09]"
            >
              <Image
                src="/logo.png"
                alt="Logo"
                width={120}
                height={120}
                className="w-full h-full object-cover"
              />
            </Link>

            <p className="text-[12px] leading-[140%] max-w-[220px] mt-2 mb-4">
              We closely monitor each animal’s health, behavior, and activity
              every day using trained.
            </p>

            <div className="flex gap-6">
              <Image src="/icon/whatsapp.png" alt="whatsapp" width={22} height={22} className="cursor-pointer hover:scale-110 transition" />
              <Image src="/icon/fb.png" alt="facebook" width={22} height={22} className="cursor-pointer hover:scale-110 transition" />
              <Image src="/icon/x.png" alt="x" width={22} height={22} className="cursor-pointer hover:scale-110 transition" />
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-[18px] font-medium mb-5 text-primary-text">
              Address
            </h3>
            <ul className="space-y-3 text-[14px] leading-[140%]">
              <li>
                <p className="font-medium">Head Office</p>
                <p>New York</p>
              </li>
              <li>
                <p className="font-medium">Branch Office</p>
                <p>Sidney, 1200</p>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[18px] font-medium mb-5 text-primary-text">
              Quick Links
            </h3>
            <ul className="space-y-[6px] text-[14px]">
              <li><Link href="/about-us" className="hover:text-active-nav">About Us</Link></li>
              <li><Link href="/cattle" className="hover:text-active-nav">Our Cattle</Link></li>
              <li><Link href="/product" className="hover:text-active-nav">Products</Link></li>
              <li><Link href="/gallery" className="hover:text-active-nav">Gallery</Link></li>
            </ul>
          </div>

          {/* Brand */}
          <div>
            <h3 className="text-[18px] font-medium mb-5 text-primary-text">
              Brand
            </h3>
            <ul className="space-y-[6px] text-[14px]">
              <li><Link href="/terms" className="hover:text-active-nav">Terms & Condition</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-active-nav">Privacy Policy</Link></li>
              <li><Link href="/faq" className="hover:text-active-nav">FAQ</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Section */}
      <div className="wraper px-5 lg:px-10 xl:px-[247px]">
        <div className=" py-4 text-center text-[12px]">
          © 2025 Your Company Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
