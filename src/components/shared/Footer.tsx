import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-primary-bg mt-10.5 md:mt-25">
      <div className="wraper px-5 lg:px-10  xl:px-[247px] 2xl:px-[247px] py-[42px] lg:py-[52px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-20 xl:gap-40">
          <div className="flex flex-col items-start">
            <div className="flex">
              <Link href="/" className="h-[120px] w-[120px]">
                <Image
                  className="w-full h-full object-cover cursor-pointer"
                  src="/logo.png"
                  alt="Logo"
                  width={120}
                  height={120}
                />
              </Link>
            </div>

            {/* Description */}
            <p className="text-[12px] mb-2.5 leading-[120%] max-w-[192px]">
              We closely monitor each animal’s health, behavior, and activity
              every day using trained.
            </p>

            {/* Social Icons */}
            <div className="flex gap-6">
              <Image src="/icon/whatsapp.png" alt="whatsapp"  width={24} height={24} className="cursor-pointer"/>
              <Image src="/icon/fb.png" alt="facebook" width={24} height={24} className="cursor-pointer"/>
              <Image src="/icon/x.png" alt="x" width={24} height={24} className="cursor-pointer"/>
            </div>
          </div>

          {/* Middle Section - Quick Links */}
          <div className="md:ml-[88px]">
            <h3 className="text-[18px] font-medium mb-5 text-primary-text leading-[122%]">
              Quick Links
            </h3>
            <ul className="space-y-[5px]">
              <li>
                <a
                  href="/about-us"
                  className="text-[14px] font-normal leading-[120%]"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/cattle"
                  className="text-[14px] font-normal leading-[120%]"
                >
                  Our Cattle
                </a>
              </li>
              <li>
                <a
                  href="/product"
                  className="text-[14px] font-normal leading-[120%]"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="/gallery"
                  className="text-[14px] font-normal leading-[120%]"
                >
                  Gallery
                </a>
              </li>
            </ul>
          </div>

          {/* Right Section - Brand */}
          <div className="md:ml-[82px]">
            <h3 className="text-[18px] font-medium mb-5 text-primary-text leading-[122%]">
              Brand
            </h3>
            <ul className="space-y-[5px]">
              <li>
                <a
                  href="/terms"
                  className="text-[14px] font-normal leading-[120%]"
                >
                  Terms & Condition
                </a>
              </li>
              <li>
                <a href="#" className="text-[14px] font-normal leading-[120%]">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-[14px] font-normal leading-[120%]">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
