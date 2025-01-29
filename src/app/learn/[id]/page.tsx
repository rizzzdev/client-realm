"use client";

import { useParams } from "next/navigation";
import Header from "~/components/layouts/Header";
import LearnPage from "~/components/layouts/LearnPage";
import Loading from "~/components/layouts/Loading";
import Material from "~/components/layouts/Material";
import Quiz from "~/components/layouts/Quiz";
import useInitialize from "~/hooks/useInitialize";
import axiosIns from "~/libs/axiosIns";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import {
  resetMaterials,
  setCurrentMaterial,
} from "~/redux/slices/materialsSlice";
import {
  QuestionState,
  resetQuestions,
  setQuestions,
} from "~/redux/slices/questionSlice";
import { Activity as ActivityType } from "~/types/activity";
import { ApiResponse } from "~/types/apiResponse";
import { Material as MaterialType } from "~/types/material";
import { Question as QuestionType } from "~/types/question";
import { Quiz as QuizType } from "~/types/quiz";

const Learn = () => {
  const param = useParams<{ id: string }>();
  const id = param.id;
  const dispatch = useAppDispatch();

  const commonState = useAppSelector((state) => state.common);
  const userState = useAppSelector((state) => state.user);
  const materialState = useAppSelector((state) => state.materials);
  const questionsState = useAppSelector((state) => state.questions);

  useInitialize(async () => {
    try {
      const material = await axiosIns.get<
        ApiResponse<MaterialType<ActivityType, QuizType<QuestionType, null>>>
      >("/materials/" + id, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(
            "access-token"
          )}`,
        },
      });
      dispatch(
        setCurrentMaterial({
          quizId: material.data.data.quiz!.id!,
          id: material.data.data.id,
          title: material.data.data.title,
          description: material.data.data.description,
          imageUrl: material.data.data.imageUrl,
          materialString: material.data.data.materialString,
        })
      );

      const quiz = await axiosIns.get<ApiResponse<QuizType<QuestionType, []>>>(
        `/quizzes/${material.data.data.quiz.id}`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "access-token"
            )}`,
          },
        }
      );

      const questionLists: QuestionState[] = quiz.data.data.questions!.map(
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
    } catch {
      dispatch(resetMaterials());
      dispatch(resetQuestions());
    }
  });

  const onSubmitQuiz = async () => {
    const isReadyToSubmit = questionsState.every(
      (question) => question.activeOption
    );
    if (!isReadyToSubmit) {
      alert("Soal blum terjawab semua");
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
        quizId: materialState.currentMaterial.quizId,
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
    alert(`Nilai Anda ${mark}`);
  };

  if (commonState.isLoading || !userState.isLogin) {
    return <Loading />;
  }

  if (!materialState.currentMaterial.id) {
    return <p>404 NOT FOUND</p>;
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Header
        avatarUrl={userState.avatarUrl}
        fullName={userState.fullName}
        username={userState.username}
      />
      <LearnPage>
        <Material
          title={materialState.currentMaterial.title}
          strElement={materialState.currentMaterial.materialString}
        />
        {questionsState[0] && (
          <Quiz questionsState={questionsState} onSubmitQuiz={onSubmitQuiz} />
        )}
      </LearnPage>
    </div>
  );
};

export default Learn;
