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
      className={`text-md  ${className}`}
    ></span>
  );
};

export default Equation;
