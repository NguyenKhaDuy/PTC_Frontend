import { MessageSquarePlus, Clock3, Trash2 } from "lucide-react";

export default function ChatHistory({
  chats,
  currentChatId,
  setCurrentChatId,
  newChat,
  show,
  onClose,
  setChats,
}) {
  const deleteChat = (id) => {
    setChats((prev) => {
      const updated = prev.filter((c) => c.id !== id);

      if (id === currentChatId && updated.length > 0) {
        setCurrentChatId(updated[0].id);
      }

      return updated;
    });
  };

  return (
    <>
      {show && (
        <div onClick={onClose} className="absolute inset-0 bg-black/40 z-20" />
      )}

      <div
        className={`
        absolute left-0 top-0 h-full w-72
        bg-[#181818]
        border-r border-[#2d2d2d]
        z-30
        transition-transform duration-300
        ${show ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* NEW CHAT */}
        <div className="p-4 border-b border-[#2d2d2d]">
          <button
            onClick={newChat}
            className="
            w-full flex items-center justify-center gap-2
            rounded-xl py-3
            bg-[#AA7D36] hover:bg-[#8b652d]
            font-medium"
          >
            <MessageSquarePlus size={18} />
            Cuộc trò chuyện mới
          </button>
        </div>

        {/* LIST */}
        <div className="overflow-y-auto h-[calc(100%-85px)] p-3 space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`
                flex items-center gap-2
                rounded-xl px-3 py-3
                transition
                ${
                  currentChatId === chat.id
                    ? "bg-[#AA7D36] text-white"
                    : "hover:bg-[#242424]"
                }
              `}
            >
              {/* CHAT CLICK AREA */}
              <button
                onClick={() => {
                  setCurrentChatId(chat.id);
                  onClose();
                }}
                className="flex items-start gap-3 flex-1 min-w-0"
              >
                <Clock3 size={16} className="shrink-0 mt-1" />

                <div className="min-w-0">
                  <p className="truncate font-medium">{chat.title}</p>

                  <p className="text-xs text-gray-400 truncate">
                    {chat.messages.at(-1)?.text}
                  </p>
                </div>
              </button>

              {/* DELETE BUTTON - ALWAYS VISIBLE */}
              <button
                onClick={() => deleteChat(chat.id)}
                className="
    shrink-0
    p-2
    rounded-lg
    bg-black/20
    text-white
    hover:bg-red-500
    hover:text-white
    hover:scale-105
    transition
    backdrop-blur
  "
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
