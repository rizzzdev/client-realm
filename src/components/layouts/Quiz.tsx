import { ReactNode } from "react";
import LearnPage from "./LearnPage";
import {
  QuestionState,
  setQuestionByIndex,
} from "~/redux/slices/questionSlice";
import { useAppDispatch } from "~/redux/hooks";
import Button from "../elements/Button";
import Image from "next/image";

const Question = ({
  children,
  imageUrl,
  text,
}: {
  children: ReactNode;
  imageUrl?: string;
  text: string;
}) => {
  return (
    <div className="w-full flex flex-col gap-2 justify-center items-center mb-4 border-2 border-white rounded-md p-2">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Einstein"
          width={400}
          height={400}
          className="w-full object-cover rounded-md mb-2"
          priority
        />
      )}
      <p className="w-full font-bold mb-2">{text}</p>
      <div className="w-full flex flex-col gap-1 justify-center items-center">
        {children}
      </div>
    </div>
  );
};

const Answer = ({
  value,
  questionsState,
  index,
  answerOption,
  onClick,
}: {
  value: string;
  questionsState: QuestionState[];
  index: number;
  answerOption: "optionA" | "optionB" | "optionC" | "optionD" | "optionE";
  onClick?: () => void;
}) => {
  return (
    <button
      className={`w-full p-2 border-2 ${
        questionsState[index].activeOption === answerOption
          ? "border-secondary"
          : "border-white"
      } rounded-md`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

const Quiz = ({
  questionsState,
  onSubmitQuiz,
}: {
  questionsState: QuestionState[];
  onSubmitQuiz: () => void;
}) => {
  const dispatch = useAppDispatch();

  return (
    <LearnPage.Quiz>
      <div className="w-full flex flex-col gap-2 justify-center items-center ">
        {questionsState?.map((question, index) => {
          return (
            <Question
              key={question.id}
              text={question.question}
              imageUrl={question.imageUrl}
            >
              <Answer
                answerOption="optionA"
                index={index}
                questionsState={questionsState}
                value={question.optionA}
                onClick={() =>
                  dispatch(
                    setQuestionByIndex({
                      index,
                      questionState: {
                        ...questionsState[index],
                        activeOption: "optionA",
                      },
                    })
                  )
                }
              />
              <Answer
                answerOption="optionB"
                index={index}
                questionsState={questionsState}
                value={question.optionB}
                onClick={() =>
                  dispatch(
                    setQuestionByIndex({
                      index,
                      questionState: {
                        ...questionsState[index],
                        activeOption: "optionB",
                      },
                    })
                  )
                }
              />
              <Answer
                answerOption="optionC"
                index={index}
                questionsState={questionsState}
                value={question.optionC}
                onClick={() =>
                  dispatch(
                    setQuestionByIndex({
                      index,
                      questionState: {
                        ...questionsState[index],
                        activeOption: "optionC",
                      },
                    })
                  )
                }
              />
              {question.optionD && (
                <Answer
                  answerOption="optionD"
                  index={index}
                  questionsState={questionsState}
                  value={question.optionD}
                  onClick={() =>
                    dispatch(
                      setQuestionByIndex({
                        index,
                        questionState: {
                          ...questionsState[index],
                          activeOption: "optionD",
                        },
                      })
                    )
                  }
                />
              )}
              {question.optionE && (
                <Answer
                  answerOption="optionE"
                  index={index}
                  questionsState={questionsState}
                  value={question.optionE}
                  onClick={() =>
                    dispatch(
                      setQuestionByIndex({
                        index,
                        questionState: {
                          ...questionsState[index],
                          activeOption: "optionE",
                        },
                      })
                    )
                  }
                />
              )}
            </Question>
          );
        })}
        <Button
          text="Kirim Jawaban"
          className="w-full mt-10"
          onClick={onSubmitQuiz}
        />
      </div>
    </LearnPage.Quiz>
  );
};

export default Quiz;
