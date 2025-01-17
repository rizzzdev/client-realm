import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { setButtonDisabled } from "~/redux/slices/commonSlice";

const Button = ({
  text,
  className,
  onClick,
}: {
  text: string;
  className?: string;
  onClick?: () => void;
}) => {
  const commonState = useAppSelector((state) => state.common);
  const dispatch = useAppDispatch();
  const handleClick = async () => {
    dispatch(setButtonDisabled(true));
    if (onClick) {
      try {
        await onClick();
        dispatch(setButtonDisabled(false));
      } catch {
        dispatch(setButtonDisabled(false));
      }
    }
    dispatch(setButtonDisabled(false));
  };

  return (
    <button
      className={`${className} w-[90%] h-10 mx-auto font-bold ${
        commonState.isButtonDisabled ? "bg-secondaryAccent" : "bg-secondary"
      } text-white rounded-md overflow-hidden flex flex-col justify-center items-center text-sm p-2 mt-8 mb-4 ease-in-out duration-500`}
      onClick={handleClick}
      disabled={commonState.isButtonDisabled}
    >
      {text}
    </button>
  );
};

export default Button;
