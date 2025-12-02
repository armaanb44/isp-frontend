// src/demo/DemoLanding.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DemoLanding() {
  const nav = useNavigate();

  useEffect(() => {
    // 🔹 1) Randomly assign condition
    const assigned =
      Math.random() < 0.5 ? "chat" : "avatar";

    // 🔹 2) Persist for later use (e.g. ChatInterface + Firestore)
    sessionStorage.setItem("assignedCondition", assigned);

    // 🔹 3) Redirect straight to the intro video page
    nav("/demo-video", {
      replace: true,
      state: { condition: assigned },
    });
  }, [nav]);

  // Simple "setting up" screen in case there's a brief delay
  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "50px auto",
        padding: "2rem",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        fontFamily: "Inter, sans-serif",
        color: "#000",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "1rem", fontSize: "1.7rem" }}>
        Setting up your AI teammate…
      </h2>
      <p style={{ lineHeight: 1.55 }}>
        You’ll now see a brief introduction to the interface you&apos;ll use
        to work with your AI teammate on the puzzles.
      </p>
    </div>
  );
}
