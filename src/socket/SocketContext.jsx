/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "../features/auth/hooks/useAuth";
export const SocketContext = createContext(null);

const initialState = {
  socket: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SOCKET":
      return { ...state, socket: action.payload };
    default:
      return state;
  }
};

export const setSocket = (socket) => ({ type: "SET_SOCKET", payload: socket });

export const SocketProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const [socketState, socketDispatch] = useReducer(reducer, initialState);

  const { user } = useUser();

  useEffect(() => {
    if (socketState?.socket) {
      socketState.socket.on("refetch", () => {
        queryClient.invalidateQueries(["friends"]);
      });
      return () => socketState.socket.disconnect();
    }
  }, [socketState.socket, queryClient]);

  useEffect(() => {
    if (!user) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        socketState?.socket.emit("userDisconnected", { userId: user.id });
      } else {
        socketState?.socket.emit("userConnected", { userId: user.id });
      }
      queryClient.invalidateQueries(["friends"]);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [socketState?.socket, user, queryClient]);

  return (
    <SocketContext.Provider value={{ socketState, socketDispatch }}>
      {children}
    </SocketContext.Provider>
  );
};
