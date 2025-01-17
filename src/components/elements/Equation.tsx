"use client";

import katex from "katex";
import "katex/dist/katex.min.css";

const Equation = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const textValidation = text
    .split(/<\/?script>/g)
    .filter((a) => a.trim() !== "")[0];
  const latex =
    text === textValidation
      ? katex.renderToString(text, {
          output: "mathml",
        })
      : "bad request";

  return (
    <span
      dangerouslySetInnerHTML={{
        __html: latex,
      }}
      className={`text-lg font-bold ${className}`}
    ></span>
  );
};

export default Equation;
