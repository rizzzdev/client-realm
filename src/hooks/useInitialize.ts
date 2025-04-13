"use client";

import { jwtDecode } from "jwt-decode";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import axiosIns from "~/libs/axiosIns";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { resetActivities } from "~/redux/slices/activitySlice";
import { resetSignin, resetSignup } from "~/redux/slices/authSlice";
import { setButtonDisabled, setLoading } from "~/redux/slices/commonSlice";
import { resetLeaderboard } from "~/redux/slices/leaderboardSlice";
import { resetMark } from "~/redux/slices/markSlice";
import { resetMaterials } from "~/redux/slices/materialsSlice";
import { resetQuestions } from "~/redux/slices/questionSlice";
import { resetTests } from "~/redux/slices/testSlice";
import { resetUser, setUser, UserState } from "~/redux/slices/userSlice";
import { resetUsers } from "~/redux/slices/usersSlice";

const useInitialize = (callback?: () => void) => {
  const userState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const path = usePathname();

  const initialize = async () => {
    dispatch(resetSignin());
    dispatch(resetSignup());
    dispatch(resetUser());
    dispatch(resetMaterials());
    dispatch(resetQuestions());
    dispatch(resetLeaderboard());
    dispatch(setLoading(true));
    dispatch(setButtonDisabled(false));
    dispatch(resetActivities());
    dispatch(resetUsers());
    dispatch(resetMark());
    dispatch(resetTests());

    const screenWidth = window.screen.width;
    const html = document.querySelector("html");
    // html?.classList.add("no-scrollbar");
    if (screenWidth >= 1280) {
      html!.style.fontSize = `${Math.round(screenWidth / 80)}px`;
    }

    const accessToken = window.localStorage.getItem("access-token") ?? "";

    if (!accessToken && !["/signin", "/signup"].includes(path)) {
      router.push("/signin");
      dispatch(setLoading(false));
      return;
    }

    if (!accessToken && ["/signin", "/signup"].includes(path)) {
      dispatch(setLoading(false));
      return;
    }

    try {
      const { exp } = jwtDecode(accessToken);
      if (exp! * 1000 < Date.now()) {
        const result = await axiosIns.get<{ data: { accessToken: string } }>(
          "/new-access-token"
        );
        window.localStorage.setItem(
          "access-token",
          result.data.data.accessToken
        );
      }
    } catch {
      window.localStorage.setItem("access-token", "");
      router.push("/signin");
      dispatch(setLoading(false));
      return;
    }

    const newAccessToken = window.localStorage.getItem("access-token");

    if (newAccessToken && ["/signin", "/signup"].includes(path)) {
      router.push("/");
      dispatch(setLoading(false));
      return;
    }

    const decodedAccessToken = jwtDecode(newAccessToken!) as UserState;
    dispatch(
      setUser({
        ...userState,
        id: decodedAccessToken.id,
        isLogin: true,
        username: decodedAccessToken.username,
        fullName: decodedAccessToken.fullName,
        accessToken: accessToken,
        avatarUrl: decodedAccessToken.avatarUrl,
        gender: decodedAccessToken.gender,
        role: decodedAccessToken.role,
      })
    );

    if (path.split("/")[1] === "admin" && userState.role !== "ADMIN") {
      dispatch(setLoading(false));
    }

    if (callback) await callback!();
    dispatch(setLoading(false));
  };

  useEffect(() => {
    initialize();
  }, []);
};

export default useInitialize;
