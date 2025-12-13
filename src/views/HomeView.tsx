import AboutUs from '@/components/home/AboutUs';
import Banner from '@/components/home/Banner';
import Contact from '@/components/home/Contact';
import Gallary from '@/components/home/Gallary';
import Premium from '@/components/home/Premium';
import Products from '@/components/home/Products';
import Testimonial from '@/components/home/Testimonial';
import WhyUs from '@/components/home/WhyUs';

const HomeView = () => {
  return (
    <>
      <Banner />
      <AboutUs />
      <WhyUs />
      <Products />
      <Gallary />
      <Premium />
      <Testimonial />
      <Contact />
    </>
  );
};

export default HomeView;
