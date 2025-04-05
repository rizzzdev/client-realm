"use client";

import { useAppSelector } from "~/redux/hooks";
import Header from "~/components/layouts/Header";
import Loading from "~/components/layouts/Loading";
import useInitialize from "~/hooks/useInitialize";
import HomeCard from "~/components/layouts/HomeCard";
import Image from "next/image";
import { Check, X } from "@phosphor-icons/react";
import { useState } from "react";
import Link from "next/link";
import axiosIns from "~/libs/axiosIns";
import { TestState } from "~/redux/slices/testSlice";

interface Material {
  id: string;
  title: string;
  description: string;
  quiz: {
    id: string;
  };
}

interface Activity {
  id: string;
  materialId?: string;
  quizId?: string;
  testId?: string;
  userId: string;
  message: string;
  activityType: string;
}

interface User {
  id: string;
}

const Status = ({ type }: { type: "DONE" | "NOT DONE" }) => {
  if (type === "NOT DONE") {
    return (
      <span className="w-full text-center flex gap-1 justify-center items-center">
        <X size={28} weight="fill" className="text-red-700" />
        <p>Belum Diselesaikan!</p>
      </span>
    );
  }
  return (
    <span className="w-full text-center flex gap-1 justify-center items-center">
      <Check size={28} weight="fill" className="text-green-700" />
      <p>Sudah Diselesaikan!</p>
    </span>
  );
};

const Hero = ({ fullName }: { fullName: string }) => {
  return (
    <div className="w-full pt-20 bg-primary h-screen flex flex-col justify-center items-center">
      <h3 className="text-xl md:text-3xl font-bold text-white p-8 w-full text-center">
        Selamat datang kembali, {fullName}
      </h3>
      <p className="w-full text-center text-white text-sm md:text-lg font-bold">
        Senang dapat berjumpa kembali, semoga pengalaman belajarmu menyenangkan!
      </p>
    </div>
  );
};

