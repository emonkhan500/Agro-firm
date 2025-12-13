'use client';

import { Left, Right } from '@/icon';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { useRef } from 'react';

interface Product {
  id: number;
  title: string;
  image: string;
}

const Products = () => {
  const products: Product[] = [
    {
      id: 1,
      title: 'Fresh Milk',
      image: '/products/product1.png',
    },
    {
      id: 2,
      title: 'Pure Ghee',
      image: '/products/product2.png',
    },
    {
      id: 3,
      title: 'Grass-Fed Cottle',
      image: '/products/product3.png',
    },
    {
      id: 4,
      title: 'Natural Butter',
      image: '/products/product4.png',
    },
    {
      id: 5,
      title: 'Pure Ghee',
      image: '/products/product2.png',
    },
    {
      id: 6,
      title: 'Grass-Fed Cottle',
      image: '/products/product3.png',
    },
  ];

  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="py-10 md:py-25">
      <div className="wraper relative px-5 lg:px-16 xl:px-20 2xl:px-20">
        {/* Heading */}
        <div className=" md:mb-12 xl:mb-0">
          <p className="text-[14px] font-medium text-active-nav underline leading-[120%] mb-2.5 md:mb-5">
            PRODUCTS
          </p>
          <p className="text-[20px] md:text-[32px] font-semibold md:font-medium leading-[120%] max-w-[314px] md:max-w-[520px] lg:max-w-[797px]">
            Healthy, Organic & High-Quality Products Straight From Our Farm.
          </p>
        </div>

        {/* Slider */}
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="mt-3 md:mt-5"
        >
          {products.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className="relative h-[302px] w-[302px] bg-cover bg-center rounded-lg transition-transform duration-300 hover:scale-105"
                style={{
                  backgroundImage: `url(${item.image})`,
                }}
              >
                <div className="absolute bottom-0 left-18.5">
                  <p className="px-[34px] py-2 bg-secondary-bg rounded-t-lg text-center">
                    {item.title}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Left / Right Button */}
        <div className="absolute top-18  md:top-24 xl:top-17 right-4 md:right-21 flex gap-6">
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

export default Products;
