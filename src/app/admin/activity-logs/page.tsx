"use client";

import Body from "~/components/layouts/admin/Body";
import HeaderPage from "~/components/layouts/admin/HeaderPage";
import useInitialize from "~/hooks/useInitialize";
import axiosIns from "~/libs/axiosIns";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { Activity, setActivities } from "~/redux/slices/activitySlice";
import { ApiResponse } from "~/types/apiResponse";

interface ActivityLogsTableProps {
  activitiesState: Activity[];
}

const ActivityLogsTable = (props: ActivityLogsTableProps) => {
  return (
    <div className="w-full">
      <table className="w-full">
        <thead className="w-full border-y border-y-white bg-primary">
          <tr className="w-full text-white text-sm   hover:bg-white  hover:text-primary">
            <td className="px-1 py-8 font-bold  text-center w-[5%]">No.</td>
            <td className="px-1 py-8 font-bold  text-center w-[40%]">Nama</td>
            <td className="px-1 py-8 font-bold  text-center w-[20%]">
              Jenis Aktivitas
            </td>
            <td className="px-1 py-8 font-bold  text-center w-[35%]">
              Keterangan
            </td>
          </tr>
        </thead>
        <tbody className="w-full">
          {props.activitiesState?.map((activity, index) => {
            return (
              <tr
                className="w-full text-white text-sm   hover:bg-white  hover:text-primary"
                key={activity.id}
              >
                <td className="p-1 border-y border-y-white text-center w-[5%]">
                  {index + 1}
                </td>
                <td className="p-1 border-y border-y-white text-center w-[20%]">
                  {activity.userFullname}
                </td>
                <td className="p-1 border-y border-y-white text-center w-[20%]">
                  {activity.activityType}
                </td>
                <td className="p-1 border-y border-y-white text-center w-[35%]">
                  {activity.message}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const ActivityLogs = () => {
  const activitiesState = useAppSelector((state) => state.activity);
  const dispatch = useAppDispatch();

  useInitialize(async () => {
    try {
      const accessToken = window.localStorage.getItem("access-token");

      const activitiesRequest = await axiosIns.get<ApiResponse<Activity[]>>(
        "/activities?withDetails=true",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      activitiesRequest.data.data.forEach((activity: Activity) => {
        dispatch(
          setActivities({
            ...activity,
          })
        );
      });
    } catch {}
  });

  return (
    <Body>
      <HeaderPage title="Log Aktivitas">
        Menu ini digunakan untuk melihat aktivitas yang dilakukan oleh peserta
        didik pada media pembelajaran ini.
      </HeaderPage>
      <ActivityLogsTable activitiesState={activitiesState} />
    </Body>
  );
};

export default ActivityLogs;
