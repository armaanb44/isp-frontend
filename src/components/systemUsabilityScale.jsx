import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ITEMS = [
  { key: 1, text: "I think that I would like to use this system frequently." },
  { key: 2, text: "I found the system unnecessarily complex." },
  { key: 3, text: "I thought the system was easy to use." },
  { key: 4, text: "I think that I would need the support of a technical person to use this system." },
  { key: 5, text: "I found the various functions in this system were well integrated." },
  { key: 6, text: "I thought there was too much inconsistency in this system." },
  { key: 7, text: "I would imagine that most people would learn to use this system very quickly." },
  { key: 8, text: "I found the system very cumbersome to use." },
  { key: 9, text: "I felt very confident using the system." },
  { key: 10, text: "I needed to learn a lot of things before I could get going with this system." },
];

export default function SystemUsabilityScale({ onSubmit }) {
  const [responses, setResponses] = useState(
    ITEMS.reduce((acc, item) => ({ ...acc, [item.key]: 3 }), {}) // default midpoint (3)
  );

  const handleChange = (key, val) => {
    setResponses((prev) => ({ ...prev, [key]: Number(val) }));
  };

  const nav = useNavigate();
  const handleSubmit = () => {
    nav("/debrief"),
    onSubmit(responses);
  };

  

  return (
    <div
      style={{
        maxWidth: "750px",
        margin: "40px auto",
        padding: "2rem",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
        fontFamily: "Inter, sans-serif",
        color: "#000",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "1.3rem" }}>
        System Usability Scale (SUS)
      </h2>

      <p style={{ textAlign: "center", marginBottom: "2rem", opacity: 0.8 }}>
        Please indicate how strongly you agree or disagree with each statement.  
        <br />
        Scale: <strong>1 = Strongly Disagree</strong> → <strong>5 = Strongly Agree</strong>
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {ITEMS.map((item) => (
          <div
            key={item.key}
            style={{
              padding: "1rem",
              borderRadius: "10px",
              background: "#f9f9f9",
              border: "1px solid #e0e0e0",
            }}
          >
            <p style={{ marginBottom: "0.8rem", fontWeight: 600 }}>
              {item.key}. {item.text}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginTop: "0.6rem",
              }}
            >
              <span style={{ fontSize: "0.85rem", opacity: 0.7 }}>
                Strongly Disagree
              </span>

              <input
                type="range"
                min="1"
                max="5"
                value={responses[item.key]}
                onChange={(e) => handleChange(item.key, e.target.value)}
                style={{ width: "65%" }}
              />

              <span style={{ fontSize: "0.85rem", opacity: 0.7 }}>
                Strongly Agree
              </span>
            </div>

            <div style={{ textAlign: "center", marginTop: "0.4rem" }}>
              <strong>{responses[item.key]}</strong>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        style={{
          marginTop: "2.5rem",
          width: "100%",
          padding: "1rem",
          background: "#0066ff",
          color: "#fff",
          fontWeight: "600",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        Submit SUS Responses
      </button>
    </div>
  );
}
