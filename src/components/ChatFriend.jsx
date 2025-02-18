import { useContext } from "react";
import { ChatContext } from "../features/chat/pages/chatContext";
import { setChatActive } from "../features/chat/pages/chatActions";

import { getProfileImage } from "../utils/utils";

const ChatFriend = ({ info }) => {
  const { chatState, chatDispatch } = useContext(ChatContext);

  return (
    <div
      className={`flex items-center px-3 py-3 hover:bg-gray-50 cursor-pointer ${
        chatState.activeChatId === info.id ? "bg-gray-50" : "bg-white"
      }`}
      onClick={() => chatDispatch(setChatActive(info.id))}
    >
      <div className="relative">
        <img
          className="h-10 w-10 rounded-full"
          src={getProfileImage(info)}
          alt={`Profile image of ${info.fullName}`}
        />
        {info.isOnline ? (
          <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-green-400"></span>
        ) : (
          <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-gray-200"></span>
        )}
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900">{info.fullName}</p>
        {info.isOnline ? (
          <p className="text-xs text-gray-500">Online</p>
        ) : (
          <p className="text-xs text-gray-500">Offline</p>
        )}
      </div>
    </div>
  );
};

export default ChatFriend;
