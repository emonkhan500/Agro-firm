import { getCattles } from '@/app/actions/cattle.action';
import Link from 'next/link';

const Cattle = async () => {
  const cattles = await getCattles();

  return (
    <section className="mt-10 md:mt-25">
      <div className="wraper relative px-5 lg:px-10 xl:px-20 2xl:px-20">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {cattles.map((item) => (
            <Link
              key={item.id}
              href={`/cattle/${item.id}`}
              className="relative w-full h-[180px] md:h-[240px] lg:h-[302px] rounded-lg overflow-hidden group"
              style={{
                backgroundImage: `url(${item.image})`,
              }}
            >
              {/* IMAGE */}
              <div
                className="
                  w-full h-full bg-cover bg-center transition-transform duration-500 ease-out
                  group-hover:scale-105
                "
                style={{
                  backgroundImage: `url(${item.image})`,
                }}
              ></div>

              {/* TITLE */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10">
                <p className="px-4 lg:px-[30px] py-2 duration-400 bg-secondary-bg hover:bg-active-nav hover:text-white rounded-t-lg text-center">
                  {item.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cattle;
