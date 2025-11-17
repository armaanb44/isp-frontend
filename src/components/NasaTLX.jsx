import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



const DIMENSIONS = [
  {
    key: "mental_demand",
    label: "Mental Demand",
    description: "How mentally demanding was the task?",
  },
  {
    key: "physical_demand",
    label: "Physical Demand",
    description: "How physically demanding was the task?",
  },
  {
    key: "temporal_demand",
    label: "Temporal Demand",
    description: "How hurried or rushed was the pace of the task?",
  },
  {
    key: "performance",
    label: "Performance",
    description: "How successful were you in accomplishing the task?",
  },
  {
    key: "effort",
    label: "Effort",
    description: "How hard did you have to work to achieve your level of performance?",
  },
  {
    key: "frustration",
    label: "Frustration",
    description: "How insecure, discouraged, irritated, stressed, or annoyed were you?",
  },
];

export default function NasaTLX({ onSubmit }) {
  const [scores, setScores] = useState({
    mental_demand: 10,
    physical_demand: 10,
    temporal_demand: 10,
    performance: 10,
    effort: 10,
    frustration: 10,
  });

  const nav = useNavigate();

  const handleChange = (key, value) => {
    setScores((s) => ({ ...s, [key]: parseInt(value) }));
  };

  const handleSubmit = () => {
    onSubmit(scores);
    nav("/nms");
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
        NASA-TLX Workload Questionnaire
      </h2>

      <p style={{ textAlign: "center", marginBottom: "2rem", opacity: 0.8 }}>
        Please rate your experience for each scale by selecting a value between  
        <strong>0 (Very Low)</strong> and <strong>20 (Very High)</strong>.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {DIMENSIONS.map((d) => (
          <div key={d.key} style={{ width: "100%" }}>
            <label style={{ fontWeight: 600 }}>
              {d.label}
            </label>
            <p style={{ fontSize: "0.9rem", opacity: 0.75, margin: "0.3rem 0 1rem" }}>
              {d.description}
            </p>

            <input
              type="range"
              min="0"
              max="20"
              value={scores[d.key]}
              onChange={(e) => handleChange(d.key, e.target.value)}
              style={{ width: "100%" }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "0.4rem",
                fontSize: "0.85rem",
                opacity: 0.7,
              }}
            >
              <span>Very Low</span>
              <span>{scores[d.key]}</span>
              <span>Very High</span>
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
        Submit Responses
      </button>
    </div>
  );
}
