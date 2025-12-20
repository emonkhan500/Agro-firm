import { getProducts } from '@/app/actions/products.action';
import Image from 'next/image';
import DangerousHtml from '../shared/DangerousHtml';

const ProductDetails = async ({ params }: { params: string }) => {
  const products = await getProducts();
  const id = Number(params);

  const product = products.find((item) => item.id === id);
  console.log(typeof product?.description);
  if (!product) {
    return <p className="text-center mt-10">Product not found</p>;
  }
  return (
    <section>
      <div className="wraper wraper px-5 md:px-10 xl:px-20 mt-10">
        <div className="w-full xl:w-[1282px] h-full xl:h-[600px]">
          <Image
            className="w-full h-full"
            src={product.image}
            alt="about"
            width={1282}
            height={600}
          />
        </div>

        <div className="w-full xl:w-[1282px]  ">
          <DangerousHtml props={product.description} />
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
