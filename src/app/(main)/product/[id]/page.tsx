
import ProductDetailsView from '@/views/ProductDetailsView';
interface ProductPageProps {
  params: {
    id: string;
  };
}
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
