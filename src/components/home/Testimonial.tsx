'use client';

import { Left, Right } from '@/icon';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { useRef } from 'react';
import Image from 'next/image';
export interface Review {
  id: number;
  name: string;
  place: string;
  image: string;
  review: string;
  created: string;
}

const Testimonial = ({ reviews }: { reviews: Review[] }) => {
  console.log(reviews);
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="mt-10 md:mt-25">
      <div className="wraper relative px-5 lg:px-16 xl:px-20 2xl:px-20">
        {/* Heading */}
        <div className="md:mb-12 xl:mb-0">
          <p className="text-[14px] font-medium text-active-nav underline leading-[120%] mb-2.5 md:mb-5">
            TESTIMONIAL
          </p>
          <p className="text-[20px] md:text-[32px] font-semibold md:font-medium leading-[120%] max-w-[314px] md:max-w-[520px] lg:max-w-[797px]">
            Client review beauty our farm, captured through moments of care,
            growth, and nature.
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          className="mt-3 md:mt-5"
        >
          {reviews.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col md:flex-row gap-2.5 md:gap-5.5 bg-primary-bg px-10 xl:px-[142px] pt-9 md:pt-9 pb-4 md:pb-9 items-center">
                <div className="w-[200px] h-[200px]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={200}
                    height={200}
                    className="w-full h-full"
                  />
                </div>

                <div className="w-full xl:max-w-[772px] flex flex-col-reverse md:flex-col justify-center items-center md:items-start">
                  <p className="text-[18px] md:text-[24px] font-medium leading-[125%] mb-5 text-center md:text-left">
                    {item.review}
                  </p>
                  <p className="hidden md:block text-[18px] font-medium leading-[122%] mb-[10px]">
                    {item.name}
                  </p>
                  <p className="text-[16px] font-normal leading-[122%] mb-[10px] md:mb-0">
                    {item.place}
                  </p>
                  <p className=" md:hidden text-[18px] font-medium leading-[122%] mb-[10px]">
                    {item.name}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Left / Right Button */}
        <div className="absolute top-15 md:top-24 xl:top-17 right-5 md:right-21 flex gap-6">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-5 md:w-[42px] h-5 md:h-[42px]"
          >
            <Left />
          </button>

          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            className="w-[42px] h-[42px]"
          >
            <Right />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
