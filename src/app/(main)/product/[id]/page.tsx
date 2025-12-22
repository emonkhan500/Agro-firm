
import ProductDetailsView from '@/views/ProductDetailsView';
import { Metadata } from 'next';
interface ProductPageProps {
  params: {
    id: string;
  };
}
export const metadata: Metadata = {
  title: 'Product Details',
  description: 'We are best cattle & dairy farm in our country',
};
const page =async ({ params }: ProductPageProps) => {
    const { id } = await params;
    console.log(id);
  return (
    <>
      <ProductDetailsView params={id} />
    </>
  );
};

export default page;
