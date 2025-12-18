import Contact from '@/components/gallery/contact/Contact';
import ProductDetails from '@/components/product/ProductDetails';
interface ProductPageProps {
  params: {
    id: string;
  };
}
const ProductDetailsView = ({ params }: { params: string }) => {
  return (
    <>
      <ProductDetails params={params} />
      <Contact />
    </>
  );
};

export default ProductDetailsView;
