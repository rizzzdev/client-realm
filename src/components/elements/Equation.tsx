"use client";

import katex from "katex";
import "katex/dist/katex.min.css";

const Equation = ({
  text,
  className,
  type,
}: {
  text: string;
  className?: string;
  type?: "inline" | "block";
}) => {
  // const textValidation = text
  //   .split(/<\/?script>/g)
  //   .filter((a) => a.trim() !== "")[0];
  const latex = text
    ? katex.renderToString(text, {
        output: "html",
      })
    : "bad request";

  return (
    <span
      dangerouslySetInnerHTML={{
        __html: latex,
      }}
      className={` ${
        type === "block" ? "block text-xl" : "text-md"
      } w-full text-center ${className} mb-2`}
    ></span>
  );
};

export default Equation;
