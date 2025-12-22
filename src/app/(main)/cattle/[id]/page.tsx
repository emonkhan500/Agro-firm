import CattleDetailsView from '@/views/CattleDetailsView';
import { Metadata } from 'next';

interface CattletProps {
  params: {
    id: string;
  };
}
export const metadata: Metadata = {
  title: 'Cattle Details',
  description: 'We are best cattle & dairy farm in our country',
};
const page = async ({ params }: CattletProps) => {
  const { id } = await params;
  console.log(id);
  return (
    <>
      <CattleDetailsView params={id} />
    </>
  );
};

export default page;
