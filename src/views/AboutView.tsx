import Mission from '@/components/about/Mission';
import Vission from '@/components/about/Vission';
import WhoWe from '@/components/about/WhoWe';
import SharedBanner from '@/components/ui/SharedBanner';

const AboutView = () => {
  return (
    <>
      <SharedBanner title="ABOUT US" image="/aboutus/banner.png" />
      <WhoWe />
      <Mission />
      <Vission />
    </>
  );
};

export default AboutView;
