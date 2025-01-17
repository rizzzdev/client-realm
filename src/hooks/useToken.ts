import { useEffect } from "react";
import getNewToken from "~/libs/getNewToken";
import { useAppDispatch } from "~/redux/hooks";
import { setLoading } from "~/redux/slices/commonSlice";

const useToken = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    const accessToken = window.localStorage.getItem("access-token") ?? "";

    if(!accessToken) {
      window.location.href = "/login";
      dispatch(setLoading(false));
      return;
    }

    try {
      jw
    }

    getNewToken(accessToken)
      .then((res) => {
        window.localStorage.setItem("access-token", res);
        dispatch(setLoading(false));
      })
      .catch(() => {
        window.localStorage.setItem("access-token", "");
        window.location.href = "/login";
      });
  }, []);
};

export default useToken;
