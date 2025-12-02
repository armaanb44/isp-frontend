// src/demo/DemoVideoPage.jsx
import { useNavigate, useLocation } from "react-router-dom";

export default function DemoVideoPage() {
  const nav = useNavigate();
  const { state } = useLocation();

  // Try route state first, then sessionStorage, fallback to "chat"
  const storedCondition =
    typeof window !== "undefined"
      ? sessionStorage.getItem("assignedCondition")
      : null;

  const condition = state?.condition || storedCondition || "chat";

  // Choose correct video for condition (hidden from participant)
  const videoId =
    condition === "avatar"
      ? "igLvv87zNrU" // avatar + chat demo
      : "XWP5KBkevoQ"; // chat-only demo

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "2rem",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
        fontFamily: "Inter, sans-serif",
        textAlign: "center",
        color: "#000",
      }}
    >
      <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        Experiment Interface Introduction
      </h2>

      <p style={{ marginBottom: "1.5rem", lineHeight: 1.55 }}>
        This short video shows the interface you&apos;ll use to work with your AI
        teammate during the puzzle task.
        <br />
        After watching, you&apos;ll continue directly to the experiment.
      </p>

      {/* ---- EMBED VIDEO ---- */}
      <div
        style={{
          width: "100%",
          aspectRatio: "16 / 9",
          marginBottom: "2rem",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
        }}
      >
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Experiment Interface Introduction"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>

      {/* ---- CONTINUE TO TASK ---- */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "350px",
          margin: "0 auto",
        }}
      >
        <button
          onClick={() =>
            nav(condition === "avatar" ? "/avatar-chat" : "/chat")
          }
          style={{
            background: "#0066ff",
            color: "#fff",
            padding: "0.9rem",
            borderRadius: "8px",
            border: "none",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Continue to puzzle task
        </button>
      </div>
    </div>
  );
}
