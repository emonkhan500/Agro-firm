import ContactView from '@/views/ContactView';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'We are best cattle & dairy farm in our country',
};
const page = () => {
  return (
    <>
      <ContactView />
    </>
  );
};

export default page;
