import Image from 'next/image';
import Link from 'next/link';

const Premium = () => {
  return (
    <section className="w-full  relative overflow-hidden mt-10 md:mt-25">
      {/* Background Image Half Width */}
      <div className="absolute left-0 top-0 h-full w-full">
        <Image
          src="/bg.png" // place your image in public folder
          alt="Premium Cattle"
          fill
          className="object-cover"
        />
      </div>
      <div className="wraper px-10 md:px-10 lg:px-20">
        <div className="flex gap-4 lg:gap-7">
          <div className=" h-full hidden md:block md:w-1/2 z-10">
            <Image
              src="/cowbg.png"
              alt="Premium Cattle"
              width={592}
              height={350}
              className=""
            />
          </div>

          {/* Right Side Content */}
          <div className=" flex items-center w-full py-8 md:py-10 xl:py-0 md:w-1/2 xl:max-w-[628px] relative z-10  text-center md:text-start">
            <div className="text-white">
              <h2 className="text-[18px] md:text-[24px] lg:text-[30px] xl:text-[46px] font-medium leading-[120%]  transition-all duration-300 hover:text-secondary-bg">
                Our Exclusive & Premium Cattle Collection
              </h2>
              <Link href="/cattle" className="btn btn-primary mt-4">
                <button
                  className="mt-2 md:mt-6
      bg-btn-bg text-[10px] md:text-[16px] text-primary-text
      font-semibold
      h-[24px] md:h-[39px] w-[120px] md:w-[208px] rounded-full
      transition-all duration-300 ease-in
      hover:bg-btn-hover-bg hover:text-white
      hover:scale-[1.01] "
                >
                  Explore Best Cattle
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Premium;
