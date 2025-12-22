import Image from 'next/image';

const Mission = () => {
  return (
    <section className="mt-10 md:mt-20 md:mt-25">
      <div className="wraper px-5 lg:px-20 flex">

        <div className="flex flex-col md:flex-row gap-2.5 md:gap-5 items-center md:items-start">

          {/* CARD */}
          <div
            className="
              bg-cover bg-center bg-no-repeat rounded-2xl w-full md:max-w-[302px] h-[179px] md:h-full
              transition-all duration-500 ease-out
              hover:-translate-y-2 hover:shadow-lg
            "
            style={{ backgroundImage: 'url(/aboutus/cowhead.png)' }}
          >
            <div className="px-[12.5px] md:px-[21px] py-[7px] md:py-[65.5px] flex flex-col space-y-[17px] items-center justify-center md:justify-start md:space-y-[10px]">
              
              <div className="flex justify-center items-center">
                <Image
                  className="object-cover transition-transform duration-300 ease-out hover:scale-110"
                  src="/aboutus/leaf.png"
                  alt="about"
                  width={80}
                  height={80}
                />
              </div>

              <p className="text-[24px] font-medium text-btn-bg leading-[120%] text-center transition-colors duration-300 ease-in-out hover:text-opacity-80">
                Organic Nutrition
              </p>

              <p className="hidden md:block text-[12px] font-normal leading-[120%] text-white text-center transition-opacity duration-500 ease-out hover:opacity-95">
                Our cattle are raised on clean, natural feed and green grass,
                ensuring healthier growth and pure dairy output.
              </p>
            </div>
          </div>

          
          <div className="max-w-[465px] transition-opacity duration-500 ease-out hover:opacity-95">
            <p className="text-[20px] md:text-[32px] font-semibold md:font-medium leading-[125%]">
              Our Mission
            </p>
            <p className="text-[14px] font-normal leading-[120%] md:leading-[122%] mt-3 md:mt-5">
              Our mission is to raise healthy cattle and deliver pure,
              nutritious dairy and farm products to our customers. We aim to
              create a safe and sustainable farming ecosystem that protects
              animal health, promotes eco-friendly practices, and ensures
              unmatched product quality.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Mission;
