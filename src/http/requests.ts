import $axios from "./axios";

// register / signup
export const registerUsers = async (data: any) => {
  const resp = await $axios.post("/auth/register", data);
  return resp.data;
};
