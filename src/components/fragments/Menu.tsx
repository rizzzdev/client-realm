import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const List = ({ text, href }: { text: string; href: string }) => {
  const path = "/" + usePathname().split("/")[1];

  return (
    <Link
      href={href}
      className={`w-full md:w-fit text-sm px-4 py-3 text-primary ${
        path === href ? "bg-primary text-white font-bold" : ""
      } rounded-md hover:bg-primary hover:text-white hover:font-bold ease-out duration-100`}
    >
      {text}
    </Link>
  );
};

const Menu = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={`w-full md:w-[60%] h-full md:h-fit flex justify-start md:justify-center gap-2 md:gap-6 items-center flex-col md:flex-row text-sm font-semibold ${className}`}
    >
      {children}
    </div>
  );
};

Menu.List = List;
export default Menu;
