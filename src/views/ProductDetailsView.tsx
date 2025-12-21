import Contact from '@/components/contact/Contact';
import ProductDetails from '@/components/product/ProductDetails';

const ProductDetailsView = ({ params }: { params: string }) => {
  return (
    <>
      <ProductDetails params={params} />
      <Contact />
    </>
  );
};

export default ProductDetailsView;
