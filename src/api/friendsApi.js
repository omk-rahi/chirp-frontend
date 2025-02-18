import axiosClient from "./axiosClient";

export const searchUser = async (query) => {
  const res = await axiosClient.get(`/users?query=${query}`);
  return res.data.data;
};

export const getAllRequest = async () => {
  const res = await axiosClient.get("/friends/request");
  return res.data.data;
};

export const sendRequest = async (to) => {
  const res = await axiosClient.post("/friends/request", { to });
  return res;
};

export const acceptRequest = async (requestId) => {
  const res = await axiosClient.patch(`/friends/request/${requestId}`);
  return res.data.data;
};

export const rejectRequest = async (requestId) => {
  const res = await axiosClient.delete(`/friends/request/${requestId}`);
  return res.data.data;
};

export const getAllFriends = async () => {
  const res = await axiosClient.get("/friends");
  return res.data.data;
};

export const removeFriend = async (friendId) => {
  const res = await axiosClient.delete(`/friends/${friendId}`);
  return res.data.data;
};
