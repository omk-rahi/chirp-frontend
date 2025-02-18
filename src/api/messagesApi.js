import axiosClient from "./axiosClient";

export const getMessages = async (friendId) => {
  const res = await axiosClient.get(`/messages/${friendId}`);
  return res.data.data;
};

export const sendMessage = async (data) => {
  const res = await axiosClient.post("/messages/", data);
  return res.data;
};
