"use client";

import { useAppSelector } from "~/redux/hooks";
import Header from "~/components/layouts/Header";
import Loading from "~/components/layouts/Loading";
import useInitialize from "~/hooks/useInitialize";

export default function Home() {
  const userState = useAppSelector((state) => state.user);
  const commonState = useAppSelector((state) => state.common);

  useInitialize();

  if (commonState.isLoading || !userState.isLogin) {
    return <Loading />;
  }

  return (
    <div className="w-full flex flex-col justify-center items-center overflow-hidden no-scrollbar">
      <Header
        username={userState.username}
        avatarUrl={userState.avatarUrl}
        fullName={userState.fullName}
      />
      <div className="w-full h-[calc(100vh-80px)] p-2 flex justify-center items-center gap-2">
        <div className="w-full h-full overflow-y-scroll no-scrollbar">
          <div
            className={`w-full min-h-full bg-primary p-2 rounded-md text-white text-md flex justify-center items-center font-bold flex-col`}
          >
            <h3 className="text-3xl md:text-5xl uppercase text-center w-full">
              SELAMAT DATANG {userState.fullName}
            </h3>
            <p className="w-full text-center mt-4">Selamat belajar di Realm!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
