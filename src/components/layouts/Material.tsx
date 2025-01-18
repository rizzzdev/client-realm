import { useId } from "react";
import LearnPage from "./LearnPage";

const stringElementToElementObject = (
  stringElement: string,
  elementType: "paragraph" | "highlight" | "img"
) => {
  const elementRegex = new RegExp(
    `<${elementType}>([\\s\\S]*?)<\\/${elementType}>`,
    "g"
  );
  const elementMatchesArray = stringElement
    ? [...stringElement.matchAll(elementRegex)]
    : [];
  const elementObjectArray = elementMatchesArray
    ? elementMatchesArray.map((element) => {
        return {
          elementType: elementType,
          elementStringValue: element[1],
          index: element["index"],
        };
      })
    : [];
  return elementObjectArray;
};

const stringElementToElementObjectAll = (stringElement: string) => {
  const paragraphElementObject = stringElementToElementObject(
    stringElement,
    "paragraph"
  );
  const highlightElementObject = stringElementToElementObject(
    stringElement,
    "highlight"
  );
  const imgElementObject = stringElementToElementObject(stringElement, "img");
  const allElementObject = [
    ...paragraphElementObject,
    ...highlightElementObject,
    ...imgElementObject,
  ];
  const allElementObjectSorted = allElementObject?.sort(
    (a, b) => a.index - b.index
  );
  return allElementObjectSorted;
};

const equationElementParser = (stringElement: string, id: string) => {
  const elementSplit = stringElement
    ?.split(/<\/?equation>/)
    ?.filter((el) => el.trim() !== "");
  const allElementMap = elementSplit.map((element, index) => {
    if (index % 2 === 0) {
      return element;
    }
    return <LearnPage.Material.Equation key={id + index} text={element} />;
  });
  console.log(allElementMap);
  return allElementMap;
};

const allElementParser = (stringElement: string, id: string) => {
  const elementObjectAll = stringElementToElementObjectAll(stringElement);
  const parsedElement = elementObjectAll?.map((element) => {
    switch (element.elementType) {
      case "paragraph":
        return (
          <LearnPage.Material.Paragraph key={element.index + id}>
            {equationElementParser(element.elementStringValue, id)}
          </LearnPage.Material.Paragraph>
        );
      case "highlight":
        return (
          <LearnPage.Material.Highlight
            key={element.index + id}
            text="Poin Penting!"
          >
            {equationElementParser(element.elementStringValue, id)}
          </LearnPage.Material.Highlight>
        );
      case "img":
        return (
          <LearnPage.Material.Img
            src={`/${element.elementStringValue}`}
            key={element.index + id}
          />
        );
    }
  });
  return parsedElement;
};

const Material = ({
  title,
  strElement,
}: {
  title: string;
  strElement: string;
}) => {
  const id = useId();
  return (
    <LearnPage.Material title={title}>
      {allElementParser(strElement, id)}
    </LearnPage.Material>
  );
};

export default Material;
