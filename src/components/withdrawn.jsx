// src/components/Withdrawn.jsx
import { useNavigate } from "react-router-dom";

export default function Withdrawn() {
  const nav = useNavigate();

  return (
    <div className="container">
      <div
        className="card"
        style={{
          maxWidth: "700px",
          margin: "40px auto",
          padding: "2rem",
        }}
      >
        <h2 style={{ marginBottom: "1rem", textAlign: "center" }}>
          You Have Withdrawn from the Study
        </h2>

        <p style={{ marginBottom: "1rem", lineHeight: 1.5 }}>
          Your session has now ended in line with your decision to stop the experiment.
        </p>

        <p style={{ marginBottom: "1rem", lineHeight: 1.5 }}>
          Any data collected so far will be handled according to the study’s withdrawal
          and data management procedures described in the information sheet.
        </p>

      

        <button
          onClick={() => nav("/")}
          style={{
            width: "100%",
            padding: "0.9rem 1.2rem",
            background: "#0066ff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Return to Study Information Page
        </button>
      </div>
    </div>
  );
}
