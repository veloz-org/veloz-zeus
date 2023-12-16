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

// get subscriptions
export const getSubscriptions = async () => {
  const resp = await $axios.get("/subscription");
  return resp.data;
};

// get customer portal url
export const getCustomerPortal = async (data: any) => {
  const resp = await $axios.post("/subscription/portal", data);
  return resp.data;
};
