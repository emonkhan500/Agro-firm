import Contact from '@/components/contact/Contact';
import SharedBanner from '@/components/ui/SharedBanner';

const ContactView = () => {
  return (
    <>
    <SharedBanner title="CONTACT US" image="/aboutus/banner.png" />
      <Contact />
    </>
  );
};

export default ContactView;
