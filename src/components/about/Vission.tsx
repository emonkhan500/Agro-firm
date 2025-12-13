import Image from 'next/image';

const Vission = () => {
  return (
    <section className="mt-8.5 md:-mt-33 pb-5 md:pb-0">
      <div className="wraper px-5 lg:px-20 flex justify-end">
        <div className=" flex flex-col-reverse md:flex-row items-center md:items-end gap-5">
          <div className="text-right max-w-[473px]">
            <p className="text-[20px] md:text-[32px] font-semibold md:font-medium leading-[125%]">
              Our Vision
            </p>
            <p className="text-[14px] font-normal leading-[120%] md:leading-[122%] nt-2 md:mt-5">
              Our vision is to become a leading agro-based farm known for
              integrity, innovation, and trust. We want to inspire the local
              farming community through advanced techniques, modern technology,
              and ethical cattle management — setting a new benchmark for
              quality and transparency in the farming industry.
            </p>
          </div>
          <div
            className="bg-cover bg-center bg-no-repeat rounded-2xl max-w-[179px] md:max-w-[302px] h-[179px] md:h-full"
            style={{ backgroundImage: 'url(/aboutus/childcow.png)' }}
          >
            <div className="px-[12.5px] md:px-[21px] py-[7px] md:py-[65.5px] flex flex-col space-y-[17px] justify-center md:justify-start  md:space-y-[10px]">
              <div className="flex justify-center items-center">
                <Image
                  className=" object-cover"
                  src="/aboutus/tik.png"
                  alt="about"
                  width={80}
                  height={80}
                />
              </div>
              <p className="text-[24px] font-medium text-btn-bg leading-[120%] text-center">
                Organic Nutrition
              </p>
              <p className="hidden md:block text-[12px] font-normal leading-[120%] text-white text-center">
                Our cattle are raised on clean, natural feed and green grass,
                ensuring healthier growth and pure dairy output.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vission;
