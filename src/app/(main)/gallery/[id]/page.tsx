import GalleryDetailsView from '@/views/GalleryDetailsView';

interface GalleryPageProps {
  params: {
    id: string;
  };
}
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