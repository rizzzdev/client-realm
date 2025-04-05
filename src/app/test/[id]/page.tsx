"use client";

import { jwtDecode } from "jwt-decode";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Header from "~/components/layouts/Header";
import Loading from "~/components/layouts/Loading";
import TransitPage from "~/components/layouts/TransitPage";
import useInitialize from "~/hooks/useInitialize";
import axiosIns from "~/libs/axiosIns";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { setLoading } from "~/redux/slices/commonSlice";
import { resetTests, setTests, TestState } from "~/redux/slices/testSlice";
import {
  QuestionState,
  resetQuestions,
  setQuestions,
} from "~/redux/slices/questionSlice";
import { ApiResponse } from "~/types/apiResponse";
import Test from "~/components/layouts/Test";

const TestPage = () => {
  const param = useParams<{ id: string }>();
  const id = param.id;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const commonState = useAppSelector((state) => state.common);
  const userState = useAppSelector((state) => state.user);
  const testsState = useAppSelector((state) => state.tests);
  const questionsState = useAppSelector((state) => state.questions);

  const test = testsState?.find((test) => test.id === id);

  const [isPrevDoneState, setIsPrevDoneState] = useState(false);
  const [isExist, setIsExist] = useState(true);

  useInitialize(async () => {
    const testsRequest = await axiosIns.get<ApiResponse<TestState[]>>(
      "/tests",
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(
            "access-token"
          )}`,
        },
      }
    );

    testsRequest.data.data.forEach((test) => {
      dispatch(setTests(test));
    });

    const test = testsRequest.data.data.find((test) => test.id === id);

    if (!test) {
      setIsExist(false);
      return;
    }

    const indexTest = testsRequest.data.data.indexOf(test!);
    const prevTest = testsRequest.data.data[indexTest - 1];
    const isPrevDone =
      indexTest === 0 ||
      prevTest?.activity?.find(
        (activity) =>
          activity.testId === prevTest.id && activity.userId === userState.id
      );

    if (isPrevDone) {
      setIsPrevDoneState(true);
    }

    if (test.questions) {
      const questionLists: QuestionState[] = test.questions?.map((question) => {
        return {
          id: question.id!,
          question: question.question!,
          imageUrl: question.imageUrl,
          optionA: question.optionA!,
          optionB: question.optionB!,
          optionC: question.optionC!,
          optionD: question.optionD,
          optionE: question.optionE,
          correctOption: question.correctOption!,
        };
      });
      dispatch(setQuestions(questionLists));
      console.log(questionLists);
      return;
    }

    dispatch(resetTests());
    dispatch(resetQuestions());
  });

  const onSubmitTest = async () => {
    const accessToken = window.localStorage.getItem("access-token") ?? "";
    try {
      const { exp } = jwtDecode(accessToken);
      if (exp! * 1000 < Date.now()) {
        const result = await axiosIns.get<{ data: { accessToken: string } }>(
          "/new-access-token"
        );
        window.localStorage.setItem(
          "access-token",
          result.data.data.accessToken
        );
      }
    } catch {
      window.localStorage.setItem("access-token", "");
      router.push("/signin");
      dispatch(setLoading(false));
      return;
    }

    const isReadyToSubmit = questionsState.every(
      (question) => question.activeOption
    );
    if (!isReadyToSubmit) {
      alert("Soal belum terjawab semua!");
      return;
    }

    const scorePerItem = 100 / questionsState.length;
    let mark = 0;
    questionsState.forEach((question) => {
      if (question.activeOption === question.correctOption) {
        mark += scorePerItem;
      }
    });

    await axiosIns.post(
      "/marks",
      {
        userId: userState.id,
        testId: test!.id!,
        mark: mark,
      },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(
            "access-token"
          )}`,
        },
      }
    );

    await axiosIns.post(
      "/activities",
      {
        activityType: "TEST",
        testId: test?.id,
        userId: userState.id,
        message: `Menyelesaikan ${test?.title}`,
      },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(
            "access-token"
          )}`,
        },
      }
    );

    alert(`Nilai Anda ${mark}`);
  };

  if (commonState.isLoading || !userState.isLogin) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Header />
      {!isExist && (
        <TransitPage>
          Halaman yang Anda tuju tidak tersedia! Silahkan kembali ke halaman
          Beranda!
        </TransitPage>
      )}
      {!isPrevDoneState && userState.role !== "ADMIN" && (
        <TransitPage>
          Selesaikan terlebih dahulu materi sebelumnya sebelum mangakses materi
          ini!
        </TransitPage>
      )}
      <Test
        questionsState={questionsState}
        onSubmitTest={onSubmitTest}
        title={test!.title!}
      />
      {/* {isPrevDoneState ||
        (userState.role === "ADMIN" && (
          // <LearnPage>
          // </LearnPage>
        ))} */}
    </div>
  );
};

export default TestPage;
