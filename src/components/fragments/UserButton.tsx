"use client";

import { UserCircle } from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";
import axiosIns from "~/libs/axiosIns";
import Button from "../elements/Button";
import { useAppSelector } from "~/redux/hooks";

const UserButton = ({ className }: { className?: string }) => {
  const { username, fullName, avatarUrl } = useAppSelector(
    (state) => state.user
  );
  const [isActiveButton, setIsActiveButton] = useState(false);

  const handleSignout = async () => {
    await axiosIns.patch("/signout");
    window.localStorage.setItem("access-token", "");
    window.location.href = "/";
  };

  return (
    <div
      className={`flex-1 flex gap-2 justify-end items-center text-xs font-bold ${className}`}
    >
      <div className="w-fit md:w-[20%] flex justify-end items-center text-xs md:text-sm">
        <div
          className=" bg-white flex items-center gap-1 md:gap-2 px-2 py-1 md:p-2 md:bg-white text-primary rounded-md md:relative cursor-pointer border-[2px] border-primary"
          onClick={() => setIsActiveButton(!isActiveButton)}
        >
          <UserCircle size={24} />
          {username}
        </div>
        {isActiveButton && (
          <div className="absolute w-52 border-2 border-primary md:w-48 bg-white text-white top-[72px] md:top-16 right-4 flex flex-col justify-center items-center rounded-md p-4">
            <Image
              src={avatarUrl}
              alt="#"
              width={100}
              height={100}
              className="w-full aspect-square object-cover mb-2"
            />
            <p className="text-primary font-bold">{fullName}</p>
            <p className="text-primary font-bold mb-2">@{username}</p>
            <Button
              text="SIGN OUT"
              onClick={handleSignout}
              className="h-fit bg-primary text-white p-2 mt-0"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserButton;
