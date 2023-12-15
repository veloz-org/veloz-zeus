import $axios from "./axios";

// register / signup
export const registerUsers = async (data: any) => {
  const resp = await $axios.post("/auth/register", data);
  return resp.data;
};

// fetch users info
export const getUser = async () => {
  const req = await $axios.get("/user");
  return req.data;
};

// subscribe to a plan
export const subscribeToPlan = async (data: any) => {
  const resp = await $axios.post("/subscription", data);
  return resp.data;
};
