import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateUser } from "../../../api/authApi";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const { mutate: updateUserProfile, isLoading } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries(["user"]);
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { updateUserProfile, isLoading };
};
