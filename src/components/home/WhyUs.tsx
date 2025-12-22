'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export interface WhyUsItem {
  id: string;
  title: string;
  mainImage: string;
  iconImage: string;
}

interface Props {
  whyus: WhyUsItem[];
}

const WhyUs = ({ whyus }: Props) => {
  const [activeImage, setActiveImage] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="mt-35 md:mt-0">
      <div className="wraper px-5 xl:px-20 flex flex-col lg:flex-row gap-[10px] md:gap-6">
        {/* LEFT CONTENT */}
        <div className="lg:max-w-[630px] xl:max-w-[797px] -mt-5">
          <p className="md:mt-[41px] text-[14px] font-medium text-active-nav underline leading-[120%]">
            WHY CHOOSE US
          </p>

          <p className="text-[20px] md:text-[32px] font-semibold md:font-medium leading-[125%] mt-2.5 md:mt-4.5">
            We raise our cows with proper nutrition, clean housing, and regular
            veterinary.
          </p>

          <div className="py-2 md:py-5 flex flex-col gap-2.5 md:gap-5">
            {whyus.map((item, index) => (
              <div
                key={item.id}
                onClick={() => {
                  setActiveImage(index);
                  swiperRef.current?.slideToLoop(index);
                }}
                className={`flex gap-2.5 md:gap-7 items-center bg-primary-bg rounded-xl cursor-pointer border transition-all duration-300 ${
                  activeImage === index
                    ? 'border-call-bg'
                    : 'border-transparent'
                } ${
                  index === 0
                    ? 'justify-between py-5 md:py-7.5 px-5 md:px-7.5'
                    : 'justify-center py-7.5 px-7 max-h-[100px]'
                }`}
              >
                <div className="w-[30px] md:w-[40px] h-[30px] md:h-[40px]">
                  <Image
                    className="w-full h-full object-cover"
                    src={item.iconImage}
                    alt="icon"
                    width={40}
                    height={40}
                  />
                </div>

                <p
                  className={`text-[14px] md:text-[18px] leading-[115%] ${
                    index === 0 ? 'font-medium md:font-normal' : 'font-normal'
                  }`}
                >
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-[550px] md:h-[638px] w-full lg:w-[363px] xl:w-[448px] overflow-hidden">
          <Swiper
            modules={[Autoplay]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            loop
            onSlideChange={(swiper) => setActiveImage(swiper.realIndex)}
            className="h-full"
          >
            {whyus.map((item) => (
              <SwiperSlide key={item.id}>
                <Image
                  className="w-full h-full object-cover rounded-[200px_20px] transition-all duration-500 ease-in-out opacity-0 scale-95 animate-fadeIn"
                  src={item.mainImage}
                  alt="about"
                  width={448}
                  height={628}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
