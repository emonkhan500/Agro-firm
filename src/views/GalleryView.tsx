import Gallery from "@/components/gallery/Gallery";
import SharedBanner from "@/components/ui/SharedBanner";

const GalleryView = () => {
  return (
    <>
    <SharedBanner title="GALLERY" image="/cowbg2.png" />
      <Gallery/>
    </>
  );
};

export default GalleryView;
