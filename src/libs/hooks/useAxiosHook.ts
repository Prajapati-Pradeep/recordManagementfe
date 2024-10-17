"use client";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { AUTHAPI } from "../axios";

const useAxiosAuth = () => {
  const { data: session }: any = useSession();

  useEffect(() => {
    const requestIntercept = AUTHAPI.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"] && session) {
          config.headers["Authorization"] = `Bearer ${
            session?.user?.accessToken || session?.accessToken
          }`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = AUTHAPI.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (
          error?.response?.status === 401 &&
          error?.response?.statusText === "Unauthorized"
        ) {
          signOut({ callbackUrl: "/" });
          return Promise.reject(error);
        }
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          prevRequest.headers["Authorization"] = `Bearer ${
            session?.user.accessToken || session?.accessToken
          }`;
          return AUTHAPI(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      AUTHAPI.interceptors.request.eject(requestIntercept);
      AUTHAPI.interceptors.response.eject(responseIntercept);
    };
  }, [session]);

  return AUTHAPI;
};

export default useAxiosAuth;
