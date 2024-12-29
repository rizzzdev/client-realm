"use client"
import { useAppSelector, useAppDispatch } from "~/redux/hooks";
import Header from "~/components/layouts/Header";
import { useEffect } from "react";
import Loading from "~/components/layouts/Loading";
import { setLogin } from "~/redux/slices/userSlice";
import { setLoading } from "~/redux/slices/loadingSlice";

export default function Home() {
  const loginState = useAppSelector(state => state.user.login)
  const loadingState = useAppSelector(state => state.loading)
  const dispatch = useAppDispatch()

  useEffect(() => {
    // dispatch(setLoading(false))
    dispatch(setLogin({...loginState, username: "rizzzz"}))
    dispatch(setLoading(false))

  }, [])

  if (loadingState.isLoading) {
    return (
      <Loading/>
    )
  }

  return (
    <>
      <Header active="beranda" isLogin={loginState.isLogin} username={loginState.username} />
      <h3 className="text-color1">SELAMAT DATANG {loginState.username}</h3>
    </>
  );
}
