import { useEffect } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatMessages({ messages, logo, bottomRef }) {
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, bottomRef]);

  return (
    <div
      className="
        flex-1
        min-h-0
        overflow-y-auto
        p-4
        space-y-4
      "
    >
      {messages.map((msg, index) => (
        <MessageBubble key={msg.id || index} message={msg} logo={logo} />
      ))}

      <div ref={bottomRef} />
    </div>
  );
}
