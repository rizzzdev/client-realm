"use client";

import { jwtDecode } from "jwt-decode";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "~/components/layouts/Header";
import LearnPage from "~/components/layouts/LearnPage";
import Loading from "~/components/layouts/Loading";
import Material from "~/components/layouts/Material";
import Quiz from "~/components/layouts/Quiz";
import TransitPage from "~/components/layouts/TransitPage";
import useInitialize from "~/hooks/useInitialize";
import axiosIns from "~/libs/axiosIns";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { setLoading } from "~/redux/slices/commonSlice";
import {
  Material as MaterialType,
  resetMaterials,
  setCurrentMaterial,
} from "~/redux/slices/materialsSlice";
import {
  QuestionState,
  resetQuestions,
  setQuestions,
} from "~/redux/slices/questionSlice";
import { Quiz as QuizType } from "~/redux/slices/quizSlice";
import { ApiResponse } from "~/types/apiResponse";

const Learn = () => {
  const param = useParams<{ id: string }>();
  // const queryParams = Boolean(useSearchParams().get("quiz"));
  const id = param.id;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const commonState = useAppSelector((state) => state.common);
  const userState = useAppSelector((state) => state.user);
  const materialState = useAppSelector((state) => state.materials);
  const questionsState = useAppSelector((state) => state.questions);

  const [isPrevDoneState, setIsPrevDoneState] = useState(false);
  const [isExist, setIsExist] = useState(true);
  const [quizElement, setQuizElement] = useState<HTMLElement | null>(null);

  useInitialize(async () => {
    const materials = await axiosIns.get<ApiResponse<MaterialType[]>>(
      "/materials/",
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(
            "access-token"
          )}`,
        },
      }
    );

    const material = materials.data.data.find((material) => material.id === id);

    if (!material) {
      setIsExist(false);
      return;
    }

    const indexMaterial = materials.data.data.indexOf(material!);
    const prevMaterial = materials.data.data[indexMaterial - 1];
    const isPrevDone =
      indexMaterial === 0 ||
      prevMaterial?.activity.find(
        (activity) =>
          activity.materialId === prevMaterial.id &&
          activity.userId === userState.id
      );

    if (isPrevDone) {
      setIsPrevDoneState(true);
    }

    dispatch(
      setCurrentMaterial({
        quiz: material!.quiz,
        id: material!.id,
        title: material!.title,
        description: material!.description,
        imageUrl: material!.imageUrl,
        materialString: material!.materialString,
        activity: material!.activity,
      })
    );

    const quiz = await axiosIns.get<ApiResponse<QuizType>>(
      `/quizzes/${material!.quiz.id}`,
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(
            "access-token"
          )}`,
        },
      }
    );

    // if (queryParams) {
    //   const quizElementPosition = quizElement?.scrollHeight;
    //   window.scrollTo({ top: quizElementPosition!, behavior: "smooth" });
    // }

    if (quiz.data.data?.questions) {
      const questionLists: QuestionState[] = quiz.data.data.questions.map(
        (question) => {
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
        }
      );
      dispatch(setQuestions(questionLists));

      return;
    }

    dispatch(resetMaterials());
    dispatch(resetQuestions());
  });

  useEffect(() => {
    if (!quizElement) {
      setQuizElement(document.getElementById("quiz"));
    }

    console.log(quizElement);
  }, [quizElement]);

  const onSubmitQuiz = async () => {
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
        quizId: materialState.currentMaterial.quiz.id,
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
        activityType: "QUIZ",
        quizId: materialState.currentMaterial.quiz.id,
        userId: userState.id,
        message: `Menyelesaikan quiz pada materi "${materialState.currentMaterial.title}"`,
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
      {(isPrevDoneState || userState.role === "ADMIN") && (
        <LearnPage>
          <Material
            title={materialState.currentMaterial.title}
            strElement={materialState.currentMaterial.materialString}
          />
          {questionsState[0] && (
            <>
              <Quiz
                questionsState={questionsState}
                onSubmitQuiz={onSubmitQuiz}
              />
            </>
          )}
        </LearnPage>
      )}
    </div>
  );
};

export default Learn;
