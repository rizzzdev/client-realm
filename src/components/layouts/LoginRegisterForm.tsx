import Link from "next/link";
import { ChangeEvent, ReactNode } from "react";

const Header = ({ text }: { text: string }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <h3 className="w-full text-4xl font-bold text-center mt-6 mb-1">
        <Link href={"/"}>
          Realm<span className="text-color3">.</span>
        </Link>
      </h3>
      <p className="w-full text-center text-sm mb-20">{text}</p>
    </div>
  );
};

const Input = ({
  name,
  type,
  onChange,
  placeholder,
  state,
}: {
  name: string;
  type: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  state: string | boolean | null | undefined;
}) => {
  return (
    <div className="w-[90%]  mx-auto border border-color5 rounded-md overflow-hidden flex flex-col justify-center items-center text-sm p-2 mb-2">
      {state && (
        <label htmlFor={name} className="w-full px-2 py-1 text-xs font-bold">
          {placeholder}
        </label>
      )}
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        className="w-full outline-none px-2 py-1"
        onChange={onChange}
      />
    </div>
  );
};

const Button = ({ text, onClick }: { text: string; onClick?: () => void }) => {
  return (
    <button
      className="w-[90%] mx-auto font-bold bg-color4 text-white rounded-md overflow-hidden flex flex-col justify-center items-center text-sm p-2 my-10 hover:bg-color5 ease-in-out duration-500"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

const LoginRegisterForm = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full min-h-[100vh] flex justify-center items-center">
      <div className="w-[40%] flex-col justify-center items-center p-2 text-color5 border-[2px] border-color5 rounded-lg my-10">
        {children}
      </div>
    </div>
  );
};

LoginRegisterForm.Header = Header;
LoginRegisterForm.Input = Input;
LoginRegisterForm.Button = Button;

export default LoginRegisterForm;
