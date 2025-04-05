import Image from "next/image";
import { ReactNode } from "react";
import Equation from "../elements/Equation";

const Highlight = ({
  text,
  className,
  children,
}: {
  text?: string;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={`w-full my-4 text-justify items-center bg-white text-primary p-2 rounded-md ${className}`}
    >
      {text && (
        <p className="w-full text-md font-bold uppercase mb-4 flex items-center">
          {text}
        </p>
      )}
      {children}
    </div>
  );
};

const Paragraph = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return <p className={`w-full my-4 text-justify ${className}`}>{children}</p>;
};

const Img = ({ src, className }: { src: string; className?: string }) => {
  return (
    <Image
      src={src}
      alt="img"
      width={400}
      height={400}
      className={`w-full object-cover my-4 rounded-md ${className}`}
      priority
    />
  );
};

const Material = ({
  title,
  className,
  children,
}: {
  title?: string;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={`w-full min-h-full pt-24 pb-4 px-4 md:pt-40 md:pb-20 md:px-20 bg-primary text-white text-sm md:text-lg ${className}`}
      id="material"
    >
      <h3 className="text-lg md:text-xl font-bold mb-8">Materi</h3>
      <h1 className="font-bold text-xl md:text-2xl mb-4">
        {title ?? "Lorem Ipsum"}
      </h1>
      {children}
    </div>
  );
};

const Quiz = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`w-full min-h-full p-4 md:p-16 text-primary text-sm md:text-lg ${className}`}
      id="quiz"
    >
      <h3 className="text-lg md:text-xl font-bold">Quiz</h3>
      <p className="w-full text-justify mb-8 text-sm md:text-lg">
        Jawaban Quiz yang akan terekam ke database hanyalah jawaban yang dikirim
        untuk pertama kalinya, mohon menjawab dengan hati-hati!
      </p>
      {children}
    </div>
  );
};
const LearnPage = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full flex justify-center items-center flex-col md:flex-col gap-2">
      {children}
    </div>
  );
};

Material.Paragraph = Paragraph;
Material.Highlight = Highlight;
Material.Img = Img;
Material.Equation = Equation;

LearnPage.Material = Material;
LearnPage.Quiz = Quiz;

export default LearnPage;
