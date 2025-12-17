import { getMedia } from '@/app/actions/media.actions';
import DashMediaManagement from '@/components/dashboard/mediaLibrary/DashMediaManagement';

const MediaLibraryViews = async () => {
  const media = await getMedia();
  return (
    <>
      <DashMediaManagement initialMedia={media} />
    </>
  );
};

export default MediaLibraryViews;
