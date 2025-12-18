import { getBanners } from '@/app/actions/banner.action';
import { getProducts } from '@/app/actions/products.action';
import { getReviews } from '@/app/actions/review.actions';
import AboutUs from '@/components/home/AboutUs';
import Banner from '@/components/home/Banner';
import Contact from '@/components/home/Contact';
import Gallary from '@/components/home/Gallary';
import Premium from '@/components/home/Premium';
import Products from '@/components/home/Products';
import Testimonial from '@/components/home/Testimonial';
import WhyUs from '@/components/home/WhyUs';

const HomeView = async () => {
  const banners = await getBanners();
  const product = await getProducts();
  const reviews= await getReviews();
  return (
    <>
      <Banner banners={banners} />
      <AboutUs />
      <WhyUs />
      <Products product={product} />
      <Gallary />
      <Premium />
      <Testimonial reviews={reviews}/>
      <Contact />
    </>
  );
};

export default HomeView;
