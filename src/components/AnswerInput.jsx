import { useState } from "react";

export default function AnswerInput({ onSend, onSubmitAnswer, disabled = false }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (disabled) return;              // 🚫 block while speaking
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
  };

  return (
    <div
      className="inputRow"
      style={{
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? "none" : "auto",   // 👈 disables clicks cleanly
      }}
    >
      <input
        value={text}
        disabled={disabled}
        onChange={(e) => setText(e.target.value)}
        placeholder={disabled ? "Assistant is speaking..." : "Type a thought or answer..."}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />

      <button
        disabled={disabled || !text.trim()}
        style={{
          backgroundColor:
            disabled || !text.trim() ? "#999" : "#007bff",
          cursor:
            disabled || !text.trim() ? "not-allowed" : "pointer",
        }}
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
}
