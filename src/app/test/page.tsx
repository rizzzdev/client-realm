"use client";

import Header from "~/components/layouts/Header";
import Loading from "~/components/layouts/Loading";
import TestCard from "~/components/layouts/TestCard";
import useInitialize from "~/hooks/useInitialize";
import axiosIns from "~/libs/axiosIns";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { setTests, TestState } from "~/redux/slices/testSlice";
import { ApiResponse } from "~/types/apiResponse";

const TestPage = () => {
  const { isLoading } = useAppSelector((state) => state.common);
  const testsState = useAppSelector((state) => state.tests);
  const dispatch = useAppDispatch();

  useInitialize(async () => {
    const accessToken = window.localStorage.getItem("access-token");

    const testsRequest = await axiosIns.get<ApiResponse<TestState[]>>(
      "/tests",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    testsRequest.data.data.forEach((test) => {
      dispatch(setTests(test));
    });
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full min-h-screen grid grid-cols-1 items-stretch md:grid-cols-3 gap-2 bg-primary pt-24 px-4 pb-4">
      <Header />
      {testsState?.map((test) => {
        return (
          <TestCard
            key={test.id!}
            imageUrl={test.imageUrl}
            testId={test.id!}
            title={test.title}
            isUnlocked={true}
            description={test.description}
          />
        );
      })}
    </div>
  );
};

export default TestPage;
