import { useContext } from "react";
import { MessageCircle, ChevronLeft } from "lucide-react";
import ChatForm from "./ChatForm";
import ChatInfo from "./ChatInfo";
import { useGetFriends } from "../features/friends/pages/useFriends";
import LoaderSmall from "./LoaderSmall";
import { getProfileImage } from "../utils/utils";

import { ChatContext } from "../features/chat/pages/chatContext";
import ChatMessages from "./ChatMessages";

import { setChatActive } from "../features/chat/pages/chatActions";

const ChatInterface = () => {
  const { chatState, chatDispatch } = useContext(ChatContext);
  const { friends, isLoading } = useGetFriends();

  if (isLoading) return <LoaderSmall />;

  const friend = friends.find((friend) => friend.id === chatState.activeChatId);

  return (
    <>
      <div
        className={`relative flex-1 md:border-x border-gray-300 md:flex flex-col ${
          chatState.activeChatId ? "flex" : "hidden"
        }`}
      >
        {friend && (
          <div className=" w-full flex items-center border-b border-gray-300 py-2 px-4 gap-2 md:hidden">
            <button onClick={() => chatDispatch(setChatActive(null))}>
              <ChevronLeft size={32} className="text-gray-500" />
            </button>
            <img
              className="h-10 w-10 rounded-full border border-gray-300"
              src={getProfileImage(friend)}
              alt={`Profile image of ${friend.fullName}`}
            />
            <h3 className="text-lg mt-1 font-medium text-gray-900">
              {friend.fullName}
            </h3>
          </div>
        )}

        {!chatState.activeChatId && (
          <div className="flex flex-col justify-center items-center h-full">
            <MessageCircle
              stroke="#20c997"
              size={52}
              className="animate-bounce"
            />
            <p className="text-gray-500 mt-2 font-medium">Start chatting</p>
          </div>
        )}

        {chatState.activeChatId && (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              <ChatMessages friendId={chatState.activeChatId} />
            </div>
            <div className="border-t border-gray-200 px-6 py-4">
              <ChatForm friendId={chatState.activeChatId} />
            </div>
          </>
        )}
      </div>
      {chatState.activeChatId && <ChatInfo friendId={chatState.activeChatId} />}
    </>
  );
};

export default ChatInterface;
