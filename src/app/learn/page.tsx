"use client";

import Header from "~/components/layouts/Header";
import LearningCard from "~/components/layouts/LearningCard";
import Loading from "~/components/layouts/Loading";
import useInitialize from "~/hooks/useInitialize";
import axiosIns from "~/libs/axiosIns";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { Material, setMaterials } from "~/redux/slices/materialsSlice";

interface apiResponse<T> {
  success: boolean;
  status: number;
  message: string;
  data: T;
}

const Learn = () => {
  const userState = useAppSelector((state) => state.user);
  const commonState = useAppSelector((state) => state.common);
  const materialsState = useAppSelector((state) => state.materials);
  const dispatch = useAppDispatch();

  useInitialize(async () => {
    const accessToken = window.localStorage.getItem("access-token");

    const materialsResponse = await axiosIns.get<apiResponse<Material[]>>(
      "/materials",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const materialData = materialsResponse.data.data;
    // console.log(materialData);

    materialData.forEach((material: Material) => {
      dispatch(
        setMaterials({
          id: material.id,
          title: material.title,
          description: material.description,
          imageUrl: material.imageUrl,
          materialString: material.materialString,
          quiz: material.quiz,
          activity: material.activity,
        })
      );
    });
  });

  if (commonState.isLoading || !userState.isLogin) {
    return <Loading />;
  }

  return (
    <div className="w-full min-h-screen grid grid-cols-1 items-stretch md:grid-cols-4 gap-2 bg-primary pt-24 px-4 pb-4">
      <Header />
      {materialsState.materialLists.map((material, index) => {
        const prevMaterial = materialsState.materialLists[index - 1];
        // console.log(prevMaterial?.activity);
        const isPrevDone = prevMaterial?.activity.find(
          (activity) =>
            activity.materialId === prevMaterial.id &&
            activity.userId === userState.id
        );

        if (index > 0 && !isPrevDone && userState.role !== "ADMIN") {
          return (
            <LearningCard
              key={material.id}
              title={material.title}
              description={material.description.slice(0, 100) + "..."}
              imageUrl={material.imageUrl}
              materialId={material.id}
              isUnlocked={false}
            />
          );
        }
        return (
          <LearningCard
            key={material.id}
            title={material.title}
            description={material.description.slice(0, 100) + "..."}
            imageUrl={material.imageUrl}
            materialId={material.id}
            isUnlocked={true}
          />
        );
      })}
      {/* <div className="w-full min-h-full  grid grid-col-2 md:grid-cols-4 p-2 gap-2 rounded-md mtcd-18">
      </div> */}
      {/* <div className="w-full h-screen pt-18 p-2 flex justify-center items-center gap-2">
        <div className="w-full h-full overflow-y-scroll no-scrollbar">
        </div>
      </div> */}
    </div>
  );
};

export default Learn;
