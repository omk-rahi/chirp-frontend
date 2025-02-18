import { useEffect, useRef, useContext } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import ChatMessage from "./ChatMessage";
import { getMessages } from "../api/messagesApi";
import LoaderSmall from "./LoaderSmall";

import { SocketContext } from "../socket/SocketContext";

const ChatMessages = ({ friendId }) => {
  const { socketState } = useContext(SocketContext);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["messages", friendId],
    queryFn: () => getMessages(friendId),
  });

  useEffect(() => {
    if (socketState?.socket) {
      socketState.socket.on("receiveMessage", (data) => {
        queryClient.invalidateQueries(["messages", data.sender]);
      });
    }
  }, [socketState?.socket, queryClient]);

  const end = useRef(null);

  useEffect(() => {
    if (data?.messages?.length && end.current) {
      setTimeout(() => {
        end.current.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  }, [data?.messages]);

  if (isLoading) return <LoaderSmall />;

  return (
    <>
      <div className="space-y-4">
        {data.messages.map((message) => (
          <ChatMessage
            key={message.id}
            data={message}
            type={message.sender === friendId ? "send" : "receive"}
          />
        ))}
      </div>
      <span ref={end}></span>
    </>
  );
};

export default ChatMessages;
