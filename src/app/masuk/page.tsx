"use client";

import Link from "next/link";
import axiosIns from "~/libs/axiosIns";
import { useRouter } from "next/navigation";
import { useAppSelector } from "~/redux/hooks";
import { useAppDispatch } from "~/redux/hooks";
import { login } from "~/redux/actions/userAction";

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
      window.localStorage.setItem('islogin', String(true))
      window.localStorage.setItem('username', loginState.username ?? "")
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-full h-[100vh] flex justify-center items-center ">
      <div className="w-[40%] flex-col justify-center items-center p-2 text-color5 border-[2px] border-color5 rounded-lg">
        <h3 className="w-full text-4xl font-bold text-center mt-6 mb-1">
          <Link href={"/"}>
            Realm<span className="text-color3">.</span>
          </Link>
        </h3>
        <p className="w-full text-center text-sm mb-20">
          Masuk untuk mulai belajar di Realm!
        </p>
        <div className="w-[90%]  mx-auto border border-color5 rounded-md overflow-hidden flex flex-col justify-center items-center text-sm p-2 mb-2">
          {loginState.username && (
            <p className="w-full px-2 py-1 text-xs font-bold">Email</p>
          )}
          <input
            type="text"
            id="username"
            placeholder="Email"
            className="w-full outline-none px-2 py-1"
            onChange={(e) => dispatch(login({...loginState, username: e.target.value }))}
          />
        </div>
        <div className="w-[90%]  mx-auto border border-color5 rounded-md overflow-hidden flex flex-col justify-center items-center text-sm p-2 mb-10">
          {loginState.password && (
            <p className="w-full px-2 py-1 text-xs font-bold">Password</p>
          )}
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="w-full outline-none px-2 py-1"
            onChange={(e) => dispatch(login({...loginState, password: e.target.value }))}
          />
        </div>
        <button
          className="w-[90%] mx-auto font-bold bg-color4 text-white rounded-md overflow-hidden flex flex-col justify-center items-center text-sm p-2 mb-10 hover:bg-color5 ease-in-out duration-500"
          onClick={handleLogin}
        >
          MASUK
        </button>
      </div>
    </div>
  );
}
