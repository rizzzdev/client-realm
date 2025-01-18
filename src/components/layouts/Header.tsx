"use client";

import { List, X } from "@phosphor-icons/react";
import Title from "../elements/Title";
import Menu from "../fragments/Menu";
import UserButton from "../fragments/UserButton";
import { useState } from "react";

const HeaderMobile = ({
  isMenuActive,
  handleClick,
}: {
  isMenuActive: boolean;
  handleClick?: () => void;
}) => {
  return (
    <div
      className={`w-full h-screen fixed top-0 left-0 ${
        isMenuActive ? "flex" : "hidden"
      } flex flex-col justify-center items-center px-4 py-2  bg-primary shadow-sm shadow-gray-300 gap-8`}
    >
      <div className="w-full flex justify-between items-center">
        <Title />
        {isMenuActive && (
          <X
            size={32}
            className="text-white cursor-pointer md:hidden"
            onClick={handleClick}
          />
        )}
      </div>
      <Menu className="">
        <Menu.List href="/" text="BERANDA" />
        <Menu.List href="/learn" text="BELAJAR" />
        <Menu.List href="/test" text="TES" />
        <Menu.List href="/simulation" text="SIMULASI" />
        <Menu.List href="/leaderboard" text="PAPAN PERINGKAT" />
      </Menu>
    </div>
  );
};

const Header = ({
  username,
  fullName,
  avatarUrl,
}: {
  username: string;
  fullName: string;
  avatarUrl: string;
}) => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const handleClick = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
    <header className="w-full h-16 md:h-20 flex justify-center items-center px-4 py-2 md:px-8 md:py-4 bg-primary shadow-sm shadow-gray-300">
      <Title />
      <Menu className="hidden md:flex">
        <Menu.List href="/" text="BERANDA" />
        <Menu.List href="/learn" text="BELAJAR" />
        <Menu.List href="/test" text="TES" />
        <Menu.List href="/simulation" text="SIMULASI" />
        <Menu.List href="/leaderboard" text="PAPAN PERINGKAT" />
      </Menu>
      <div className="flex justify-center items-center gap-2 md:hidden">
        <UserButton
          username={username}
          fullName={fullName}
          avatarUrl={avatarUrl}
        />
        <List
          size={32}
          className="text-white cursor-pointer"
          onClick={handleClick}
        />
        <HeaderMobile isMenuActive={isMenuActive} handleClick={handleClick} />
      </div>
      <UserButton
        username={username}
        fullName={fullName}
        avatarUrl={avatarUrl}
        className="hidden md:flex"
      />
    </header>
  );
};

export default Header;
