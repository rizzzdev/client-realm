import { ChangeEvent, ReactNode, useState } from "react";
import Title from "../elements/Title";
import { useAppSelector } from "~/redux/hooks";
import Link from "next/link";
import Button from "../elements/Button";
import { Eye, EyeSlash } from "@phosphor-icons/react";

const Header = ({ text }: { text: string }) => {
  return (
    <div className="w-full flex flex-col gap-2 justify-center items-center">
      <Title className="mt-6 mb-1 w-fit justify-center" />
      <p className="w-full text-center text-sm mb-20 text-primary">{text}</p>
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
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const handleClick = () => {
    setIsPasswordShow(!isPasswordShow);
  };

  return (
    <div className="w-[90%]  mx-auto border-[2px] border-primary rounded-md overflow-hidden flex flex-col justify-center items-center text-sm p-2 mb-2">
      {state && (
        <label
          htmlFor={name}
          className="w-full px-2 py-1 text-xs font-bold text-primary"
        >
          {placeholder}
        </label>
      )}
      <div className="w-full relative flex justify-center items-center">
        <input
          type={isPasswordShow ? "text" : type}
          id={name}
          placeholder={placeholder}
          className="w-full outline-none px-2 py-1 bg-white text-primary placeholder:text-[#a9a9a9]"
          onChange={onChange}
          autoComplete="off"
          value={value}
        />
        {type === "password" && !isPasswordShow && (
          <Eye
            size={26}
            className=" top-0 -right-0 text-primary cursor-pointer"
            onClick={handleClick}
          />
        )}
        {type === "password" && isPasswordShow && (
          <EyeSlash
            size={26}
            className=" top-0 -right-0 text-primary cursor-pointer"
            onClick={handleClick}
          />
        )}
      </div>
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
    <div className="w-[90%]  mx-auto border-[2px] border-primary rounded-md overflow-hidden flex flex-col justify-center items-center text-sm p-2 mb-2">
      {state && (
        <label
          htmlFor={name}
          className="w-full px-2 py-1 text-xs font-bold text-primary"
        >
          {placeholder}
        </label>
      )}
      <select
        id={name}
        className={`w-full outline-none px-2 py-1 bg-white ${
          state ? "text-primary" : "text-[#a9a9a9]"
        }`}
        onChange={onChange}
      >
        <option value="" className="w-full text-primary">
          {placeholder}
        </option>
        <option value="MALE" className="w- text-primary">
          MALE
        </option>
        <option value="FEMALE" className="w-full text-primary">
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
        <Link href="/signin" className="text-primary font-bold">
          SIGN IN HERE!
        </Link>
      </div>
    );
  }
  return (
    <div className="w-full flex justify-center items-center gap-2 my-10">
      <p className="text-center text-sm">Do not have Username?</p>
      <Link href="/signup" className="text-primary font-bold">
        SIGN UP HERE!
      </Link>
    </div>
  );
};

const LoginRegisterForm = ({
  children,
  onSubmit,
}: {
  children: ReactNode;
  onSubmit: () => void;
}) => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="w-[90%] md:w-[40%] flex-col justify-center items-center p-2 bg-white rounded-lg my-10 border-[2px] border-primary"
      >
        {children}
      </form>
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
