"use client";

import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Loading from "~/components/layouts/Loading";
import LoginRegisterForm from "~/components/layouts/LoginRegisterForm";
import useInitialize from "~/hooks/useInitialize";
import axiosIns from "~/libs/axiosIns";
import { useAppSelector, useAppDispatch } from "~/redux/hooks";
import { setSignup } from "~/redux/slices/authSlice";
import { setButtonDisabled, setLoading } from "~/redux/slices/commonSlice";

interface ApiResponse<T> {
  success: boolean;
  status: number;
  message: string;
  data: T;
}

const Signup = () => {
  const dispatch = useAppDispatch();
  const signupState = useAppSelector((state) => state.auth.signup);
  const userState = useAppSelector((state) => state.user);
  const commonState = useAppSelector((state) => state.common);
  const router = useRouter();

  useInitialize();

  const handleSignup = async () => {
    try {
      const apiResponse = await axiosIns.post<ApiResponse<null>>("/signup", {
        username: signupState.username,
        password: signupState.password,
        confirmPassword: signupState.confirmPassword,
        fullName: signupState.fullName,
        gender: signupState.gender,
      });
      dispatch(
        setSignup({
          ...signupState,
          signupWarning: apiResponse.data.message,
        })
      );

      setTimeout(() => {
        router.push("/signin");
      }, 3000);

      // dispatch(setLoading(false));
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(
          setSignup({
            ...signupState,
            signupWarning: error.response!.data.message,
          })
        );
        dispatch(setLoading(false));
        dispatch(setButtonDisabled(false));
      }
    }
  };

  if (commonState.isLoading || userState.isLogin) {
    return <Loading />;
  }
  return (
    <LoginRegisterForm onSubmit={handleSignup}>
      <LoginRegisterForm.Header text="Silahkan registrasi untuk memulai belajar di Realm!" />

      <LoginRegisterForm.Input
        name="username"
        value={signupState.username ?? ""}
        placeholder="Username"
        type="text"
        state={signupState.username}
        onChange={(e) =>
          dispatch(setSignup({ ...signupState, username: e.target.value }))
        }
      />
      <LoginRegisterForm.Input
        name="password"
        value={signupState.password ?? ""}
        placeholder="Password"
        type="password"
        state={signupState.password}
        onChange={(e) =>
          dispatch(setSignup({ ...signupState, password: e.target.value }))
        }
      />
      <LoginRegisterForm.Input
        name="password"
        value={signupState.confirmPassword ?? ""}
        placeholder="Confirm Password"
        type="password"
        state={signupState.confirmPassword}
        onChange={(e) =>
          dispatch(
            setSignup({ ...signupState, confirmPassword: e.target.value })
          )
        }
      />
      <LoginRegisterForm.Input
        name="full-name"
        value={signupState.fullName ?? ""}
        placeholder="Full Name"
        type="text"
        state={signupState.fullName}
        onChange={(e) =>
          dispatch(setSignup({ ...signupState, fullName: e.target.value }))
        }
      />
      <LoginRegisterForm.Input.Dropdown
        name="gender"
        placeholder="Gender"
        state={signupState.gender}
        type="text"
        onChange={(e) =>
          dispatch(setSignup({ ...signupState, gender: e.target.value }))
        }
      />
      <LoginRegisterForm.Warning type="signup" />
      <LoginRegisterForm.Button
        text="SIGN UP"
        onClick={handleSignup}
        className="text-white bg-primary"
      />
      <LoginRegisterForm.Redirect to="signin" />
    </LoginRegisterForm>
  );
};

export default Signup;
