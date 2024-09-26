import { API } from "@/libs/axios";

export const UserLogin = async (data: { email: string; password: string }) => {
  return await API.post(`/api/auth/login`, data);
};
