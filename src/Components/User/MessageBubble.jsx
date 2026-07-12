import { User } from "lucide-react";

export default function MessageBubble({ message, logo }) {
  const isUser = message.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-[85%]
          rounded-2xl
          px-4
          py-3
          ${isUser ? "bg-[#AA7D36] text-white" : "bg-[#242424] text-white"}
        `}
      >
        <div className="flex gap-3 items-start">
          {isUser ? (
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <User size={18} />
            </div>
          ) : (
            <img
              src={logo}
              alt="logo"
              className="w-8 h-8 object-contain shrink-0"
            />
          )}

          <div
            className="
              flex-1
              text-sm
              leading-6
              whitespace-pre-wrap
              break-words
              break-all
              overflow-hidden
            "
          >
            {message.text}
          </div>
        </div>
      </div>
    </div>
  );
}
