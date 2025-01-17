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
      className={`w-full my-4 text-justify items-center bg-secondaryAccent p-2 rounded-md ${className}`}
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
    <div className="w-full h-full md:overflow-y-scroll md:pr-1 md:no-scrollbar">
      <div
        className={`w-full min-h-full bg-primary p-4 rounded-md text-white text-md ${className}`}
      >
        <h3 className="text-xl font-bold mb-8">Materi</h3>
        <h1 className="font-bold text-2xl mb-4">{title ?? "Lorem Ipsum"}</h1>
        {children}
      </div>
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
    <div className="w-full md:w-[50%] h-full md:overflow-y-scroll md:pr-1 md:no-scrollbar">
      <div
        className={`w-full min-h-full bg-primary p-4 rounded-md text-white text-md ${className}`}
      >
        <h3 className="text-xl font-bold">Quiz</h3>
        <p className="w-full text-justify mb-8 text-sm">
          Jawaban Quiz yang akan terekam ke database hanyalah jawaban yang
          dikirim untuk pertama kalinya, mohon menjawab dengan hati-hati!
        </p>
        {children}
      </div>
    </div>
  );
};
const LearnPage = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full md:h-[calc(100vh-80px)] p-2 flex justify-center items-center flex-col md:flex-row gap-2">
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
