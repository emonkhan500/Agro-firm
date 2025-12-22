import { getGalleryList } from '@/app/actions/gallery.actions';
import Image from 'next/image';
import Link from 'next/link';

const Gallery = async () => {
  const images = await getGalleryList();

  return (
    <section className="mb-10 md:mb-25 mt-10">
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[250px]">
          {images.map((item) => {
            const thumb = item.thumbnails?.[0]; 

            return (
              <Link
                key={item.id}
                href={`/gallery/${item.id}`}
                className={`${thumb?.colSpan || 'col-span-1'} ${
                  thumb?.rowSpan || 'row-span-1'
                } overflow-hidden relative rounded-xl cursor-pointer group`}
              >
                <Image
                  src={thumb?.src || '/placeholder.svg'}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
