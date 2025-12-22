'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import DangerousHtml from '../shared/DangerousHtml';



export interface GalleryThumbnail {
  src: string;
  rowSpan: string;
  colSpan: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  coverImage: string;
  thumbnails?: GalleryThumbnail[];
  images: string[];
  description?: string; 
  created: string;
}

export interface GalleryItemProps {
  id: string;
  images: GalleryItem[];
}



const GalleryDetails = ({ id, images }: GalleryItemProps) => {
  const detailItem = images.find((item) => item.id === id);

  const [mainImage, setMainImage] = useState<string>('/gallary/gallary2.png');
  const [mainImageAlt, setMainImageAlt] = useState<string>(
    'Veterinarian examining cattle in barn'
  );

  
  useEffect(() => {
    if (detailItem) {
      setMainImage(detailItem.coverImage);
      setMainImageAlt(detailItem.title);
    }
  }, [detailItem]);

  if (!detailItem) {
    return <p className="text-center py-20">Gallery item not found</p>;
  }

  return (
    <section>
      <div className="wraper wraper px-5 md:px-10 xl:px-20 ">
        
        <div className="w-full xl:w-[1282px] h-full xl:h-[600px] transition-transform duration-400 ease-out hover:scale-[1.01]">
          <Image
            height={600}
            width={1282}
            src={mainImage || '/placeholder.svg'}
            alt={mainImageAlt}
            className="object-cover h-full w-full"
            priority
          />
        </div>

        {/* Thumbnail Gallery */}
        <div className="max-w-[276px] md:max-w-[648px] relative z-10 mt-3 md:mt-6">
          <div className="grid grid-cols-3 gap-3">
            {detailItem.images.map((img, index) => (
              <button
                key={index}
                onClick={() => {
                  setMainImage(img);
                  setMainImageAlt(detailItem.title);
                }}
              >
                <div className="relative w-[84px] md:w-[200px] h-[84px] md:h-[200px] transition-transform duration-400 ease-out hover:scale-[1.03]">
                  <Image
                    src={img || '/placeholder.svg'}
                    alt={detailItem.title}
                    height={200}
                    width={200}
                    className="object-cover w-full h-full"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <p className="text-[18px] font-medium leading-[125%] mt-[50px]">
          <span className='text-[24px]'>Title:</span> {detailItem.title}
        </p>

        {/* Description (HTML) */}
        <div className='w-full xl:w-[1282px]'>
          <DangerousHtml props={detailItem.description || ''} />
        </div>
      </div>
    </section>
  );
};

export default GalleryDetails;
