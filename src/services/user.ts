import axios from "axios";

export const AddUser = async (data: { email: string; password: string }) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/create-user`,
    data
  );
};

export const UserLogin = async (data: { email: string; password: string }) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
    data
  );
};
