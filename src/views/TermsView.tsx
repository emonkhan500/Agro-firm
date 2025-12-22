import Terms from '@/components/terms/Terms';
import SharedBanner from '@/components/ui/SharedBanner';

const TermsView = () => {
  return (
    <>
      <SharedBanner title="TERMS & CONDITIONS" image="/productbg.png" />
      <Terms />
    </>
  );
};

export default TermsView;