const Preface = ({
  materialsData,
  activityData,
  userData,
  testsData,
}: {
  materialsData: Material[];
  activityData?: Activity[];
  userData: User;
  testsData: TestState[];
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 justify-center items-center p-4 gap-2">
        <HomeCard
          title="Tujuan Pembelajaran"
          innerClassName="w-full h-96 flex p-4 flex-col"
        >
          <p className="w-full">
            Di akhir pembelajaran, peserta didik diharapkan dapat:
          </p>
          <ul className="list-disc w-full pl-8 mt-2">
            <li className="w-full text-justify">
              menjelaskan konsep gerak relatif dan kerangka acuan inersial serta
              menerapkannya dalam studi kasus,
            </li>
            <li className="w-full text-justify">
              menjelaskan konsep transformasi Galileo serta menerapkannya dalam
              studi kasus,
            </li>
            <li className="w-full text-justify">
              menjelaskan postulat Einstein,
            </li>
            <li className="w-full text-justify">
              menjelaskan konsep transformasi Lorentz serta menerapkannya dalam
              studi kasus,
            </li>
            <li className="w-full text-justify">
              menjelaskan konsep dilatasi waktu serta menerapkannya dalam studi
              kasus,
            </li>
            <li className="w-full text-justify">
              menjelaskan konsep kontraksi panjang serta menerapkannya dalam
              studi kasus,
            </li>
            <li className="w-full text-justify">
              menjelaskan konsep massa dan momentum relativistik serta
              menerapkannya dalam studi kasus, dan
            </li>
            <li className="w-full text-justify">
              menjelaskan ekivalensi massa-energi serta menerapkannya dalam
              studi kasus.
            </li>
          </ul>
        </HomeCard>
        <HomeCard
          title="Peta Konsep"
          innerClassName="w-full h-96 flex flex-col p-8 justify-center items-center"
        >
          <Image
            src={"/peta-konsep.png"}
            alt="peta-konsep"
            width={1000}
            height={1000}
            className="w-full h-full object-contain"
            onClick={() => setIsActive(!isActive)}
          />
          <p className="mt-4 text-xs">
            Klik gambar untuk memperbesar peta konsep!
          </p>
        </HomeCard>
        <HomeCard
          title="Aktivitas Pembelajaran"
          outerClassName="col-span-full"
          innerClassName="w-full flex flex-col justify-center items-center p-8"
        >
          <div className="w-full flex flex-col gap-2 justify-center items-center mb-8">
            <h3 className="w-full font-bold">Aktivitas Materi</h3>
            <table className="w-full">
              <thead className="w-full">
                <tr className="w-full h-8 text-center border-b border-b-primary bg-primary text-white">
                  <th className="w-[10] border border-primary p-1">No.</th>
                  <th className="w-[50%] border border-primary p-1">Materi</th>
                  <th className="w-[20%] border border-primary p-1">
                    Link Materi
                  </th>
                  <th className="w-[20%] border border-primary p-1">Status</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {materialsData.map((material, index) => {
                  const isDone = activityData?.filter(
                    (activity) =>
                      activity.userId === userData.id &&
                      activity.materialId === material.id
                  )[0];
                  return (
                    <tr
                      className="w-full text-center text-primary"
                      key={material.id}
                    >
                      <th className="w-[10%] border border-primary font-normal p-1">
                        {index + 1}
                      </th>
                      <th className="w-[50%] border border-primary font-normal text-justify p-1">
                        {material.title}
                      </th>
                      <th className="w-[20%] border border-primary font-normal p-1">
                        <Link href={`/learn/${material.id}`}>Klik DisinI!</Link>
                      </th>
                      <th className="w-[20%] border border-primary font-normal p-1">
                        {isDone ? (
                          <Status type="DONE" />
                        ) : (
                          <Status type="NOT DONE" />
                        )}
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="w-full flex flex-col gap-2 justify-center items-center mb-8">
            <h3 className="w-full font-bold">Aktivitas Kuis</h3>
            <table className="w-full">
              <thead className="w-full">
                <tr className="w-full h-8 text-center border-b border-b-primary bg-primary text-white">
                  <th className="w-[10] border border-primary p-1">No.</th>
                  <th className="w-[50%] border border-primary p-1">Kuis</th>
                  <th className="w-[20%] border border-primary p-1">
                    Link Kuis
                  </th>
                  <th className="w-[20%] border border-primary p-1">Status</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {materialsData.map((material, index) => {
                  const isDone = activityData?.filter(
                    (activity) =>
                      activity.userId === userData.id &&
                      activity.quizId === material.quiz.id
                  )[0];
                  return (
                    <tr
                      className="w-full text-center text-primary"
                      key={material.quiz.id}
                    >
                      <th className="w-[10%] border border-primary font-normal p-1">
                        {index + 1}
                      </th>
                      <th className="w-[50%] border border-primary font-normal text-justify p-1">
                        {material.title}
                      </th>
                      <th className="w-[20%] border border-primary font-normal p-1">
                        <Link href={`/learn/${material.id}?quiz=true`}>
                          Klik Disini!
                        </Link>
                      </th>
                      <th className="w-[20%] border border-primary font-normal p-1">
                        {isDone ? (
                          <Status type="DONE" />
                        ) : (
                          <Status type="NOT DONE" />
                        )}
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="w-full flex flex-col gap-2 justify-center items-center mb-8">
            <h3 className="w-full font-bold">Aktivitas Test</h3>
            <table className="w-full">
              <thead className="w-full">
                <tr className="w-full h-8 text-center border-b border-b-primary bg-primary text-white">
                  <th className="w-[10] border border-primary p-1">No.</th>
                  <th className="w-[50%] border border-primary p-1">Test</th>
                  <th className="w-[20%] border border-primary p-1">
                    Link Test
                  </th>
                  <th className="w-[20%] border border-primary p-1">Status</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {testsData.map((test, index) => {
                  const isDone = activityData?.filter(
                    (activity) =>
                      activity.userId === userData.id &&
                      activity.testId === test.id
                  )[0];
                  return (
                    <tr
                      className="w-full text-center text-primary"
                      key={test.id}
                    >
                      <th className="w-[10%] border border-primary font-normal p-1">
                        {index + 1}
                      </th>
                      <th className="w-[50%] border border-primary font-normal text-justify p-1">
                        {test?.title}
                      </th>
                      <th className="w-[20%] border border-primary font-normal p-1">
                        <Link href={`/test/${test.id}`}>Klik Disini!</Link>
                      </th>
                      <th className="w-[20%] border border-primary font-normal p-1">
                        {isDone ? (
                          <Status type="DONE" />
                        ) : (
                          <Status type="NOT DONE" />
                        )}
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </HomeCard>
      </div>
      {isActive && (
        <div className="w-full h-[calc(100vh-80px)] fixed top-0 left-0 bg-background flex mt-20 p-4">
          <Image
            src={"/peta-konsep.png"}
            alt="peta-konsep"
            width={4000}
            height={4000}
            className="w-full object-contain"
          />
          <X
            className="absolute top-6 right-6 cursor-pointer text-primary"
            size={32}
            onClick={() => setIsActive(!isActive)}
          />
        </div>
      )}
    </>
  );
};

export default function Home() {
  const userState = useAppSelector((state) => state.user);
  const commonState = useAppSelector((state) => state.common);

  const [materials, setMaterials] = useState([]);
  const [activities, setActivities] = useState([]);
  const [tests, setTests] = useState([]);

  useInitialize(async () => {
    const accessToken = window.localStorage.getItem("access-token");

    try {
      const materialsRequest = await axiosIns.get("/materials", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setMaterials(materialsRequest.data.data);
    } catch {}

    try {
      const activitiesRequest = await axiosIns.get("/activities", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setActivities(activitiesRequest.data.data);
    } catch {}

    try {
      const testsRequest = await axiosIns.get("/tests", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setTests(testsRequest.data.data);
    } catch {}
  });

  if (commonState.isLoading || !userState.isLogin) {
    return <Loading />;
  }

  return (
    <div className="w-full flex flex-col justify-center items-center overflow-hidden">
      <Header />
      <Hero fullName={userState.fullName} />
      <Preface
        testsData={tests}
        materialsData={materials}
        activityData={activities}
        userData={userState}
      />
    </div>
  );
}
