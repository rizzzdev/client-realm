import { ReactNode } from "react";

const HomeCard = ({
  title,
  outerClassName,
  innerClassName,
  children,
}: {
  title: string;
  outerClassName?: string;
  innerClassName?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={`w-full border border-primary rounded-md ${outerClassName}`}
    >
      <div className="w-full h-full flex flex-col justify-center items-center border-b border-b-primary">
        <h3 className="w-full font-bold p-2 text-primary text-md md:text-lg">
          {title}
        </h3>
      </div>
      <div className={`text-primary text-sm md:text-md ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default HomeCard;
