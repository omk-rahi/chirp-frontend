import { useGetFriends } from "../features/friends/pages/useFriends";
import LoaderSmall from "./LoaderSmall";
import { getProfileImage } from "../utils/utils";

const ChatInfo = ({ friendId }) => {
  const { friends, isLoading } = useGetFriends();

  if (isLoading) return <LoaderSmall />;

  const friend = friends.find((friend) => friend.id === friendId);

  return (
    <div className="p-8 hidden lg:block min-w-64">
      <div className="flex flex-col items-center">
        <div className="h-24 w-24 rounded-full mx-auto border border-gray-300 overflow-hidden">
          <img
            className="object-fit"
            src={getProfileImage(friend)}
            alt={`Profile image of ${friend.fullName}`}
          />
        </div>
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          {friend.fullName}
        </h3>
        <p className="text-sm text-gray-500">{friend.bio}</p>
        {friend.isOnline ? (
          <p className="text-xs font-medium text-green-900 bg-green-200 rounded-xl w-fit px-4 py-1 mt-2">
            Online
          </p>
        ) : (
          <p className="text-xs font-medium text-rose-900 bg-rose-200 rounded-xl w-fit px-4 py-1 mt-2">
            Offline
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatInfo;
