import { useAppDispatch } from "~/redux/hooks";
import { setButtonDisabled } from "~/redux/slices/commonSlice";

const Button = ({
  text,
  className,
  onClick,
  disabled,
}: {
  text: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  // const commonState = useAppSelector((state) => state.common);
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
      className={`${className} w-[90%] h-10 mx-auto font-bold
      } text-primary rounded-md overflow-hidden flex flex-col justify-center items-center text-sm mt-8 mb-4 ease-in-out duration-500`}
      onClick={handleClick}
      // disabled={commonState.isButtonDisabled}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
