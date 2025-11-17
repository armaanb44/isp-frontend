// src/components/AvatarChatInterface.jsx
import React from "react";
import Experience from "./Experience";
import ChatInterface from "./ChatInterface";
import "../styles/chat.css";
import "../styles/avatarChat.css";
import { useChat } from "../hooks/useChat";
import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import { Leva } from "leva";


export default function AvatarChatInterface() {
    const { cameraZoomed, setCameraZoomed, audioPlaying} = useChat();
 return (
  <div className="avatar-chat-layout" style={{ display: "flex", height: "100vh", width: "100vw" }}>
    {/* Left: Chat */}
    <div className="chat-pane" style={{ flex: 1, background: "#faaca8", overflow: "auto" }}>
      <ChatInterface />
    </div>

    {/* Right: 3D Avatar */}
    <div
      className="avatar-pane"
      style={{
        flex: 1,
        position: "relative",
        background: "#faaca8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
        < Leva hidden/>
        < Loader />
        <Canvas shadows camera={{ position: [0, 0, 1], fov: 30, near: 1, far: 10000}}>
      <Experience />
       </Canvas>

      {/* Zoom Button Overlay */}
      <button
      disabled={audioPlaying}
        onClick={() => setCameraZoomed((z) => !z)}
        style={{
          position: "absolute",
          right: "30px",
          top: "50%",
          transform: "translateY(-50%)",
          background: cameraZoomed ? "#f87171" : "#4ade80", // red = zoomed, green = normal
          border: "none",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          color: "white",
          fontSize: "14px",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1)")}
      >
        {cameraZoomed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                />
              </svg>
            )}
      </button>
    </div>
  </div>
);
}