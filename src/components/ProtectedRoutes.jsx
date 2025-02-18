import { Navigate } from "react-router";

import { useUser } from "../features/auth/hooks/useAuth";

import Loader from "./Loader";
import { setSocket, SocketContext } from "../socket/SocketContext";
import { connectSocket } from "../socket/socket";
import { useEffect, useContext } from "react";

const ProtectedRoutes = ({ children }) => {
  const { user, isLoading } = useUser();
  const { socketDispatch } = useContext(SocketContext);

  useEffect(() => {
    if (user) {
      const socket = connectSocket(user);
      socketDispatch(setSocket(socket));

      return () => {
        socket.disconnect();
      };
    }
  }, [user, socketDispatch]);

  if (isLoading) return <Loader />;

  if (!isLoading && !user) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoutes;
