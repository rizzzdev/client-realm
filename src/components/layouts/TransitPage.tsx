import { ReactNode } from "react";

interface TransitPageProps {
  children: ReactNode;
}

const TransitPage = (props: TransitPageProps) => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-primary pt-24 px-4 pb-4 text-white font-bold text-xl">
      {props.children}
    </div>
  );
};

export default TransitPage;
