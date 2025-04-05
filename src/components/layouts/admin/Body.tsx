"use client";

import { ReactNode, useState } from "react";
import Header from "../Header";
import Navbar from "./Navbar";
import { useAppSelector } from "~/redux/hooks";
import TransitPage from "../TransitPage";
import Loading from "../Loading";

interface BodyProps {
  children: ReactNode;
}

const Body = (props: BodyProps) => {
  const [isNavbarActive, setIsNavbarActive] = useState(true);
  const { isLoading } = useAppSelector((state) => state.common);
  const { fullName, role } = useAppSelector((state) => state.user);

  if (isLoading) {
    return <Loading />;
  }

  if (role !== "ADMIN") {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <Header />
        <TransitPage>
          Mohon maaf, Anda tidak memiliki ijin untuk mengakses menu ini!
        </TransitPage>
      </div>
    );
  }

  return (
    <>
      <Navbar
        adminFullName={fullName}
        isNavbarActive={isNavbarActive}
        setIsNavbarActive={setIsNavbarActive}
      />
      <div className="w-full h-screen absolute bg-primary md:hidden flex justify-center items-center pt-24 pb-4 px-4">
        <Header />
        <p className="w-full text-center text-white font-bold md:hidden">
          Untuk pengalaman pengguna yang lebih baik, fitur ini hanya bisa
          diakses melalui perangkat komputer atau laptop.
        </p>
      </div>
      <div
        className={`w-full min-h-screen flex justify-center items-center ${
          isNavbarActive ? "pl-60" : "pl-8"
        } pr-8 py-8 bg-primary text-white flex-col`}
      >
        {props.children}
      </div>
    </>
  );
};

export default Body;
