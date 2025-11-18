import { useNavigate, useLocation } from "react-router-dom";

export default function DemoVideoPage() {
  const nav = useNavigate();
  const { state } = useLocation();

  // fallback = chat
  const condition = state?.condition || "chat";

  // Choose correct video for condition
  const videoId =
    condition === "avatar"
      ? "igLvv87zNrU"   // avatar-chat condition video ID
      : "XWP5KBkevoQ";    // chat only condition video ID

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
        {condition === "avatar"
          ? "Avatar + Chat Condition Demonstration"
          : "Chat-Only Condition Demonstration"}
      </h2>

      <p style={{ marginBottom: "1.5rem", lineHeight: 1.55 }}>
        This short video demonstrates how this condition works.
        <br />
        <strong>No participant data is collected in this preview.</strong>
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
          title="Experiment Demonstration"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>

      {/* ---- NEXT STEPS ---- */}
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
            background: condition === "avatar" ? "#111" : "#0066ff",
            color: "#fff",
            padding: "0.9rem",
            borderRadius: "8px",
            border: "none",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Continue to {condition === "avatar" ? "Avatar + Chat" : "Chat-Only"} Condition
        </button>

        <button
          onClick={() => nav("/demo")}
          style={{
            background: "#ccc",
            color: "#000",
            padding: "0.8rem",
            borderRadius: "8px",
            border: "none",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "0.95rem",
            marginTop: "0.5rem",
          }}
        >
          ← Back to Demo Menu
        </button>
      </div>
    </div>
  );
}
