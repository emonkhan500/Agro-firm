import GalleryDetailsView from '@/views/GalleryDetailsView';
import { Metadata } from 'next';

interface GalleryPageProps {
  params: {
    id: string;
  };
}
export const metadata: Metadata = {
  title: 'Gallery Details',
  description: 'We are best cattle & dairy farm in our country',
};
const page =async ({params}:GalleryPageProps) => {
    const {id}= await params
    console.log(id);
    return (
        <>
           <GalleryDetailsView params={id}/> 
        </>
    );
};

export default page;