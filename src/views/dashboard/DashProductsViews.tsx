import { getProducts } from '@/app/actions/products.action';
import DashProductsManagement from '@/components/dashboard/products/DashProductsManagement';

const DashProductsViews = async () => {
  const products = await getProducts();
  return (
    <>
      <DashProductsManagement initialProducts={products} />
    </>
  );
};

export default DashProductsViews;
