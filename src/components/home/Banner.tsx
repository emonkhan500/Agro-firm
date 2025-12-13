'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Link from 'next/link';

const Banner = () => {
  const slides = [
    {
      id: 1,
      bg: '/banner.png',
    },
    {
      id: 2,
      bg: 'detailsbg.png',
    },
    {
      id: 3,
      bg: 'cowbg2.png',
    },
  ];
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      loop={true}
      modules={[Autoplay]}
      className="banner-swiper"
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="w-full h-[260px] md:h-[500px] xl:h-[600px] relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.bg})`,
              }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content Container */}
            <div className="wraper py-[56px] md:py-35 lg:py-35 xl:py-[165px] pl-5 md:pl-20">
              <div className="relative lg:max-w-[800px]  xl:max-w-[912px] text-start z-20 text-white">
                <h1 className="text-[26px] md:text-[40px] lg:text-[50px] xl:text-[64px] font-medium md:font-semibold leading-[120%]">
                  Premium <span className="text-btn-bg">Cattle</span> &{' '}
                  <span className="text-btn-bg">Dairy</span> From Sustainable{' '}
                  <span className="text-btn-bg">Farming</span>
                </h1>
                <p className="mt-[10px] md:mt-5 text-[12px] md:text-[16px] font-normal leading-[120%] max-w-[255px] md:max-w-[642px]">
                  We ensure premium breed quality through scientific feeding,
                  hygiene, and expert veterinary supervision.
                </p>

                <div className="flex gap-2">
                  <Link
                    href="/cattle"
                    className="mt-2 md:mt-5 w-[120px] md:w-[202px] h-6 md:h-[39px] text-primary-text bg-btn-bg flex items-center justify-center rounded-full text-[10px] md:text-[16px]"
                  >
                    Explore Our Cattle
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
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
