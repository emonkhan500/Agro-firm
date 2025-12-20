import CattleDetailsView from '@/views/CattleDetailsView';

interface CattletProps {
  params: {
    id: string;
  };
}
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
