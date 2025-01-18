"use client";

import Header from "~/components/layouts/Header";
import LearningCard from "~/components/layouts/LearningCard";
import Loading from "~/components/layouts/Loading";
import useInitialize from "~/hooks/useInitialize";
import axiosIns from "~/libs/axiosIns";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { setMaterials } from "~/redux/slices/materialsSlice";

interface apiResponse<T> {
  success: boolean;
  status: number;
  message: string;
  data: T;
}
interface MaterialData {
  id: string;
  title: string;
  description: string;
  materialString: string;
  imageUrl: string;
  quizId: string;
  createdAt: Date;
  deletedAt: Date | null | undefined;
}

const Learn = () => {
  const userState = useAppSelector((state) => state.user);
  const commonState = useAppSelector((state) => state.common);
  const materialsState = useAppSelector((state) => state.materials);
  const dispatch = useAppDispatch();

  useInitialize(async () => {
    const accessToken = window.localStorage.getItem("access-token");

    const materialsResponse = await axiosIns.get<apiResponse<MaterialData[]>>(
      "/materials",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const materialData = materialsResponse.data.data;

    materialData.forEach((material: MaterialData) => {
      dispatch(
        setMaterials({
          id: material.id,
          title: material.title,
          description: material.description,
          imageUrl: material.imageUrl,
          materialString: material.materialString,
          quizId: material.quizId,
        })
      );
    });
  });

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
      <div className="w-full h-[calc(100vh-80px)] p-2 flex justify-center items-center gap-2">
        <div className="w-full h-full overflow-y-scroll no-scrollbar">
          <div className="w-full min-h-full  grid grid-col-2 md:grid-cols-4 p-2 gap-2 bg-primary rounded-md">
            {materialsState.materialLists.map((material) => {
              return (
                <LearningCard
                  key={material.id}
                  title={material.title}
                  description={material.description}
                  imageUrl={material.imageUrl}
                  materialId={material.id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
