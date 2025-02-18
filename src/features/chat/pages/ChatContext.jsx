import { createContext, useReducer } from "react";

const ChatContext = createContext();

const initialChatState = {
  activeChatId: null,
};

const chatReducer = (state, action) => {
  switch (action.type) {
    case "SET_ACTIVE_CHAT":
      return { ...state, activeChatId: action.payload };
    default:
      return state;
  }
};

const ChatProvider = ({ children }) => {
  const [chatState, chatDispatch] = useReducer(chatReducer, initialChatState);

  return (
    <ChatContext.Provider value={{ chatState, chatDispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
