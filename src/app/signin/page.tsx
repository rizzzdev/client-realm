"use client";

import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "~/redux/hooks";
import { setSignin } from "~/redux/slices/authSlice";
import LoginRegisterForm from "~/components/layouts/LoginRegisterForm";
import axiosIns from "~/libs/axiosIns";
import useInitialize from "~/hooks/useInitialize";
import { setButtonDisabled, setLoading } from "~/redux/slices/commonSlice";
import { setUser } from "~/redux/slices/userSlice";
import Loading from "~/components/layouts/Loading";
import { AxiosError } from "axios";
import { ApiResponse } from "~/types/apiResponse";

interface LoginData {
  refreshToken: string;
  accessToken: string;
}

const Signin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const signinState = useAppSelector((state) => state.auth.signin);
  const userState = useAppSelector((state) => state.user);
  const commonState = useAppSelector((state) => state.common);

  useInitialize();

  const handleSignin = async () => {
    try {
      const apiResponse = await axiosIns.post<ApiResponse<LoginData>>(
        "/signin",
        {
          username: signinState.username,
          password: signinState.password,
        }
      );
      window.localStorage.setItem(
        "access-token",
        apiResponse.data.data.accessToken
      );
      dispatch(
        setSignin({
          ...signinState,
          signinWarning: apiResponse.data.message,
        })
      );
      dispatch(
        setUser({
          ...userState,
          isLogin: true,
        })
      );
      dispatch(setLoading(false));

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(
          setSignin({
            ...signinState,
            signinWarning: error.response!.data.message,
          })
        );
        dispatch(
          setUser({
            ...userState,
            isLogin: false,
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
    <LoginRegisterForm onSubmit={handleSignin}>
      <LoginRegisterForm.Header text="Silahkan Sign In untuk memulai belajar di Realm!" />
      <LoginRegisterForm.Input
        name="username"
        placeholder="Username"
        type="text"
        onChange={(e) =>
          dispatch(setSignin({ ...signinState, username: e.target.value }))
        }
        state={signinState.username}
        value={signinState.username ?? ""}
      />
      <LoginRegisterForm.Input
        name="password"
        placeholder="Password"
        type="password"
        onChange={(e) =>
          dispatch(setSignin({ ...signinState, password: e.target.value }))
        }
        state={signinState.password}
        value={signinState.password ?? ""}
      />
      <LoginRegisterForm.Warning type="signin" />
      <LoginRegisterForm.Button
        text="SIGN IN"
        onClick={handleSignin}
        className="bg-primary text-white"
      />
      <LoginRegisterForm.Redirect to="signup" />
    </LoginRegisterForm>
  );
};

export default Signin;
