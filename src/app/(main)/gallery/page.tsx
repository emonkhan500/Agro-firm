import GalleryView from '@/views/GalleryView';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Gallery',
  description: 'We are best cattle & dairy farm in our country',
};
const page = () => {
  return (
    <>
      <GalleryView />
    </>
  );
};

export default page;
