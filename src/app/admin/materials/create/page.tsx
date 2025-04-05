"use client";

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { ChangeEvent, ReactNode, useState } from "react";
import Body from "~/components/layouts/admin/Body";
import HeaderPage from "~/components/layouts/admin/HeaderPage";
import Loading from "~/components/layouts/Loading";
import useInitialize from "~/hooks/useInitialize";
import axiosIns from "~/libs/axiosIns";
import { useAppSelector } from "~/redux/hooks";

interface InputProps {
  type: "input" | "textarea";
  label: string;
  htmlFor: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

interface FormProps {
  children: ReactNode;
  onSubmit: () => void;
}

interface CreateMaterialState {
  title: string;
  description: string;
  imageUrl: string;
  materialString: string;
}

const Input = (props: InputProps) => {
  const { label, type, htmlFor, onChange } = props;

  return (
    <div className="w-full flex flex-col justify-center items-center gap-2 mb-8">
      <label htmlFor={htmlFor} className="w-full font-bold">
        {label}
      </label>
      {type === "input" && (
        <input
          type="text"
          className="w-full p-2 text-white bg-primary outline-none border-2 border-white rounded-md"
          onChange={onChange}
        />
      )}
      {type === "textarea" && (
        <textarea
          className="w-full h-40 p-2 text-white bg-primary outline-none border-2 border-white rounded-md"
          onChange={onChange}
        />
      )}
    </div>
  );
};

const Button = () => {
  return (
    <button className="w-full bg-white text-primary text-xl font-bold mt-4 p-2 rounded-md">
      CREATE
    </button>
  );
};

const Form = (props: FormProps) => {
  const { onSubmit, children } = props;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="w-3/4 flex flex-col justify-center items-center"
    >
      {children}
      <Button />
    </form>
  );
};

const CreateMaterial = () => {
  const { isLoading } = useAppSelector((state) => state.common);
  const [createMaterial, setCreateMaterial] = useState<CreateMaterialState>({
    title: "",
    description: "",
    imageUrl: "",
    materialString: "",
  });

  const router = useRouter();
  useInitialize(async () => {});

  const handleSubmit = async () => {
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
      return;
    }

    try {
      await axiosIns.post(
        "/materials",
        {
          title: createMaterial.title,
          description: createMaterial.description,
          imageUrl: createMaterial.imageUrl,
          materialString: createMaterial.materialString,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      alert("Berhasil");
    } catch {
      alert("gagal");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Body>
      <HeaderPage title="Bikin Material">
        Menu ini digunakan untuk melihat daftar peserta didik yang terdaftar
        pada media pembelajaran ini.
      </HeaderPage>
      <Form onSubmit={handleSubmit}>
        <Input
          htmlFor="title"
          label="Title"
          type="input"
          onChange={(e) =>
            setCreateMaterial((state) => ({ ...state, title: e.target.value }))
          }
        />
        <Input
          htmlFor="description"
          label="Description"
          type="input"
          onChange={(e) =>
            setCreateMaterial((state) => ({
              ...state,
              description: e.target.value,
            }))
          }
        />
        <Input
          htmlFor="imageUrl"
          label="Image URL"
          type="input"
          onChange={(e) =>
            setCreateMaterial((state) => ({
              ...state,
              imageUrl: e.target.value,
            }))
          }
        />
        <Input
          htmlFor="materialString"
          label="Material String"
          type="textarea"
          onChange={(e) =>
            setCreateMaterial((state) => ({
              ...state,
              materialString: e.target.value,
            }))
          }
        />
      </Form>
    </Body>
  );
};

export default CreateMaterial;
