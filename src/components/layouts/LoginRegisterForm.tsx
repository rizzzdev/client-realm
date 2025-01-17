import { ChangeEvent, ReactNode } from "react";
import Title from "../elements/Title";
import { useAppSelector } from "~/redux/hooks";
import Link from "next/link";
import Button from "../elements/Button";

const Header = ({ text }: { text: string }) => {
  return (
    <div className="w-full flex flex-col gap-2 justify-center items-center">
      <Title className="mt-6 mb-1 w-fit justify-center" />
      <p className="w-full text-center text-sm mb-20 text-color4">{text}</p>
    </div>
  );
};

const Input = ({
  name,
  type,
  onChange,
  placeholder,
  state,
  value,
}: {
  name: string;
  type: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  state: string | boolean | null | undefined;
  value: string;
}) => {
  return (
    <div className="w-[90%]  mx-auto border-[2px] border-secondary rounded-md overflow-hidden flex flex-col justify-center items-center text-sm p-2 mb-2">
      {state && (
        <label htmlFor={name} className="w-full px-2 py-1 text-xs font-bold">
          {placeholder}
        </label>
      )}
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        className="w-full outline-none px-2 py-1 bg-primary text-white placeholder:text-[#a9a9a9]"
        onChange={onChange}
        autoComplete="off"
        value={value}
      />
    </div>
  );
};

const Dropdown = ({
  name,
  onChange,
  placeholder,
  state,
}: {
  name: string;
  type: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
  state: string | boolean | null | undefined;
}) => {
  return (
    <div className="w-[90%]  mx-auto border-[2px] border-secondary rounded-md overflow-hidden flex flex-col justify-center items-center text-sm p-2 mb-2">
      {state && (
        <label htmlFor={name} className="w-full px-2 py-1 text-xs font-bold">
          {placeholder}
        </label>
      )}
      <select
        id={name}
        className={`w-full outline-none px-2 py-1 bg-primary ${
          state ? "text-white" : "text-[#a9a9a9]"
        }`}
        onChange={onChange}
      >
        <option value="" className="w-full text-white">
          {placeholder}
        </option>
        <option value="MALE" className="w- text-white">
          MALE
        </option>
        <option value="FEMALE" className="w-full text-white">
          FEMALE
        </option>
      </select>
    </div>
  );
};

const Warning = ({ type }: { type: "signin" | "signup" }) => {
  const authState = useAppSelector((state) => state.auth);
  if (type === "signin") {
    return (
      <p className="w-full text-center text-sm mt-8">
        {authState.signin.signinWarning}
      </p>
    );
  } else {
    return (
      <p className="w-full text-center text-sm mt-8">
        {authState.signup.signupWarning}
      </p>
    );
  }
};

const Redirect = ({ to }: { to: "signin" | "signup" }) => {
  if (to === "signin") {
    return (
      <div className="w-full flex justify-center items-center gap-2 my-10">
        <p className="text-center text-sm">Already have Username?</p>
        <Link href="/signin" className="text-secondaryAccent font-bold">
          SIGN IN HERE!
        </Link>
      </div>
    );
  }
  return (
    <div className="w-full flex justify-center items-center gap-2 my-10">
      <p className="text-center text-sm">Do not have Username?</p>
      <Link href="/signup" className="text-secondaryAccent font-bold">
        SIGN UP HERE!
      </Link>
    </div>
  );
};

const LoginRegisterForm = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="w-[90%] md:w-[40%] flex-col justify-center items-center p-2 text-white  bg-primary rounded-lg my-10 border-[2px] border-secondary">
        {children}
      </div>
    </div>
  );
};

Input.Dropdown = Dropdown;
LoginRegisterForm.Header = Header;
LoginRegisterForm.Input = Input;
LoginRegisterForm.Button = Button;
LoginRegisterForm.Warning = Warning;
LoginRegisterForm.Redirect = Redirect;

export default LoginRegisterForm;
