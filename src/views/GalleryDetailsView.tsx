import { getGalleryList } from '@/app/actions/gallery.actions';
import GalleryDetails from '@/components/gallery/GalleryDetails';

const GalleryDetailsView = async ({ params }: { params: string }) => {
  const images = await getGalleryList();

  return <GalleryDetails id={params} images={images} />;
 
};

export default GalleryDetailsView;
