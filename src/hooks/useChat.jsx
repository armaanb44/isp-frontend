// src/hooks/useChat.jsx
import { createContext, useContext, useState, useEffect } from "react";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  // Optional global log (not required for avatar, but might be nice to keep)
  const [messages, setMessages] = useState([]);

  // Queue of assistant messages for the avatar to play
  const [avatarQueue, setAvatarQueue] = useState([]);
  const [currentMessage, setCurrentMessage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [cameraZoomed, setCameraZoomed] = useState(true);




  // OLD generic chat function (can keep for testing if you want)
  const chat = async (message) => {
    if (!message?.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      const assistantMessages = Array.isArray(data.messages)
        ? data.messages
        : [];

      // append to a global log if you want
      setMessages((prev) => [
        ...prev,
        { role: "user", text: message },
        ...assistantMessages,
      ]);

      // also push to avatar queue
      setAvatarQueue((prev) => [...prev, ...assistantMessages]);
    } catch (err) {
      console.error("chat() error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 This is what ChatInterface will call
  const pushAssistantMessages = (assistantMessages) => {
    if (!assistantMessages || !assistantMessages.length) return;
    setAvatarQueue((prev) => [...prev, ...assistantMessages]);
  };

  // Keep currentMessage in sync with the queue
  useEffect(() => {
    if (!currentMessage && avatarQueue.length > 0) {
      setCurrentMessage(avatarQueue[0]);
    }
  }, [avatarQueue, currentMessage]);

  const onMessagePlayed = () => {
    setAvatarQueue((prev) => prev.slice(1));
    setCurrentMessage(null);
  };

  const audioPlaying = !!currentMessage?.audio;


  return (
    <ChatContext.Provider
      value={{
        // generic
        chat,
        messages,
        loading,
        cameraZoomed,
        setCameraZoomed,
        // avatar-specific
        message: currentMessage,
        onMessagePlayed,
        pushAssistantMessages,
        audioPlaying,

      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
