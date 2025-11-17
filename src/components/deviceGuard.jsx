// src/components/DeviceGuard.jsx
import { useEffect, useState } from "react";

export default function DeviceGuard({ children }) {
  const [allowed, setAllowed] = useState(true);

  useEffect(() => {
    const smallScreen = window.innerWidth < 950;
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (smallScreen || isMobile) {
      setAllowed(false);
    }
  }, []);

  if (allowed) return children;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "#fafafa",
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      fontFamily: "Inter, sans-serif",
      textAlign: "center",
      color: "#000"
    }}>
      <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem", fontWeight: 700 }}>
        Device Not Supported
      </h2>

      <p style={{ maxWidth: "500px", fontSize: "1.1rem", lineHeight: 1.6 }}>
        This study must be completed on a <strong>laptop or desktop computer</strong>
        to ensure consistent timing and audio experience.<br/><br/>
        Mobile phones and tablets are not supported.<br/><br/>
        <strong>Headphones are strongly recommended</strong> for the audio-based version (avatar-chat condition).
      </p>

      <p style={{ marginTop: "2rem", fontSize: "0.95rem", opacity: 0.7 }}>
        Please return using a supported device.
      </p>
    </div>
  );
}
