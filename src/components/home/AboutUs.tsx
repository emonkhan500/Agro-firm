import Image from 'next/image';

const AboutUs = () => {
  return (
    <section>
      <div className="wraper px-5 xl:px-20 py-10 md:py-25 flex flex-col-reverse lg:flex-row gap-[10px] md:gap-6">
        <div className="h-[247px] md:h-[400px] lg:h-[628px] w-full lg:w-1/2 2xl:w-[628px] overflow-hidden rounded-2xl">
          <Image
            className="
              w-full h-full object-cover rounded-2xl
              transition-transform duration-500 ease-out
              hover:scale-[1.03]
            "
            src="/aboutus/cows.png"
            alt="about"
            width={628}
            height={628}
          />
        </div>

        <div className="relative w-full lg:w-1/2 2xl:w-[628px] ">
          <p className="md:mt-[41px] text-[14px] font-medium text-active-nav underline leading-[120%]">
            ABOUT US
          </p>

          <h1 className="text-[20px] md:text-[32px] font-semibold md:font-medium leading-[125%] mt-2.5 md:mt-4.5">
            We are best cattle & dairy farm in our country
          </h1>

          <p className="text-[14px] font-normal leading-[120%] md:leading-[122%] mt-2.5 md:mt-4.5 text-primary-text">
            At our dairy and cattle farm, we combine modern farming techniques
            with ethical livestock care to produce the highest quality dairy
            products. Our mission is to raise healthy, well-nurtured cattle and
            deliver fresh, safe, and nutritious milk to our customers every day.
            With a commitment to sustainability, hygiene, and innovation, we
            maintain farm standards that ensure purity in every drop.{` `}
            <span
              className="
                text-btn-bg cursor-pointer
                transition-colors duration-300 ease-in-out
                hover:text-opacity-80 underline-offset-4 hover:underline
              "
            >
              See More
            </span>
          </p>

          <div className="top-97.5 md:top-auto lg:-left-34 absolute flex flex-row gap-[14px] md:gap-6 mt-6">
            {/* CARD 1 */}
            <div
              className="
                bg-cover bg-center bg-no-repeat rounded-2xl
                max-w-[179px] md:max-w-[302px]
                transition-all duration-500 ease-out
                hover:-translate-y-2 hover:shadow-xl
              "
              style={{ backgroundImage: 'url(/aboutus/cowhead.png)' }}
            >
              <div className="px-[12.5px] md:px-[21px] py-[7px] md:py-[65.5px] flex flex-col space-y-[17px] md:space-y-[10px]">
                <div className="flex justify-center items-center">
                  <Image
                    className="
                      transition-transform duration-300 ease-out
                      hover:scale-110
                    "
                    src="/aboutus/leaf.png"
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

            {/* CARD 2 */}
            <div
              className="
                bg-cover bg-center bg-no-repeat rounded-2xl
                max-w-[179px] md:max-w-[302px]
                transition-all duration-500 ease-out
                hover:-translate-y-2 hover:shadow-xl
              "
              style={{ backgroundImage: 'url(/aboutus/childcow.png)' }}
            >
              <div className="px-[12.5px] md:px-[21px] py-[7px] md:py-[65.5px] flex flex-col space-y-[17px] md:space-y-[10px]">
                <div className="flex justify-center items-center">
                  <Image
                    className="
                      transition-transform duration-300 ease-out
                      hover:scale-110
                    "
                    src="/aboutus/tik.png"
                    alt="about"
                    width={80}
                    height={80}
                  />
                </div>

                <p className="text-[24px] font-medium text-btn-bg leading-[120%] text-center">
                  Trusted Quality
                </p>

                <p className="hidden md:block text-[12px] font-normal leading-[120%] text-white text-center">
                  We follow strict hygiene and safety standards to guarantee
                  fresh, safe, and dependable dairy for every customer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
