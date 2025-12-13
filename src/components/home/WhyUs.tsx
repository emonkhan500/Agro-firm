'use client';

import Image from 'next/image';
import { useState } from 'react';

const cards = [
  {
    icon: '/icon/graph.png',
    text: `Our cattle grow naturally is a balanced diet that boosts
    strength and improves overall development.`,
  },
  {
    icon: '/icon/leaf.png',
    text: `Every cow receives fresh, high-quality feed daily to ensure
    better health energy and productivity.`,
  },
  {
    icon: '/icon/grass.png',
    text: `We provide clean, chemical-free green grass that keeps our
    cattle healthy and ensures pure, quality milk.`,
  },
  {
    icon: '/icon/cow.png',
    text: `Healthy, well-nourished cattle ensuring the finest farm
    products. cattle healthy and ensures pure, quality milk.`,
  },
];

const images = [
  '/gallary/gallary2.png',
  '/cows.png',
  '/gallary/gallary5.png',
  '/gallary/gallary4.png',
];

const WhyUs = () => {
  const [activeImage, setActiveImage] = useState(0);

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
            {cards.map((item, index) => (
              <div
                key={index}
                onClick={() => setActiveImage(index)}
                className={`flex gap-2.5 md:gap-7 items-center bg-primary-bg rounded-xl cursor-pointer border transition-all duration-300 ${
                  activeImage === index
                    ? 'border-call-bg'
                    : 'border-transparent'
                }  ${
                  index === 0
                    ? 'justify-between py-5 md:py-7.5 px-5 md:px-7.5'
                    : 'justify-center py-7.5 px-7 max-h-[100px]'
                }`}
              >
                <div className="w-[30px] md:w-[40px] h-[30px] md:h-[40px]">
                  <Image
                    className="w-full h-full object-cover"
                    src={item.icon}
                    alt="about"
                    width={40}
                    height={40}
                  />
                </div>

                <p
                  className={`text-[14px] md:text-[18px] leading-[115%]
                  ${
                    index === 0 ? 'font-medium md:font-normal' : 'font-normal'
                  }`}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="h-[550px] md:h-[638px] w-full lg:w-[363px] xl:w-[448px] overflow-hidden">
          <Image
            key={activeImage}
            className="w-full h-full object-cover rounded-[200px_20px] transition-all duration-500 ease-in-out opacity-0 scale-95 animate-fadeIn"
            src={images[activeImage]}
            alt="about"
            width={448}
            height={628}
          />
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
