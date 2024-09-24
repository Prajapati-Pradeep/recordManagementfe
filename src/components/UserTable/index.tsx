"use client";
import useAxiosAuth from "@/libs/hooks/useAxiosHook";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { stringify } from "querystring";
import React from "react";

const UserTable = () => {
  const AuthAPI = useAxiosAuth();
  const session = useSession();

  const getUsers = async () => {
    return await AuthAPI.get(`/api/user`);
  };
  const { data } = useQuery({
    queryKey: ["initial-users"],
    queryFn: () => getUsers(),
    enabled: !!session,
    refetchOnWindowFocus: false,
  });
  console.log(data);
  return <div>{"Hello this is user"}</div>;
};

export { UserTable };
