'use client';

import { Left, Right } from '@/icon';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { useRef } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  title: string;
  image: string;
}

interface Props {
  product: Product[];
}

const Products = ({ product }: Props) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="py-10 md:py-25">
      <div className="wraper relative px-5 lg:px-16 xl:px-20 2xl:px-20">
        {/* Heading */}
        <div className=" md:mb-12 xl:mb-0">
          <Link
            href="/product"
            className="text-[14px] font-medium text-active-nav underline leading-[120%] mb-2.5 md:mb-5"
          >
            PRODUCTS
          </Link>
          <p className="text-[20px] md:text-[32px] font-semibold md:font-medium  leading-[120%] max-w-[314px] md:max-w-[520px] lg:max-w-[797px]">
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
          {product.map((item) => (
            <SwiperSlide key={item.id}>
              <Link href={`/product/${item.id}`}>
                <div className="relative h-[302px] w-[360px] md:w-[302px] rounded-lg overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 hover:scale-[1.03]"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="absolute bottom-0 left-[34px] right-[34px]">
                    <p className=" py-2 bg-secondary-bg rounded-t-lg text-center hover:bg-active-nav hover:text-white duration-400">
                      {item.title}
                    </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute top-16  md:top-24 xl:top-17 right-4 md:right-21 flex items-center jaustify-center gap-2 md:gap-4 ">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-[42px] h-[42px]"
          >
            <Left />
          </button>
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            className="w-[42px] h-[42px] "
          >
            <Right />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;
