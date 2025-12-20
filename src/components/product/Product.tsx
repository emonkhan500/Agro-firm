import { getProducts } from '@/app/actions/products.action';

import Link from 'next/link';

const Product = async () => {
  const products = await getProducts();

  return (
    <section className="mt-10 md:mt-25 mb-0 md:mb-0 ">
      <div className="wraper relative px-5 lg:px-10 xl:px-20 2xl:px-20">
        <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((item) => (
            <Link
              href={`/product/${item.id}`}
              key={item.id}
              className="relative w-[180px] md:w-[240px] lg:w-[302px] h-[180px] lg:h-[302px] bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: `url(${item.image})`,
              }}
            >
              <div className="absolute bottom-0 left-6 md:left-10 lg:left-20">
                <p className="px-3 md:px-5 lg:px-[30px] py-2 bg-secondary-bg rounded-t-lg text-center">
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

export default Product;
