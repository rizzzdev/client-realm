"use client";

import Header from "~/components/layouts/Header";
import Leaderboard from "~/components/layouts/Leaderboard";
import Loading from "~/components/layouts/Loading";
import useInitialize from "~/hooks/useInitialize";
import axiosIns from "~/libs/axiosIns";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { setLeaderboard } from "~/redux/slices/leaderboardSlice";
import { ApiResponse } from "~/types/apiResponse";
import { Leaderboard as LeaderboardType } from "~/types/leaderboard";

const LeaderBoardPage = () => {
  const commonState = useAppSelector((state) => state.common);
  const leaderboardState = useAppSelector((state) => state.leaderboard);
  const dispatch = useAppDispatch();

  useInitialize(async () => {
    const leaderboard = await axiosIns.get<ApiResponse<LeaderboardType[]>>(
      "/leaderboard",
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(
            "access-token"
          )}`,
        },
      }
    );
    dispatch(setLeaderboard(leaderboard.data.data));
  });

  if (commonState.isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full flex flex-col justify-center items-center overflow-hidden no-scrollbar">
      <Header />
      <Leaderboard leaderboardList={leaderboardState} />
    </div>
  );
};

export default LeaderBoardPage;
