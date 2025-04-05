import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../elements/Button";

const LearningCard = ({
  title,
  description,
  materialId,
  imageUrl,
  isUnlocked,
}: {
  title: string;
  description: string;
  materialId: string;
  imageUrl: string;
  isUnlocked: boolean;
}) => {
  const router = useRouter();

  const handleClick = () => {
    setTimeout(() => {
      router.push("/learn/" + materialId);
    }, 1000);
  };

  return (
    <div className="w-full flex flex-col justify-between items-center border-[4px] border-white rounded-md overflow-hidden hover:shadow-md hover:shadow-white hover:-translate-y-1 text-primary bg-white">
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

      <Button
        text={
          isUnlocked
            ? "Mulai Belajar"
            : "Silahkan selesaikan materi sebelumnya untuk membuka materi ini!"
        }
        className="mt-3 text-white bg-primary"
        onClick={handleClick}
        disabled={!isUnlocked}
      />
    </div>
  );
};

export default LearningCard;
