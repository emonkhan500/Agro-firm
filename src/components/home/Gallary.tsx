import Image from 'next/image';

const Gallary = () => {
  return (
    <section className="">
      <div className="wraper px-5 lg:px-16 xl:px-20 2xl:px-20">
        {/* Heading */}
        <div className=" md:mb-12 xl:mb-0">
          <p className="text-[14px] font-medium text-active-nav underline leading-[120%] mb-2.5 md:mb-5">
            GALLERY
          </p>
          <p className="text-[20px] md:text-[32px] font-semibold md:font-medium leading-[120%] w-full lg:max-w-[797px]">
            Discover the authentic beauty our farm, captured through moments of
            care, growth, and nature.
          </p>
        </div>
        <div className="mt-2.5 md:mt-5.5 flex flex-col md:flex-row gap-3 md:gap-6">
          <div className="h-[200px] md:w-full md:max-h-[628px] max-w-[372px] md:h-full md:max-w-[628px]">
            <Image
              className="h-full w-full"
              src="/gallary/gallary2.png"
              alt="about"
              width={628}
              height={628}
            />
          </div>
          <div className="grid grid-cols-2 md:gap-x-5.5 md:gap-y-5.5">
            <div className="max-h-[180px] md:h-full lg:max-h-[302px] max-w-[180px] md:max-w-[200px] lg:max-w-[302px]">
              <Image
                src="/gallary/gallary1.png"
                alt="about"
                width={400}
                height={400}
              />
            </div>
            <div className="max-h-[180px] md:h-full lg:max-h-[302px] max-w-[180px] md:max-w-[200px] lg:max-w-[302px]">
              <Image
                src="/gallary/gallary1.png"
                alt="about"
                width={400}
                height={400}
              />
            </div>
            <div className="hidden md:block max-h-[180px] md:h-full lg:max-h-[302px] max-w-[180px] md:max-w-[200px] lg:max-w-[302px]">
              <Image
                src="/gallary/gallary1.png"
                alt="about"
                width={400}
                height={400}
              />
            </div>
            <div className="hidden md:block max-h-[180px] md:h-full lg:max-h-[302px] max-w-[180px] md:max-w-[200px] lg:max-w-[302px]">
              <Image
                src="/gallary/gallary1.png"
                alt="about"
                width={400}
                height={400}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallary;
