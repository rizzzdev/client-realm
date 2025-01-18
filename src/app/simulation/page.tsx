"use client";

import ComingSoon from "~/components/layouts/ComingSoon";
import Header from "~/components/layouts/Header";
import Loading from "~/components/layouts/Loading";
import useInitialize from "~/hooks/useInitialize";
import { useAppSelector } from "~/redux/hooks";

const Simulation = () => {
  const userState = useAppSelector((state) => state.user);
  const commonState = useAppSelector((state) => state.common);

  useInitialize();

  if (commonState.isLoading || !userState.isLogin) {
    return <Loading />;
  }
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Header
        avatarUrl={userState.avatarUrl}
        fullName={userState.fullName}
        username={userState.username}
      />
      <ComingSoon />
    </div>
  );
};

export default Simulation;
