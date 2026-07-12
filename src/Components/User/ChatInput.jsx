import { SendHorizonal, Sparkles } from "lucide-react";

export default function ChatInput({ input, setInput, sendMessage, loading }) {
  const handleKeyDown = (e) => {
    // Enter gửi tin nhắn
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="border-t border-[#2d2d2d] bg-[#151515] p-4">
      <div className="flex items-end gap-3">
        <textarea
          rows={1}
          value={input}
          disabled={loading}
          placeholder="Nhập tin nhắn cho CmcAI..."
          onChange={(e) => {
            setInput(e.target.value);

            // Auto height
            e.target.style.height = "auto";
            e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
          }}
          onKeyDown={handleKeyDown}
          className="
            flex-1
            resize-none
            overflow-y-auto
            max-h-[120px]
            rounded-2xl
            bg-[#242424]
            border border-[#333]
            px-4
            py-3
            text-white
            placeholder:text-gray-500
            outline-none
            focus:border-[#AA7D36]
            disabled:opacity-60
          "
        />

        <button
          disabled={loading || !input.trim()}
          onClick={sendMessage}
          className={`
            w-12
            h-12
            rounded-2xl
            flex
            items-center
            justify-center
            transition-all
            ${
              loading || !input.trim()
                ? "bg-[#333] text-gray-500 cursor-not-allowed"
                : "bg-[#AA7D36] hover:bg-[#91692f] text-white"
            }
          `}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <SendHorizonal size={20} />
          )}
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-[#AA7D36]" />
          <span>Powered by CmcAI</span>
        </div>

        <span>Enter để gửi • Shift + Enter xuống dòng</span>
      </div>
    </div>
  );
}
