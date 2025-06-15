"use client";

import Equation from "~/components/elements/Equation";
import Material from "~/components/layouts/Material";

const Page = () => {
  return (
    <>
      <Material
        title="Lorem Ipsum"
        strElement="<paragraph-eq><equation-block>E = mc^2</equation-block><equation-block>E = mc^2</equation-block><equation-block>E = mc^2</equation-block></paragraph-eq>"
      />
      <Equation type="block" text="e = mc^2" />
      <Equation type="block" text="e = mc^2" />
      <Equation type="block" text="e = mc^2" />
      <Equation type="block" text="e = mc^2" />
    </>
  );
};

export default Page;
