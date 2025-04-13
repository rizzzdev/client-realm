"use client";

import Image from "next/image";
import Body from "~/components/layouts/admin/Body";
import HeaderPage from "~/components/layouts/admin/HeaderPage";
import Loading from "~/components/layouts/Loading";
import useInitialize from "~/hooks/useInitialize";
import axiosIns from "~/libs/axiosIns";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { UserState } from "~/redux/slices/userSlice";
import { setUsers } from "~/redux/slices/usersSlice";
import { ApiResponse } from "~/types/apiResponse";

interface AdminsListTableProps {
  adminsState: UserState[];
}

const AdminsListTable = (props: AdminsListTableProps) => {
  return (
    <div className="w-full">
      <table className="w-full">
        <thead className="w-full border-y border-y-white bg-primary">
          <tr className="w-full text-white text-sm   hover:bg-white  hover:text-primary">
            <td className="px-1 py-8 font-bold  text-center w-[5%]">No.</td>
            <td className="px-1 py-8 font-bold  text-center w-[20%]">
              Username
            </td>
            <td className="px-1 py-8 font-bold  text-center w-[25%]">
              Nama Lengkap
            </td>
            <td className="px-1 py-8 font-bold  text-center w-[15%]">
              Jenis Kelamin
            </td>
            <td className="px-1 py-8 font-bold  text-center w-[15%]">
              Gambar Avatar
            </td>
            <td className="px-1 py-8 font-bold  text-center w-[20%]">
              Terdaftar Pada
            </td>
          </tr>
        </thead>
        <tbody className="w-full">
          {props.adminsState
            ?.filter((admin) => !admin.deletedAt)
            ?.filter((admin) => admin.role === "ADMIN")
            ?.map((admin, index) => {
              return (
                <tr
                  className="w-full text-white text-sm   hover:bg-white  hover:text-primary"
                  key={admin.id + index}
                >
                  <td className="p-1 border-y border-y-white text-center w-[5%]">
                    {index + 1}
                  </td>
                  <td className="p-1 border-y border-y-white text-center w-[20%]">
                    {admin.username}
                  </td>
                  <td className="p-1 border-y border-y-white text-center w-25%]">
                    {admin.fullName}
                  </td>
                  <td className="p-1 border-y border-y-white text-center w-[15%]">
                    {admin.gender === "MALE" ? "Laki-laki" : "Perempuan"}
                  </td>
                  <td className="p-1 border-y border-y-white text-center w-[15%]">
                    <Image
                      src={admin.avatarUrl}
                      alt="avatar"
                      width={100}
                      height={100}
                      className="w-full object-fill aspect-square"
                    />
                  </td>
                  <td className="p-1 border-y border-y-white text-center w-[20%]">
                    {admin
                      .signedUpAt!.toString()
                      .slice(0, 16)
                      .split("T")
                      .reverse()
                      .join(" ")}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

const Admins = () => {
  const { isLoading } = useAppSelector((state) => state.common);
  const usersState = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  useInitialize(async () => {
    const usersRequest = await axiosIns.get<ApiResponse<UserState[]>>(
      "/users",
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(
            "access-token"
          )}`,
        },
      }
    );
    usersRequest.data.data.forEach((user: UserState) => {
      dispatch(setUsers(user));
    });
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Body>
      <HeaderPage title="Daftar Para Admin">
        Menu ini digunakan untuk melihat daftar admin yang terdaftar
        pada media pembelajaran ini.
      </HeaderPage>
      <AdminsListTable adminsState={usersState} />
    </Body>
  );
};

export default Admins;
