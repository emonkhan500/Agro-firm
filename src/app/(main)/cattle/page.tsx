import OurCattleView from '@/views/OurCattleView';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Our Cattle',
  description: 'We are best cattle & dairy farm in our country',
};
const page = () => {
  return (
    <>
      <OurCattleView />
    </>
  );
};

export default page;
