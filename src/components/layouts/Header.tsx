"use client";

import Link from "next/link";
import { SignIn, UserPlus } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
export default function Header({
  active,
  isLogin,
  username,
}: {
  active: string;
  isLogin: boolean;
  username: string;
}) {
  const router = useRouter();

  return (
    <header className="w-full h-20 flex justify-center items-center px-14 py-4 text-color5 bg-color1">
      <div className="w-[20%] text-4xl font-bold flex justify-start items-center">
        <Link href="/" className="">
          Realm<span className="text-color3">.</span>
        </Link>
      </div>
      <div className="w-[60%] flex justify-center gap-6 items-center  text-sm font-bold">
        <Link
          href={`/`}
          className={`${
            active === "beranda"
              ? "text-color3"
              : "text-color5, hover:text-color3"
          }`}
        >
          BERANDA
        </Link>
        <Link
          href={`/belajar`}
          className={`${
            active === "belajar"
              ? "text-color3"
              : "text-color5, hover:text-color3"
          }`}
        >
          BELAJAR
        </Link>
        <Link
          href={`/`}
          className={`${
            active === "latihan-soal"
              ? "text-color3"
              : "text-color5, hover:text-color3"
          }`}
        >
          LATIHAN SOAL
        </Link>
        <Link
          href={`/`}
          className={`${
            active === "simulasi"
              ? "text-color3"
              : "text-color5, hover:text-color3"
          }`}
        >
          SIMULASI
        </Link>
        <Link
          href={`/`}
          className={`${
            active === "dashboard-admin"
              ? "text-color3"
              : "text-color5, hover:text-color3"
          }`}
        >
          DASHBOARD ADMIN
        </Link>
      </div>
      {!isLogin && (
        <div className="w-[20%] flex gap-2 justify-end items-center text-sm font-bold text-white">
          <button
            className="hover:bg-color5 flex gap-1 justify-center items-center bg-color3 py-1 px-3 rounded-lg ease-in-out duration-500"
            onClick={() => router.push("/masuk")}
          >
            <SignIn size={24} />
            <p>MASUK</p>
          </button>
          <button className="hover:bg-color5 flex gap-1 justify-center items-center bg-color3 py-1 px-3 rounded-lg ease-in-out duration-500">
            <UserPlus size={24} weight="fill" />
            <p>REGISTRASI</p>
          </button>
        </div>
      )}
      {isLogin && (
        <div className="w-[20%] flex justify-end items-center text-sm font-bold text-white">
          <div className="p-2 bg-color4 text-white rounded-md">{username}</div>
        </div>
      )}
    </header>
  );
}
