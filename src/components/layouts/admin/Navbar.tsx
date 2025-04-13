import {
  Article,
  BookOpenText,
  Browsers,
  // Exam,
  House,
  List,
  ListBullets,
  Medal,
  // Scroll,
  X,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, ReactNode } from "react";
import Title from "~/components/elements/Title";

interface MenuListProps {
  isBackToWeb?: boolean;
  link: string;
  text: string;
  iconComponent: ReactNode;
}

interface NavbarProps {
  adminFullName: string;
  isNavbarActive: boolean;
  setIsNavbarActive: Dispatch<boolean>;
}

const MenuList = (props: MenuListProps) => {
  const path = usePathname().split("/");
  const isActive =
    "/" + path[2] === props.link
      ? "bg-primary text-white font-bold"
      : !path[2] && props.link === "/"
      ? "bg-primary text-white font-bold"
      : "";
  return (
    <Link
      href={` ${props.isBackToWeb ? "/" : `/admin${props.link}`}`}
      className={`w-full p-2 flex justify-start rounded-md items-center gap-2 text-primary hover:bg-primary hover:text-white hover:font-bold text-sm ${isActive}`}
    >
      {props.iconComponent}
      <p>{props.text}</p>
    </Link>
  );
};

const Menu = () => {
  return (
    <div className="w-full p-2 mt-2 flex flex-col justify-start items-center gap-2">
      <MenuList
        link="/"
        text="Beranda"
        iconComponent={<House size={24} weight="fill" />}
      />
      <MenuList
        link="/students"
        text="Daftar Peserta Didik"
        iconComponent={<ListBullets size={24} weight="fill" />}
      />
      <MenuList
        link="/admins"
        text="Daftar Admin"
        iconComponent={<ListBullets size={24} weight="fill" />}
      />
      <MenuList
        link="/activity-logs"
        text="Log Aktivitas"
        iconComponent={<Article size={24} weight="fill" />}
      />
      <MenuList
        link="/materials"
        text="Daftar Materi"
        iconComponent={<BookOpenText size={24} weight="fill" />}
      />
      {/* <MenuList
        link="/quizzes"
        text="Kuis"
        iconComponent={<Scroll size={24} weight="fill" />}
      />
      <MenuList
        link="/tests"
        text="Tes"
        iconComponent={<Exam size={24} weight="fill" />}
      /> */}
      <MenuList
        link="/marks"
        text="Daftar Nilai"
        iconComponent={<Medal size={24} weight="fill" />}
      />
      <MenuList
        link=""
        isBackToWeb
        text="Kembali Ke Web"
        iconComponent={<Browsers size={24} weight="fill" />}
      />
    </div>
  );
};
const Navbar = (props: NavbarProps) => {
  return (
    <>
      {props.isNavbarActive && (
        <X
          size={40}
          onClick={() => props.setIsNavbarActive(!props.isNavbarActive)}
          weight="fill"
          className="fixed top-4 left-56 primary z-10 cursor-pointer text-white hidden md:block"
        />
      )}
      {!props.isNavbarActive && (
        <List
          size={40}
          onClick={() => props.setIsNavbarActive(!props.isNavbarActive)}
          weight="fill"
          className="fixed top-4 left-4 primary z-10 cursor-pointer text-white hidden md:block"
        />
      )}
      <div
        className={`w-52 h-screen bg-white
        fixed top-0 left-0 ${props.isNavbarActive ? "" : "-translate-x-full"}
         ease-in-out duration-1000 z-50 hidden md:block`}
      >
        <Title className="flex justify-center items-center p-4" />
        <p className="p-2 w-full text-center text-xs font-bold mb-2 text-primary">
          Admin: {props.adminFullName}
        </p>
        <Menu />
      </div>
    </>
  );
};

export default Navbar;
