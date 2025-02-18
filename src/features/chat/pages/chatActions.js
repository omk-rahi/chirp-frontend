export const setChatActive = (chatId) => {
  return {
    type: "SET_ACTIVE_CHAT",
    payload: chatId,
  };
};
