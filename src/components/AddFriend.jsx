import { useState } from "react";
import Button from "./Button";

import Friend from "./Friend";
import {
  useSearchUser,
  useSendFriendRequest,
} from "../features/friends/pages/useFriends";
import LoaderSmall from "./LoaderSmall";

const AddFriend = () => {
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState(null);

  const { data, isLoading } = useSearchUser(searchTerm);

  const { sendFriendRequest } = useSendFriendRequest();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(query);
  };

  return (
    <div className="bg-white mt-8 max-w-7xl mx-auto">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-medium text-gray-900">Add Friends</h2>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <input
            className="mt-1 px-4 py-2 block border border-gray-300 flex-1 focus:ring-2 focus:ring-brand-500 focus:outline-0 w-full"
            placeholder="Search user..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>

        <div className="mt-6">
          {isLoading && <LoaderSmall />}

          {!isLoading && data?.users?.length === 0 && (
            <h3 className="text-sm font-medium text-gray-900">No user found</h3>
          )}

          {!isLoading && data?.users?.length > 0 && (
            <>
              <h3 className="text-sm font-medium text-gray-900">
                Search Result
              </h3>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {data.users.map((user) => (
                  <div
                    key={user.id}
                    className="relative flex flex-col sm:flex-row items-center justify-between space-x-3 border border-gray-300 bg-white px-6 py-5 hover:border-brand-500"
                  >
                    <Friend info={user} />
                    <div className="w-full sm:w-24 mt-4 sm:mt-0">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          sendFriendRequest(user.id);
                        }}
                      >
                        <Button>Add</Button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddFriend;
