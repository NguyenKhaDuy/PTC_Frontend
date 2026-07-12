import { useEffect, useRef, useState } from "react";
import logo from "../../assets/CMC_LOGO.png";

import FloatingButton from "../../Components/User/FloatingButton";
import ChatMessages from "../../Components/User/ChatMessages";
import QuickActions from "../../Components/User/QuickActions";
import ChatInput from "../../Components/User/ChatInput";
import ChatHistory from "./ChatHistory";
import ChatHeader from "../../Components/User/ChatHeader";

export default function CmcAI() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [loading, setLoading] = useState(false);

  const defaultMessages = [
    {
      sender: "bot",
      text: "👋 Xin chào! Tôi là CmcAI.\nTôi có thể giúp bạn tìm phim, lịch chiếu, rạp và đặt vé.",
    },
  ];

  const [chats, setChats] = useState([
    {
      id: 1,
      title: "Cuộc trò chuyện mới",
      messages: defaultMessages,
    },
  ]);

  const [currentChatId, setCurrentChatId] = useState(1);

  const bottomRef = useRef(null);

  // useEffect(() => {
  //   bottomRef.current?.scrollIntoView({
  //     behavior: "smooth",
  //   });
  // }, [messages]);

  const currentChat = chats.find((chat) => chat.id === currentChatId);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const text = input;
    setInput("");
    setLoading(true);

    const assistantId = Date.now() + "-ai";

    // thêm tin nhắn user
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  id: Date.now(),
                  sender: "user",
                  text,
                },
                {
                  id: assistantId,
                  sender: "bot",
                  text: "",
                  typing: true,
                },
              ],
            }
          : chat,
      ),
    );

    try {
      await streamChat(text, assistantId);
    } catch (e) {
      updateBotMessage(assistantId, e.message || "AI không phản hồi");
    } finally {
      setLoading(false);
    }
  };

  const updateBotMessage = (id, text, typing = false) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id !== currentChatId
          ? chat
          : {
              ...chat,
              messages: chat.messages.map((m) =>
                m.id === id
                  ? {
                      ...m,
                      text,
                      typing,
                    }
                  : m,
              ),
            },
      ),
    );
  };

  const streamChat = async (message, assistantId) => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/api/ai/chat/stream", {
      method: "POST",
      headers: {
        Accept: "text/event-stream",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify({
        message,
        conversationId,
      }),
    });

    if (!response.ok) {
      throw new Error("Không thể kết nối AI");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let buffer = "";
    let aiText = "";

    while (true) {
      const { value, done } = await reader.read();

      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const events = buffer.split("\n\n");

      buffer = events.pop() || "";

      for (const event of events) {
        const lines = event.split("\n");

        let data = "";

        for (const line of lines) {
          if (line.startsWith("data:")) {
            data += line.replace("data:", "").trim();
          }
        }

        if (!data) continue;

        const json = JSON.parse(data);

        handleStreamEvent(json, assistantId, aiText);

        if (json.type === "chunk") {
          aiText += json.content || "";
        }
      }
    }
  };

  const handleStreamEvent = (event, assistantId, currentText) => {
    switch (event.type) {
      case "status":
        setConversationId(event.conversationId);
        break;

      case "chunk":
        updateBotMessage(
          assistantId,
          currentText + (event.content || ""),
          true,
        );
        break;

      case "done":
        setConversationId(event.response.conversationId);

        updateBotMessage(
          assistantId,
          event.response.aiMessage.messageText,
          false,
        );
        break;

      case "error":
        throw new Error(event.error);

      default:
        break;
    }
  };

  const quickQuestions = [
    "🎬 Phim đang chiếu",
    "🎟 Đặt vé",
    "🏢 Rạp gần tôi",
    "⭐ Khuyến mãi",
  ];

  const newChat = () => {
    const id = Date.now();

    setChats((prev) => [
      {
        id,
        title: `Chat ${prev.length + 1}`,
        messages: defaultMessages,
      },
      ...prev,
    ]);

    setCurrentChatId(id);
  };

  return (
    <>
      {!open && <FloatingButton logo={logo} onClick={() => setOpen(true)} />}

      {open && (
        <div
          className="
    fixed bottom-6 right-6
    w-[390px]
    h-[620px]
    bg-[#151515]
    border border-[#2d2d2d]
    rounded-3xl
    shadow-2xl
    flex flex-col
    overflow-hidden
    z-50
  "
        >
          <ChatHistory
            chats={chats}
            currentChatId={currentChatId}
            setCurrentChatId={setCurrentChatId}
            newChat={newChat}
            show={showHistory}
            onClose={() => setShowHistory(false)}
          />

          <div className="flex-1 flex flex-col min-h-0">
            <ChatHeader
              logo={logo}
              onClose={() => setOpen(false)}
              onHistory={() => setShowHistory(true)}
            />

            <ChatMessages
              logo={logo}
              messages={currentChat.messages}
              bottomRef={bottomRef}
            />

            <QuickActions questions={quickQuestions} onSelect={setInput} />

            <ChatInput
              input={input}
              setInput={setInput}
              sendMessage={sendMessage}
              loading={loading}
            />
          </div>
        </div>
      )}
    </>
  );
}
