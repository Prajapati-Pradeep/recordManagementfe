import axios from "axios";

export const AddUser = async (data: { email: string; password: string }) => {
  return await axios.post("http://localhost:5000/api/auth/signup", data);
};
