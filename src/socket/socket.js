const backendUrl = import.meta.env.VITE_BACKEND_URL;

import { io } from "socket.io-client";

export const connectSocket = (user) => {
  if (!user) return;
  const socket = io.connect(backendUrl, {
    query: { userId: user.id },
    transports: ["websocket"],
    withCredentials: true,
    forceNew: true,
  });

  return socket;
};
