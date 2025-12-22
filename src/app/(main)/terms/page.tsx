import TermsView from '@/views/TermsView';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'We are best cattle & dairy farm in our country',
};
const page = () => {
  return (
    <>
      <TermsView />
    </>
  );
};

export default page;
