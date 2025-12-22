import { getCattles } from '@/app/actions/cattle.action';
import Image from 'next/image';
import DangerousHtml from '../shared/DangerousHtml';

const CattleDetails = async ({ params }: { params: string }) => {
  const cattles = await getCattles();
  const id = Number(params);

  const cattle = cattles.find((item) => item.id === id);

  if (!cattle) {
    return <p className="text-center mt-10">Product not found</p>;
  }

  return (
    <section>
      <div className="wraper wraper px-5 md:px-10 xl:px-20 mt-10">
        <div className="w-full max-w-[1282px] h-[600px] mx-auto">
          <Image
            className="w-full h-full object-cover object-fit hover:scale-[1.02] duration-500 "
            src={cattle.image}
            alt="about"
            width={1282}
            height={600}
          />
        </div>

        <div className="w-full xl:w-[1282px]">
          <DangerousHtml props={cattle.description} />
        </div>
      </div>
    </section>
  );
};

export default CattleDetails;
