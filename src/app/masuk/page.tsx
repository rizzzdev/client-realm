"use client";

import axiosIns from "~/libs/axiosIns";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "~/redux/hooks";
import { setLogin } from "~/redux/slices/userSlice";
import LoginRegisterForm from "~/components/layouts/LoginRegisterForm";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const loginState = useAppSelector((state) => state.user.login);

  async function handleLogin() {
    try {
      const response = await axiosIns.post(
        "http://localhost:3201/api/v1/login",
        {
          username: loginState.username,
          password: loginState.password,
        },
        {}
      );
      console.log(response);
      const loginStateLS = {
        isLogin: true,
        username: loginState.username,
      };
      window.localStorage.setItem("login-state", JSON.stringify(loginStateLS));
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (loginState?.isLogin) {
      router.push("/");
    }
  }, []);

  if(!loginState.isLogin) {
    return (
      <LoginRegisterForm>
        <LoginRegisterForm.Header text="Silahkan masuk untuk memulai belajar di Realm!" />
        <LoginRegisterForm.Input
          name="username"
          placeholder="Username"
          type="text"
          onChange={(e) =>
            dispatch(setLogin({ ...loginState, username: e.target.value }))
          }
          state={loginState.username}
        />
        <LoginRegisterForm.Input
          name="password"
          placeholder="Password"
          type="password"
          onChange={(e) =>
            dispatch(setLogin({ ...loginState, password: e.target.value }))
          }
          state={loginState.password}
        />
        <LoginRegisterForm.Button text="MASUK" onClick={handleLogin} />
      </LoginRegisterForm>
    );
  }
}
