import { getProfileImage } from "../utils/utils";

const Friend = ({ info }) => {
  if (!info) return;
  return (
    <div className="flex gap-4 items-center">
      <div>
        <img
          className="h-10 w-10 rounded-full"
          src={getProfileImage(info)}
          alt=""
        />
      </div>
      <div className="min-w-0 flex-1">
        <div>
          <p className="text-sm font-medium text-gray-900">{info.fullName}</p>
          <p className="text-sm text-gray-500 hidden md:block">
            @{info.username}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Friend;
