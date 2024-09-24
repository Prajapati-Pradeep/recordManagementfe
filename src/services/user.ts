import { API, AUTHAPI } from "@/libs/axios";
import useAxiosAuth from "@/libs/hooks/useAxiosHook";

export const AddUser = async (data: { email: string; password: string }) => {
  return await API.post(`/api/user/create-user`, data);
};

export const UserLogin = async (data: { email: string; password: string }) => {
  return await API.post(`/api/auth/login`, data);
};
