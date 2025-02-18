const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ChatMessage = ({ data, type = "send" }) => {
  return (
    <div
      className={`flex ${type === "send" ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`px-4 py-2 max-w-sm min-w-[200px] rounded-sm ${
          type === "receive" ? "bg-brand-500" : "bg-gray-100"
        }`}
      >
        <div
          className={`text-sm ${
            type === "receive" ? "text-white" : "text-gray-900"
          }`}
        >
          {data.imageUrl && (
            <img
              src={`${backendUrl}/uploads/${data.imageUrl}`}
              className="mt-2 rounded-sm"
            />
          )}

          <span>{data.message}</span>
        </div>
        <span
          className={`text-xs ${
            type === "receive" ? "opacity-80 text-white" : "text-gray-500"
          }`}
        >
          {new Date(data.createdAt).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
