import Contact from '@/components/gallery/contact/Contact';
import CattleDetails from '@/components/outcattle/CattleDetails';


const CattleDetailsView = ({ params }: { params: string }) => {
  return (
    <>
      <CattleDetails params={params}/>
      <Contact />
    </>
  );
};

export default CattleDetailsView;
