import ChatList from "../../../components/ChatList";
import ChatInterface from "../../../components/ChatInterface";

import { ChatProvider } from "./ChatContext";

const ChatDashBoard = () => {
  return (
    <ChatProvider>
      <div className="container mx-auto bg-white flex mt-8 shadow-sm rounded-sm h-[95%]">
        <ChatList />
        <ChatInterface />
      </div>
    </ChatProvider>
  );
};

export default ChatDashBoard;
