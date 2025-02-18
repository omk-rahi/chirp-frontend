import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

import {
  login as loginApi,
  getUser,
  registerUser,
  verifyOTP,
  logout as logoutApi,
} from "../../../api/authApi";
import toast from "react-hot-toast";

import { useNavigate } from "react-router";
import { useContext } from "react";
import { setSocket, SocketContext } from "../../../socket/SocketContext";
import { connectSocket } from "../../../socket/socket";

export const useUser = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return { user, isLoading };
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { mutate: register, isLoading } = useMutation({
    mutationFn: registerUser,
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["register_user"], data);
      toast.success("Account created successfully");
      navigate("/verify");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { register, isLoading };
};

export const useVerifyOTP = () => {
  const navigate = useNavigate();
  const { mutate: verify, isLoading } = useMutation({
    mutationFn: verifyOTP,
    onSuccess: () => {
      toast.success("OTP verified successfully");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { verify, isLoading };
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { socketDispatch } = useContext(SocketContext);

  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: loginApi,
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["user"], data);
      toast.success("Logged in successfully");
      const socket = connectSocket(data);
      socketDispatch(setSocket(socket));
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { login, isLoading };
};

export const useLogout = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries(["user"]);
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { logout, isLoading };
};
