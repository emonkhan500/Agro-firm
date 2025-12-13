import Product from '@/components/product/Product';
import SharedBanner from '@/components/ui/SharedBanner';

const ProductView = () => {
  return (
    <>
      <SharedBanner title="OUR PRODUCTS" image="/productbg.png" />
      <Product />
    </>
  );
};

export default ProductView;
