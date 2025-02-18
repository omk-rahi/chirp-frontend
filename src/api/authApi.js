import axiosClient from "./axiosClient";

export const registerUser = async (data) => {
  const response = await axiosClient.post("/auth/signup", data);
  return response.data;
};

export const login = async (credentials) => {
  const response = await axiosClient.post("/auth/login", credentials);
  return response.data;
};

export const logout = async () => {
  const response = await axiosClient.post("/auth/logout");
  return response.data;
};

export const verifyOTP = async (data) => {
  const response = await axiosClient.post("/auth/otp/verify", data);
  return response.data;
};

export const getUser = async () => {
  const response = await axiosClient.get("/auth/me");
  return response.data.data;
};

export const updateUser = async (data) => {
  const response = await axiosClient.patch("/auth/me", data);
  return response.data.data;
};
