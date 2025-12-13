'use client';

import { useState } from 'react';
import Image from 'next/image';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

const GalleryDetails = () => {
  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: '/gallary/gallary2.png',
      alt: 'Milking equipment in dairy barn',
    },
    {
      id: 2,
      src: '/gallary/gallary3.png',
      alt: 'Farmer caring for cattle',
    },
    {
      id: 3,
      src: '/gallary/gallary4.png',
      alt: 'Veterinarian with tablet in cattle barn',
    },
  ];
  const [mainImage, setMainImage] = useState<string>('/gallary/gallary2.png');
  const [mainImageAlt, setMainImageAlt] = useState<string>(
    'Veterinarian examining cattle in barn'
  );

  const handleThumbnailClick = (image: GalleryImage) => {
    setMainImage(image.src);
    setMainImageAlt(image.alt);
  };

  return (
    <section>
      <div className="wraper wraper px-5 md:px-10 xl:px-20 ">
        <div className="w-full xl:w-[1282px] h-full xl:h-[600px]">
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
          <div className="grid grid-cols-3 ">
            {galleryImages.map((image) => (
              <button
                key={image.id}
                onClick={() => handleThumbnailClick(image)}
                className=""
              >
                <div className="relative w-[84px] md:w-[200px] h-[84px] md:h-[200px] ">
                  <Image
                    src={image.src || '/placeholder.svg'}
                    alt={image.alt}
                    height={200}
                    width={200}
                    className="object-cover w-full h-full"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
        <p className="text-[18px] font-semibold leading-[125%] mt-[50px]">
          Title: Health check
        </p>
        <p className="text-[16px] font-normal leading-[118%] mt-[18px]">
          Charolais is a highly prized breed of breeding cattle, known worldwide
          for its robust physique, superior genetics, and excellent
          adaptability. At 3 years of age and weighing 420 KG, this bull
          represents the perfect combination of strength, health, and pedigree,
          making it an ideal choice for advanced breeding programs. Every
          Charolais at our farm is vet-checked, ensuring complete health,
          disease resistance, and proper growth patterns, giving farmers peace
          of mind and reliable quality.
        </p>
        <p className="text-[16px] font-normal leading-[120%]  mt-[18px]">
          Raised under strict farm protocols, this Charolais enjoys balanced
          nutrition, clean and spacious housing, and daily monitoring from our
          experienced veterinary team. The careful attention to feeding, health
          care, and exercise ensures that each animal grows to its full
          potential, with strong bones, excellent muscle structure, and a calm
          temperament. Its genetics are particularly valuable for producing
          offspring with enhanced weight gain, improved meat quality, and high
          survivability in various environmental conditions.
        </p>
      </div>
    </section>
  );
};

export default GalleryDetails;
