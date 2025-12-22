import ProductView from '@/views/ProductView';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Products',
  description: 'We are best cattle & dairy farm in our country',
};
const page = () => {
  return (
    <>
      <ProductView />
    </>
  );
};

export default page;
