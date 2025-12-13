import Image from "next/image";
import Link from "next/link";


  const images = [
    {
      id: 1,
      src: "/gallary/gallary2.png",
      alt: "Veterinarian checking cattle",
      rowSpan: "row-span-2",
      colSpan: "col-span-2",
    },
    {
      id: 2,
      src: "/gallary/gallary1.png",
      alt: "Highland cattle with horns",
      rowSpan: "row-span-1",
      colSpan: "col-span-1",
    },
    {
      id: 3,
      src: "/gallary/gallary3.png",
      alt: "Black and white dairy cattle",
      rowSpan: "row-span-1",
      colSpan: "col-span-1",
    },
    {
      id: 4,
      src: "/gallary/gallary4.png",
      alt: "Brown cattle grazing",
      rowSpan: "row-span-1",
      colSpan: "col-span-1",
    },
    {
      id: 5,
      src: "/gallary/gallary5.png",
      alt: "White cattle in field",
      rowSpan: "row-span-1",
      colSpan: "col-span-1",
    },
    {
      id: 6,
      src: "/gallary/gallary1.png",
      alt: "Large cattle in pasture",
      rowSpan: "row-span-1",
      colSpan: "col-span-1",
    },
    {
      id: 7,
      src: "/gallary/gallary3.png",
      alt: "Red cattle standing",
      rowSpan: "row-span-2",
      colSpan: "col-span-2",
    },
    {
      id: 8,
      src: "/gallary/gallary2.png",
      alt: "White cattle side view",
      rowSpan: "row-span-1",
      colSpan: "col-span-1",
    },
    {
      id: 9,
      src: "/gallary/gallary4.png",
      alt: "Highland cattle portrait",
      rowSpan: "row-span-1",
      colSpan: "col-span-1",
    },
    {
      id: 10,
      src: "/gallary/gallary5.png",
      alt: "Brown cattle grazing",
      rowSpan: "row-span-1",
      colSpan: "col-span-1",
    },
    {
      id: 11,
      src: "/gallary/gallary1.png",
      alt: "Black cattle in field",
      rowSpan: "row-span-1",
      colSpan: "col-span-1",
    },
    {
      id: 12,
      src: "/gallary/gallary3.png",
      alt: "Cattle with mountains",
      rowSpan: "row-span-1",
      colSpan: "col-span-1",
    },
    {
      id: 13,
      src: "/gallary/gallary4.png",
      alt: "Black cattle in field",
      rowSpan: "row-span-2",
      colSpan: "col-span-2",
    },
    {
      id: 14,
      src: "/gallary/gallary5.png",
      alt: "Cattle with mountains",
      rowSpan: "row-span-1",
      colSpan: "col-span-1",
    },
    {
      id: 15,
      src: "/gallary/gallary2.png",
      alt: "Cattle with mountains",
      rowSpan: "row-span-1",
      colSpan: "col-span-1",
    },
  ]


const Gallery = () => {
  return (
    <section className="mb-10 md:mb-25">
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[250px]">
            {images.map((image) => (
              <Link
                key={image.id}
                href={`/gallery/${image.id}`}
                className={`${image.colSpan} ${image.rowSpan} overflow-hidden relative rounded-xl cursor-pointer group`}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
