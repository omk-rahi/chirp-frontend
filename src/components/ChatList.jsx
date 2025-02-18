import { useContext, useEffect, useState } from "react";
import { useGetFriends } from "../features/friends/pages/useFriends";
import ChatFriend from "./ChatFriend";
import LoaderSmall from "./LoaderSmall";
import { ChatContext } from "../features/chat/pages/chatContext";

const ChatList = () => {
  const { friends, isLoading } = useGetFriends();
  const { chatState } = useContext(ChatContext);
  const [query, setQuery] = useState("");
  const [filteredFriends, setFilteredFriends] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      if (query) {
        setFilteredFriends(
          friends.filter((friend) =>
            friend.fullName.toLowerCase().includes(query.toLowerCase())
          )
        );
      } else {
        setFilteredFriends(friends);
      }
    }
  }, [friends, isLoading, query]);

  return (
    <div
      className={`py-2 w-full md:block md:w-fit ${
        chatState.activeChatId && "hidden"
      }`}
    >
      <div className="px-4 border-b border-gray-100 pb-4">
        <input
          className="mt-1 px-4 py-2 block border border-gray-300 w-full focus:ring-2 focus:ring-brand-500 focus:outline-0"
          placeholder="Search friends..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="py-4">
        {isLoading && <LoaderSmall />}
        {!isLoading && friends.length === 0 && (
          <h3 className="text-sm font-medium text-gray-900 mx-4">
            Add new Friends to chat
          </h3>
        )}

        {!isLoading && filteredFriends.length > 0 && (
          <>
            <span className="px-4 text-sm text-gray-500 font-medium block pb-2">
              Recent chats
            </span>
            <div className="space-y-2">
              {filteredFriends.map((friend) => (
                <ChatFriend key={friend.id} info={friend} />
              ))}
            </div>
          </>
        )}

        {!isLoading && filteredFriends.length === 0 && query && (
          <h3 className="text-sm font-medium text-gray-900 mx-4">
            No friends found
          </h3>
        )}
      </div>
    </div>
  );
};

export default ChatList;
