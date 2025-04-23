"use client";

import { useState } from "react";
import Button from "~/components/elements/Button";
import Body from "~/components/layouts/admin/Body";
import HeaderPage from "~/components/layouts/admin/HeaderPage";
import useInitialize from "~/hooks/useInitialize";
import axiosIns from "~/libs/axiosIns";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { Mark, setMark } from "~/redux/slices/markSlice";
import { Material, setMaterials } from "~/redux/slices/materialsSlice";
import { setTests, TestState } from "~/redux/slices/testSlice";
import { UserState } from "~/redux/slices/userSlice";
import { setUsers } from "~/redux/slices/usersSlice";
import { ApiResponse } from "~/types/apiResponse";

interface MarkListsTableProps {
  marksState: Mark[];
  usersState: UserState[];
  materialsState: Material[];
  testsState: TestState[];
  filter: "test" | "quiz";
}
const MarkListsTable = (props: MarkListsTableProps) => {
  return (
    <div className="w-full">
      <table className="w-full">
        <thead className="w-full border-y border-y-white bg-primary">
          <tr className="w-full text-white text-sm   hover:bg-white  hover:text-primary">
            <td className="px-1 py-8 font-bold  text-center w-[10%]">No.</td>
            <td className="px-1 py-8 font-bold  text-center w-[30%]">Nama</td>
            {props.filter === "quiz" && (
              <td className="px-1 py-8 font-bold  text-center w-[40%]">
                Nama Kuis
              </td>
            )}
            {props.filter === "test" && (
              <td className="px-1 py-8 font-bold  text-center w-[40%]">
                Nama Test
              </td>
            )}
            <td className="px-1 py-8 font-bold  text-center w-[20%]">Nilai</td>
          </tr>
        </thead>
        <tbody className="w-full">
          {props.marksState?.map((mark, index) => {
            const user = props.usersState?.find(
              (user) => user.id === mark.userId
            );
            const material = props.materialsState?.find(
              (material) => material.quiz.id === mark.quizId
            );
            const test = props.testsState?.find(
              (test) => test.id === mark.testId
            );

            return (
              <tr
                className="w-full text-white text-sm   hover:bg-white  hover:text-primary"
                key={mark.id}
              >
                <td className="p-1 border-y border-y-white text-center w-[10%]">
                  {index + 1}
                </td>
                <td className="p-1 border-y border-y-white text-center w-[30%]">
                  {user?.fullName}
                </td>
                {props.filter === "quiz" && (
                  <td className="p-1 border-y border-y-white text-center w-[40%]">
                    {material?.title}
                  </td>
                )}
                {props.filter === "test" && (
                  <td className="p-1 border-y border-y-white text-center w-[40%]">
                    {test?.title}
                  </td>
                )}
                <td className="p-1 border-y border-y-white text-center w-[20%]">
                  {mark.mark}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const Marks = () => {
  const marksState = useAppSelector((state) => state.mark);
  const materialsState = useAppSelector((state) => state.materials);
  const testsState = useAppSelector((state) => state.tests);
  const usersState = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<{
    type: "quiz" | "test";
    id: string;
  }>({
    type: "quiz",
    id: "",
  });

  useInitialize(async () => {
    const accessToken = window.localStorage.getItem("access-token");

    const materialsRequest = await axiosIns.get<ApiResponse<Material[]>>(
      "/materials",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const testsRequest = await axiosIns.get<ApiResponse<TestState[]>>(
      "/tests",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const marksRequest = await axiosIns.get<ApiResponse<Mark[]>>("/marks", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const usersRequest = await axiosIns.get<ApiResponse<UserState[]>>(
      "/users",
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

    marksRequest.data.data.forEach((mark) => {
      dispatch(setMark(mark));
    });

    usersRequest.data.data.forEach((user: UserState) => {
      dispatch(
        setUsers({
          ...user,
        })
      );
    });

    testsRequest.data.data.forEach((test) => {
      dispatch(setTests(test));
    });

    setFilter({
      type: "quiz",
      id: materialsRequest.data.data[0].quiz.id!,
    });
  });

  const filteredMarksState = marksState?.filter((mark) => {
    if (filter.type === "quiz") {
      return mark.quizId === filter.id;
    }
    return mark.testId === filter.id;
  });

  // const handleFilter =
  return (
    <Body>
      <HeaderPage title="Daftar Nilai">
        Menu ini digunakan untuk melihat nilai yang diperoleh peserta didik
        dalam menyelesaikan kuis dan tes pada media pembelajaran ini.
      </HeaderPage>
      <div className="w-full flex flex-col justify-start items-center">
        <h3 className="w-full text-xl font-bold">Filter</h3>
        <p className="w-full text-sm">
          Gunakan filter di bawah ini untuk menampilkan nilai berdasarkan kuis
          atau tes.
        </p>
      </div>
      <div className="w-1/3 flex gap-2 self-start">
        <Button
          className="w-1/2 bg-white text-primary h-fit p-2 mb-0"
          text="Kuis"
          onClick={() =>
            setFilter({
              type: "quiz",
              id: materialsState.materialLists[0].quiz.id!,
            })
          }
        />
        <Button
          className="w-1/2 bg-white text-primary h-fit p-2 mb-0"
          text="Tes"
          onClick={() => setFilter({ type: "test", id: testsState[0].id! })}
        />
      </div>
      <div className="w-fit flex flex-wrap gap-1 self-start mb-10">
        {filter.type === "quiz" &&
          materialsState.materialLists?.map((material) => {
            return (
              <Button
                key={material.id}
                className="w-fit bg-white text-primary h-fit p-1 mb-0 mt-0 text-xs font-bold"
                text={material.title}
                onClick={() =>
                  setFilter({ type: "quiz", id: material.quiz.id! })
                }
              />
            );
          })}
        {filter.type === "test" &&
          testsState?.map((test) => {
            return (
              <Button
                key={test.id}
                className="w-fit bg-white text-primary h-fit p-1 mb-0 mt-0 text-xs font-bold"
                text={test.title}
                onClick={() => setFilter({ type: "test", id: test.id! })}
              />
            );
          })}
      </div>
      <MarkListsTable
        marksState={filteredMarksState}
        usersState={usersState}
        filter={filter.type}
        materialsState={materialsState.materialLists}
        testsState={testsState}
      />
    </Body>
  );
};

export default Marks;
