import { getProducts } from '@/app/actions/products.action';
import Image from 'next/image';


const ProductDetails =async ({params}:{params:string}) => {
  const products = await getProducts();
   console.log(params,products);
  return (
    <section>
      <div className="wraper wraper px-5 md:px-10 xl:px-20 ">
        <div className="w-full xl:w-[1282px] h-full xl:h-[600px]">
          <Image
            className="w-full h-full"
            src="/productdetailsbg.png"
            alt="about"
            width={1282}
            height={600}
          />
        </div>
        <p className="text-[16px] font-normal leading-[125%] mt-[50px]">
          Charolais is a highly prized breed of breeding cattle, known worldwide
          for its robust physique, superior genetics, and excellent
          adaptability. At 3 years of age and weighing 420 KG, this bull
          represents the perfect combination of strength, health, and pedigree,
          making it an ideal choice for advanced breeding programs. Every
          Charolais at our farm is vet-checked, ensuring complete health,
          disease resistance, and proper growth patterns, giving farmers peace
          of mind and reliable quality.
        </p>
        <p className="text-[16px] font-normal leading-[120%] mt-[18px]">
          Raised under strict farm protocols, this Charolais enjoys balanced
          nutrition, clean and spacious housing, and daily monitoring from our
          experienced veterinary team. The careful attention to feeding, health
          care, and exercise ensures that each animal grows to its full
          potential, with strong bones, excellent muscle structure, and a calm
          temperament. Its genetics are particularly valuable for producing
          offspring with enhanced weight gain, improved meat quality, and high
          survivability in various environmental conditions.
        </p>
        <p className="mt-4 text-[16px] font-normal leading-[120%]">
          Title: Fresh Milk <br /> Package: Glass Jar <br /> Weight: 2 KG <br /> Category: Milk <br />
          Quality: 100% pure
        </p>
      </div>
    </section>
  );
};

export default ProductDetails;
