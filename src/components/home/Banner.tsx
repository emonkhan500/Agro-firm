'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Link from 'next/link';

interface BannerItem {
  id: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  status: 'active' | 'inactive';
}

interface Props {
  banners: BannerItem[];
}

const Banner = ({ banners }: Props) => {
  return (
    <Swiper
      loop
      modules={[Autoplay]}
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      className="banner-swiper"
    >
      {banners.map((slide) => (
        <SwiperSlide key={slide.id}>
          {/* 🔴 DESIGN START (UNCHANGED) */}
          <div className="w-full h-[260px] md:h-[500px] xl:h-[600px] relative overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
            </div>

            <div className="wraper py-[56px] md:py-35 lg:py-35 xl:py-[165px] pl-5 md:pl-20">
              <div className="relative lg:max-w-[800px] xl:max-w-[912px] z-20 text-white">
                <h1 className="text-[26px] md:text-[40px] lg:text-[50px] xl:text-[64px] font-medium md:font-semibold leading-[120%]">
                  {slide.title}
                </h1>

                <p className="mt-[10px] md:mt-5 text-[12px] md:text-[16px] max-w-[642px]">
                  {slide.description}
                </p>

                <div className="flex gap-2">
                  <Link
                    href={slide.buttonLink}
                    className="mt-2 md:mt-5 w-[120px] md:w-[202px] h-6 md:h-[39px] text-primary-text bg-btn-bg flex items-center justify-center rounded-full text-[10px] md:text-[16px]"
                  >
                    {slide.buttonText}
                  </Link>

                  <Link
                    href="/contact"
                    className="lg:hidden mt-2 md:mt-5 w-[74px] md:w-[120px] h-6 md:h-[39px] text-white bg-call-bg flex items-center justify-center rounded-full text-[10px] md:text-[16px]"
                  >
                    Call Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* 🔴 DESIGN END */}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
