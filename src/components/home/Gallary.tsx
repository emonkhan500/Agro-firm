import { getGalleryList } from '@/app/actions/gallery.actions';
import Image from 'next/image';
import Link from 'next/link';

const Gallary =async () => {
    const images = await getGalleryList();
  return (
    <section className="">
      <div className="wraper px-5 lg:px-16 xl:px-20 2xl:px-20">
        {/* Heading */}
        <div className=" md:mb-12 xl:mb-0">
          <Link href="/gallery" className="text-[14px] font-medium text-active-nav underline leading-[120%] mb-2.5 md:mb-5">
            GALLERY
          </Link>
          <p className="text-[20px] md:text-[32px] font-semibold md:font-medium leading-[120%] w-full lg:max-w-[797px]">
            Discover the authentic beauty our farm, captured through moments of
            care, growth, and nature.
          </p>
        </div>
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[250px] mt-10">
          {images.slice(0, 5).map((item) => {
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
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Gallary;
