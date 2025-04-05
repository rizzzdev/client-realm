"use client";

import { List, X } from "@phosphor-icons/react";
import Title from "../elements/Title";
import Menu from "../fragments/Menu";
import UserButton from "../fragments/UserButton";
import { useState } from "react";
import { useAppSelector } from "~/redux/hooks";

const HeaderMobile = ({
  isMenuActive,
  handleClick,
}: {
  isMenuActive: boolean;
  handleClick?: () => void;
}) => {
  const { role } = useAppSelector((state) => state.user);

  return (
    <div
      className={`w-full h-screen fixed top-0 left-0 ${
        isMenuActive ? "flex" : "hidden"
      } flex flex-col justify-center items-center px-4 py-4  bg-white shadow-sm shadow-gray-300 gap-8`}
    >
      <div className="w-full flex justify-between items-center">
        <Title />
        {isMenuActive && (
          <X
            size={32}
            className="text-primary cursor-pointer md:hidden"
            onClick={handleClick}
          />
        )}
      </div>
      <Menu className="">
        <Menu.List href="/" text="Beranda" />
        <Menu.List href="/learn" text="Belajar" />
        <Menu.List href="/test" text="Tes" />
        <Menu.List href="/simulation" text="Simulasi" />
        <Menu.List href="/leaderboard" text="Papan Peringkat" />
        {role === "ADMIN" && <Menu.List href="/admin" text="Menu Admin" />}
      </Menu>
    </div>
  );
};

const Header = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const { role } = useAppSelector((state) => state.user);

  const handleClick = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
    <header className="w-full h-20 flex justify-center items-center px-4 py-4 md:px-8 md:py-4 bg-white text-slate-800 shadow-sm shadow-primary border-b-slate-400 fixed top-0 left-0 z-[99]">
      <Title />
      <Menu className="hidden md:flex jus">
        <Menu.List href="/" text="Beranda" />
        <Menu.List href="/learn" text="Belajar" />
        <Menu.List href="/test" text="Tes" />
        <Menu.List href="/simulation" text="Simulasi" />
        <Menu.List href="/leaderboard" text="Papan Peringkat" />
        {role === "ADMIN" && <Menu.List href="/admin" text="Menu Admin" />}
      </Menu>
      <div className="flex justify-center items-center gap-2 md:hidden">
        <UserButton />
        <List
          size={32}
          className="text-primary cursor-pointer"
          onClick={handleClick}
        />
        <HeaderMobile isMenuActive={isMenuActive} handleClick={handleClick} />
      </div>
      <UserButton className="hidden md:flex" />
    </header>
  );
};

export default Header;
