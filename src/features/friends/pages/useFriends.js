import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  acceptRequest,
  getAllFriends,
  getAllRequest,
  rejectRequest,
  removeFriend,
  searchUser,
  sendRequest,
} from "../../../api/friendsApi";

export const useSearchUser = (query) => {
  const { data, isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchUser(query),
    enabled: Boolean(query),
    staleTime: 0,
  });

  return { data, isLoading };
};

export const useGetFriendRequest = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["requests"],
    queryFn: getAllRequest,
  });
  return { requests: data?.requests, isLoading };
};

export const useSendFriendRequest = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: sendRequest,
    onSuccess: () => {
      toast.success("Friend request sent");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { sendFriendRequest: mutate, isLoading };
};

export const useAcceptRequest = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: acceptRequest,
    onSuccess: () => {
      toast.success("Friend request accepted");
      queryClient.invalidateQueries(["requests", "friends"]);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { acceptRequest: mutate, isLoading };
};

export const useRejectRequest = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: rejectRequest,
    onSuccess: () => {
      toast.success("Friend request rejected");
      queryClient.invalidateQueries(["requests"]);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { rejectRequest: mutate, isLoading };
};

export const useGetFriends = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getAllFriends,
  });
  return { friends: data?.friends, isLoading };
};

export const useRemoveFriend = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: removeFriend,
    onSuccess: () => {
      toast.success("Friend removed");
      queryClient.invalidateQueries(["friends"]);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { removeFriend: mutate, isLoading };
};
