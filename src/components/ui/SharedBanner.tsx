'use client';

import React from 'react';

interface SharedBannerProps {
  title: string;
  image: string;
}

const SharedBanner: React.FC<SharedBannerProps> = ({ title, image }) => {
  return (
    <div className="w-full h-[110px] md:h-[250px]  relative overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      {/* CONTENT */}
      <div className="relative h-full wraper flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-[26px] md:text-[64px] font-semibold  text-primary-bg leading-[120%]">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SharedBanner;
