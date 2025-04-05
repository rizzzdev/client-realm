import { useId } from "react";
import LearnPage from "./LearnPage";
import Button from "../elements/Button";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import axiosIns from "~/libs/axiosIns";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { setLoading } from "~/redux/slices/commonSlice";

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
  const router = useRouter();
  const dispatch = useAppDispatch();
  const materialState = useAppSelector((state) => state.materials);
  const userState = useAppSelector((state) => state.user);

  const handleClick = async () => {
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

    await axiosIns.post(
      "/activities",
      {
        activityType: "MATERIAL",
        materialId: materialState.currentMaterial.id,
        userId: userState.id,
        message: `Menyelesaikan materi "${materialState.currentMaterial.title}"`,
      },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(
            "access-token"
          )}`,
        },
      }
    );

    alert(
      `Selamat, kamu telah menyelesaikan materi "${materialState.currentMaterial.title}"!`
    );
  };
  return (
    <LearnPage.Material title={title}>
      {allElementParser(strElement, id)}
      <Button
        text="Selesaikan Materi"
        className="bg-white text-primary w-full mt-16"
        onClick={handleClick}
      />
    </LearnPage.Material>
  );
};

export default Material;
