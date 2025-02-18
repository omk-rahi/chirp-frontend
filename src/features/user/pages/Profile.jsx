import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../../../components/Button";
import Input from "../../../components/Input";

import { Camera } from "lucide-react";
import { useUser } from "../../auth/hooks/useAuth";
import { useUpdateProfile } from "./useProfile";
import { useState } from "react";

const ProfileSchema = z.object({
  fullName: z.string({ required_error: "Please enter fullname" }),
  email: z.string().email("Please provide a valid email address"),
  username: z
    .string({ required_error: "Please enter username" })
    .min(4, "Username must be atleast 4 character long"),
  bio: z.string(),
});

import { getProfileImage } from "../../../utils/utils";

const Profile = () => {
  const { user } = useUser();

  const [file, setFile] = useState(null);
  const [profileImage, setProfileImage] = useState();

  const { updateUserProfile, isLoading } = useUpdateProfile();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(ProfileSchema), defaultValues: user });

  const handleProfileChange = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setProfileImage(URL.createObjectURL(image));
  };

  const handleUpdateProfile = (data) => {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("bio", data.bio);
    if (file) formData.append("image", file);
    updateUserProfile(formData);
  };

  return (
    <div className="bg-white mt-8 max-w-7xl mx-auto">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-medium text-gray-900">Profile Settings</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="text-center">
            <div className="relative inline-block">
              <img
                className="h-32 w-32 rounded-full"
                src={profileImage || getProfileImage(user)}
                alt=""
              />
              <label
                className="absolute bottom-0 right-0 bg-brand-500 text-white rounded-full p-2 shadow-sm cursor-pointer"
                htmlFor="profile"
              >
                <Camera />
              </label>
              <input
                type="file"
                accept="image/*"
                id="profile"
                className="hidden"
                onChange={handleProfileChange}
              />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              {user.fullName}
            </h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          <form
            className="col-span-2 space-y-6"
            onSubmit={handleSubmit(handleUpdateProfile)}
          >
            <Input
              label="Fullname"
              id="fullName"
              type="text"
              register={register}
              error={errors?.fullName}
            />
            <Input
              label="Username"
              id="username"
              type="text"
              register={register}
              error={errors?.username}
            />
            <Input
              label="Email Address"
              id="email"
              type="email"
              register={register}
              error={errors?.email}
            />
            <div>
              <label
                className="text-gray-700 text-sm font-medium block"
                htmlFor="bio"
              >
                Bio
              </label>
              <textarea
                id="bio"
                className="mt-1 px-4 py-2 block border border-gray-300 w-full focus:ring-2 focus:ring-brand-500 focus:outline-0"
                rows={3}
                {...register("bio")}
              ></textarea>
            </div>
            <div className="flex justify-end">
              <div>
                <Button type="submit" disabled={isLoading}>
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
