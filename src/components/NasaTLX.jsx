import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../lib/firebase";
import { logNasaTlx } from "../lib/logUtils";

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

  const [submitting, setSubmitting] = useState(false);
  const nav = useNavigate();

  const handleChange = (key, value) => {
    setScores((s) => ({ ...s, [key]: parseInt(value, 10) }));
  };

  const handleSubmit = async () => {
    if (submitting) return;

    // Optional: confirm submission
    const ok = window.confirm(
      "Are you sure you want to submit your workload ratings?"
    );
    if (!ok) return;

    const allDefault = Object.values(scores).every((v) => v === 10);
if (allDefault) {
  const proceed = window.confirm(
    "All sliders are still at the default value (10). Are you sure you want to submit?"
  );
  if (!proceed) return;
}


    setSubmitting(true);

    // 1) Let parent collect scores in local state if it wants
    if (typeof onSubmit === "function") {
      try {
        onSubmit(scores);
      } catch (err) {
        console.error("onSubmit handler threw:", err);
      }
    }

    // 2) Log to Firestore under this participant
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) {
        console.warn("NASA-TLX submit: no authenticated user found");
      } else {
        await logNasaTlx(uid, scores);
      }

      // 3) Move to the next questionnaire (Networked Minds / NMS)
      nav("/nms");
    } catch (err) {
      console.error("🔥 Failed to log NASA-TLX to Firestore:", err);
      // allow retry
      setSubmitting(false);
    }
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
        Please rate your experience for each scale by selecting a value between{" "}
        <strong>0 (Very Low)</strong> and <strong>20 (Very High)</strong>.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {DIMENSIONS.map((d) => (
          <div key={d.key} style={{ width: "100%" }}>
            <label style={{ fontWeight: 600 }}>
              {d.label}
            </label>
            <p
              style={{
                fontSize: "0.9rem",
                opacity: 0.75,
                margin: "0.3rem 0 1rem",
              }}
            >
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
        disabled={submitting}
        style={{
          marginTop: "2.5rem",
          width: "100%",
          padding: "1rem",
          background: submitting ? "#999" : "#0066ff",
          color: "#fff",
          fontWeight: "600",
          borderRadius: "8px",
          border: "none",
          cursor: submitting ? "not-allowed" : "pointer",
          fontSize: "1rem",
          transition: "background 0.2s ease",
        }}
      >
        {submitting ? "Submitting..." : "Submit Responses"}
      </button>
    </div>
  );
}
