import { Paperclip, Send, X } from "lucide-react";
import Button from "./Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage as sendMessageApi } from "../api/messagesApi";
import toast from "react-hot-toast";
import { useContext, useState } from "react";

import { SocketContext } from "../socket/SocketContext";

const ChatForm = ({ friendId }) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");

  const { socketState } = useContext(SocketContext);

  const queryClient = useQueryClient();

  const { mutate: sendMessage } = useMutation({
    mutationFn: sendMessageApi,

    onSuccess: ({ data }) => {
      queryClient.invalidateQueries(["messages"]);
      if (socketState.socket) {
        socketState.socket.emit("sendMessage", {
          receiver: data.message.receiver,
          sender: data.message.receiver,
        });
      }
    },
    onError: () => {
      toast.error("Error sending message. Please try again");
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (image || message) {
      const data = new FormData();
      data.append("receiverId", friendId);
      data.append("message", message);
      data.append("image", image);

      sendMessage(data);

      setMessage("");
      setImage("");
    }
  };

  return (
    <form
      className="flex items-center gap-3 relative w-full"
      onSubmit={handleSendMessage}
    >
      {image && (
        <div className=" absolute w-24 h-24 top-[-200%] left-[-5%] shadow-2xl">
          <button
            className=" absolute z-10 bg-white right-0 rounded-full p-0.5 m-0.5 mt-1 mr-1 cursor-pointer"
            onClick={() => setImage(null)}
          >
            <X size={18} />
          </button>
          <img
            src={URL.createObjectURL(image)}
            className="rounded-sm w-full h-full object-cover "
          />
        </div>
      )}

      <label
        htmlFor="image"
        className="text-gray-400 hover:text-gray-500 cursor-pointer"
      >
        <Paperclip className="size-4 md:size-6" />
      </label>
      <input
        type="file"
        className="hidden"
        id="image"
        accept="image/*"
        onChange={handleImageChange}
      />
      <input
        className="mt-1 px-4 py-2 block border border-gray-300 flex-1 focus:ring-2 focus:ring-brand-500 focus:outline-0 text-xs md:text-base"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="w-14 hidden md:block">
        <Button type="submit">
          <Send size={22} />
        </Button>
      </div>
    </form>
  );
};

export default ChatForm;
