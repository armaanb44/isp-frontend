// src/demo/DemoLanding.jsx
import { useNavigate } from "react-router-dom";

export default function DemoLanding() {
  const nav = useNavigate();

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
        color: "#000"
      }}
    >
      <h2 style={{ marginBottom: "1rem", fontSize: "1.7rem", textAlign:"center" }}>
        Experiment Interface Preview
      </h2>

      <p style={{ marginBottom: "1.5rem", lineHeight: 1.55 }}>
       This preview allows the ethics committee to view both experimental conditions used in the study.
In the actual experiment, participants are randomly assigned to one of these two conditions.
This preview simply allows the committee to examine each interface separately for review purposes. 
        <br /><br />
        <strong>
          In this preview, all AI responses are generated live so the committee can
  evaluate the interaction style and interface behaviour.  
  However, no participant data is stored or retained, and no research records
  are created during this preview.
        </strong>
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

        <button
  onClick={() =>
    nav("/demo-video", {
      state: { condition: "chat" }
    })
  }
  style={{
    background: "#0066ff",
    color: "white",
    padding: "0.9rem 1.2rem",
    borderRadius: "8px",
    border: "none",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
  }}
>
  View Chat-Only Condition
</button>

<button
  onClick={() =>
    nav("/demo-video", {
      state: { condition: "avatar" }
    })
  }
  style={{
    background: "#111",
    color: "white",
    padding: "0.9rem 1.2rem",
    borderRadius: "8px",
    border: "none",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
  }}
>
  View Avatar + Chat Condition
</button>


      </div>

      
    </div>
  );
}
