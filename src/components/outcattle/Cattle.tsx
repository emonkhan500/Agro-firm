import Link from "next/link";

const Cattle = () => {
  const products = [
    { id: 1, image: "/cows/cow1.png", title: "Nellore" },
    { id: 2, image: "/cows/cow2.png", title: "Brahman" },
    { id: 3, image: "/cows/cow3.png", title: "Charolais" },
    { id: 4, image: "/cows/cow4.png", title: "Hereford" },
    { id: 5, image: "/cows/cow5.png", title: "Sahiwal" },
    { id: 6, image: "/cows/cow6.png", title: "Brown Swiss" },
    { id: 7, image: "/cows/cow7.png", title: "Red Sindhi" },
    { id: 8, image: "/cows/cow8.png", title: "Jersey" },
  ];

  return (
    <section className="mt-10 md:mt-25">
      <div className="wraper relative px-5 lg:px-10 xl:px-20 2xl:px-20">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((item) => (
            <Link
              key={item.id}
              href={`/cattle/${item.id}`}
              className="relative w-full h-[180px] md:h-[240px] lg:h-[302px] bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: `url(${item.image})`,
              }}
            >
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                <p className="px-4 lg:px-[30px] py-2 bg-secondary-bg rounded-t-lg text-center">
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
