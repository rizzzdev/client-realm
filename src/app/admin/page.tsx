"use client";

import Body from "~/components/layouts/admin/Body";
import Loading from "~/components/layouts/Loading";
import useInitialize from "~/hooks/useInitialize";
import { useAppSelector } from "~/redux/hooks";

const Home = () => {
  const { fullName } = useAppSelector((state) => state.user);
  const { isLoading } = useAppSelector((state) => state.common);

  useInitialize();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Body>
      <div className="w-full flex flex-col justify-center items-center gap-2">
        <h3 className="text-3xl font-bold">Halo, Selamat Datang {fullName}.</h3>
        <p className="text-md">Selamat mengakses fitur-fitur di Menu Admin!</p>
      </div>
    </Body>
  );
};

export default Home;
