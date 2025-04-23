"use client";

import Image from "next/image";
import Link from "next/link";
import Body from "~/components/layouts/admin/Body";
import HeaderPage from "~/components/layouts/admin/HeaderPage";
import useInitialize from "~/hooks/useInitialize";
import axiosIns from "~/libs/axiosIns";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { Material, setMaterials } from "~/redux/slices/materialsSlice";
import { ApiResponse } from "~/types/apiResponse";

interface MaterialListsTableProps {
  materialsState: Material[];
}

const MaterialListsTable = (props: MaterialListsTableProps) => {
  return (
    <div className="w-full">
      <table className="w-full">
        <thead className="w-full border-y border-y-white bg-primary">
          <tr className="w-full text-white text-sm   hover:bg-white  hover:text-primary">
            <td className="px-1 py-8 font-bold  text-center w-[5%]">No.</td>
            <td className="px-1 py-8 font-bold  text-center w-[25%]">
              Judul Materi
            </td>
            <td className="px-1 py-8 font-bold  text-center w-[40%]">
              Deskripsi Materi
            </td>
            <td className="px-1 py-8 font-bold  text-center w-[20%]">
              Gambar Thumbnail
            </td>
            <td className="px-1 py-8 font-bold  text-center w-[10%]">Tautan</td>
          </tr>
        </thead>
        <tbody className="w-full">
          {props.materialsState?.map((material, index) => {
            return (
              <tr
                className="w-full text-white text-sm   hover:bg-white  hover:text-primary"
                key={material.id}
              >
                <td className="p-1 border-y border-y-white text-center w-[5%]">
                  {index + 1}
                </td>
                <td className="p-1 border-y border-y-white text-center w-[25%]">
                  {material.title}
                </td>
                <td className="p-1 border-y border-y-white text-center w-[40%]">
                  {material.description}
                </td>
                <td className="p-1 border-y border-y-white text-center w-[20%]">
                  <Image
                    src={material.imageUrl}
                    alt="material-thumbnail"
                    width={1280}
                    height={720}
                    className="w-full aspect-video"
                  />
                </td>
                <td className="p-1 border-y border-y-white text-center w-[10%]">
                  <Link href={`/learn/${material.id}`}>Klik Disini</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const Materials = () => {
  const materialsState = useAppSelector((state) => state.materials);
  const dispatch = useAppDispatch();

  useInitialize(async () => {
    try {
      const accessToken = window.localStorage.getItem("access-token");

      const materialsRequest = await axiosIns.get<ApiResponse<Material[]>>(
        "/materials",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      materialsRequest.data.data.forEach((material: Material) => {
        dispatch(
          setMaterials({
            ...material,
          })
        );
      });
    } catch {}
  });
  return (
    <Body>
      <HeaderPage title="Daftar Materi">
        Menu ini digunakan untuk melihat daftar materi yang tersedia pada media
        pembelajaran ini.
      </HeaderPage>
      <MaterialListsTable materialsState={materialsState.materialLists} />
    </Body>
  );
};

export default Materials;
