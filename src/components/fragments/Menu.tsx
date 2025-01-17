import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const List = ({ text, href }: { text: string; href: string }) => {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={`w-full md:w-fit text-xs px-4 py-3 text-white ${
        href === path
          ? "bg-secondary md:bg-primary md:border-b-[2px]  md:border-b-secondary"
          : ""
      } rounded-sm hover:bg-secondary md:hover:bg-primary md:hover:border-b-[2px] md:hover:border-b-secondary ease-out duration-100`}
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
      className={`w-full md:w-[60%] h-full md:h-fit flex justify-start md:justify-center gap-2 md:gap-6 items-start flex-col md:flex-row text-sm font-bold ${className}`}
    >
      {children}
    </div>
  );
};

Menu.List = List;
export default Menu;
