import AboutView from '@/views/AboutView';

import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'About Us',
  description: 'We are best cattle & dairy farm in our country',
};
const page = () => {
  return (
    <>
      <AboutView />
    </>
  );
};

export default page;
