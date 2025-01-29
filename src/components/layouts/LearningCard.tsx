import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../elements/Button";

const LearningCard = ({
  title,
  description,
  materialId,
  imageUrl,
}: {
  title: string;
  description: string;
  materialId: string;
  imageUrl: string;
}) => {
  const router = useRouter();

  const handleClick = () => {
    setTimeout(() => {
      router.push("/learn/" + materialId);
    }, 1000);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between items-center bg-background text-primary border-[2px] border-secondary rounded-md overflow-hidden hover:shadow-md hover:shadow-secondary hover:-translate-y-1">
      <Image
        src={imageUrl}
        alt="img"
        width={400}
        height={400}
        className="w-full aspect-video object-cover"
      />
      <div className="w-full px-5 text-color5">
        <div className="w-full flex flex-col justify-between items-center gap-4 my-4">
          <h3 className="w-full font-bold text-center">{title}</h3>
          <p className="w-full text-center text-sm">{description}</p>
        </div>
        <p className="w-full text-center text-sm mt-8 font-bold">
          Baca selengkapnya di bawah ini!
        </p>
      </div>

      <Button text="MULAI BELAJAR" className="mt-3" onClick={handleClick} />
    </div>
  );
};

export default LearningCard;
