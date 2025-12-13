import Image from 'next/image';

const WhoWe = () => {
  return (
    <section className="mt-10 md:mt-25">
      <div className="wraper px-5 lg:px-20 flex flex-col lg:flex-row items-center gap-5">
        <div className="w-full lg:w-1/2 xl:max-w-[810px]">
          <p className="text-[20px] md:text-[32px] font-semibold md:font-medium leading-[120%] mb-2.5 md:mb-5 text-primary-text">
            Who we are
          </p>
          <p className="text-[14px] font-normal leading-[120%] text-primary-text">
            At our dairy and cattle farm, we combine modern farming techniques
            with ethical livestock care to produce the highest quality dairy
            products. Our mission is to raise healthy, well-nurtured cattle and
            deliver fresh, safe, and nutritious milk to our customers every day.
            With a commitment to sustainability, hygiene, and innovation, we
            maintain farm standards that ensure purity in every drop. See More
            We are a modern, ethical and fully hygienic agro-based cattle farm
            committed to delivering premium-quality dairy and cattle products.
            From the beginning, our vision has been to create a farm where
            purity, health, and innovation come together — ensuring that every
            cattle is raised with care, every product is safe, and every
            customer receives trusted service. <br /> Our journey started with a
            simple belief: good farming begins with good practices, and good
            practices begin with honesty, transparency, and responsibility.
            Today, we proudly serve households, businesses, and cattle
            enthusiasts with farm-fresh products and healthy, vet-approved
            cattle.
          </p>
        </div>
        <div className="w-full lg:w-1/2 h-[340px] md:h-full">
          <Image
            src="/aboutus/truck.png"
            alt="about"
            width={450}
            height={380}
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default WhoWe;
