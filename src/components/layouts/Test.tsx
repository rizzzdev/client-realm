import { ReactNode } from "react";
import LearnPage from "./LearnPage";
import {
  QuestionState,
  setQuestionByIndex,
} from "~/redux/slices/questionSlice";
import { useAppDispatch } from "~/redux/hooks";
import Button from "../elements/Button";
import Image from "next/image";

const equationElementParser = (stringElement: string, id: string) => {
  const elementSplit = stringElement
    ?.split(/<\/?equation>/)
    ?.filter((el) => el.trim() !== "");
  console.log(elementSplit);
  const allElementMap = elementSplit.map((element, index) => {
    if (elementSplit.length === 1 && stringElement.includes("equation")) {
      return <LearnPage.Material.Equation key={id + index} text={element} />;
    }
    if (stringElement[0] === "<" && index % 2 === 0) {
      return <LearnPage.Material.Equation key={id + index} text={element} />;
    }
    if (stringElement[0] === "<" && index % 2 !== 0) {
      return element;
    }
    if (index % 2 === 0) {
      return element;
    }
    return <LearnPage.Material.Equation key={id + index} text={element} />;
  });
  return allElementMap;
};

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
    <div className="w-full flex flex-col gap-2 justify-center items-center mb-4 border-2 border-white rounded-md p-2 md:p-10">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Einstein"
          width={400}
          height={400}
          className="w-full md:w-1/2 object-cover rounded-md mb-2"
          priority
        />
      )}
      <p className="w-full font-bold mb-2 text-sm md:text-lg">
        {equationElementParser(text, "question")}
      </p>
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
      className={`w-full p-2 border-2 text-sm md:text-lg ${
        questionsState[index].activeOption === answerOption
          ? " bg-white text-primary"
          : "border-white"
      } rounded-md`}
      onClick={onClick}
    >
      {/* {equationElementParser(`<equation> \\rightarrow </equation>`, "answer")} */}
      {equationElementParser(value, "question")}
    </button>
  );
};

const Test = ({
  questionsState,
  title,
  onSubmitTest,
}: {
  questionsState: QuestionState[];
  title: string;
  onSubmitTest: () => void;
}) => {
  const dispatch = useAppDispatch();

  return (
    <div className="w-full min-h screen flex flex-col gap-4 justify-center items-center pt-24 pb-4 px-4 md:pt-40 md:pb-20 md:px-20 bg-primary text-white">
      <h3 className="text-xl md:text-4xl font-bold self-start">
        Tes {`"${title}"`}
      </h3>
      <p className="w-full text-justify mb-8 text-sm md:text-lg">
        Jawaban Test yang akan terekam ke database hanyalah jawaban yang dikirim
        untuk pertama kalinya, mohon menjawab dengan hati-hati!
      </p>
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
        className="w-full mt-10 text-primary bg-white text-sm md:text-lg p-2 md:p-6"
        onClick={onSubmitTest}
      />
    </div>
  );
};

export default Test;
