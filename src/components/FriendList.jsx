import Friend from "./Friend";
import Button from "./Button";
import LoaderSmall from "./LoaderSmall";

import {
  useGetFriends,
  useRemoveFriend,
} from "../features/friends/pages/useFriends";

const FriendList = () => {
  const { friends, isLoading } = useGetFriends();
  const { removeFriend } = useRemoveFriend();

  return (
    <div className="bg-white mt-8 max-w-7xl mx-auto">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-medium text-gray-900">Friend List</h2>
      </div>

      <div className="p-6">
        {isLoading && <LoaderSmall />}
        {!isLoading && friends.length === 0 && (
          <h3 className="text-sm font-medium text-gray-900">
            No friends found
          </h3>
        )}

        {!isLoading && friends.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className="relative flex flex-col sm:flex-row items-center justify-between space-x-3 border border-gray-300 bg-white px-6 py-5 hover:border-brand-500"
              >
                <Friend info={friend} />
                <div className="w-full sm:w-24 mt-4 sm:mt-0">
                  <Button
                    variant="danger"
                    onClick={() => removeFriend(friend.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendList;
