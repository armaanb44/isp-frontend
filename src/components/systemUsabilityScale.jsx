// src/components/SystemUsabilityScale.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../lib/firebase";
import { logSus } from "../lib/logUtils";

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
  // 🔹 Default all answers to neutral (3)
  const [responses, setResponses] = useState(
    ITEMS.reduce((acc, item) => ({ ...acc, [item.key]: 3 }), {})
  );
  // 🔹 Track which sliders the participant has actually touched
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const nav = useNavigate();

  const handleChange = (key, val) => {
    setResponses((prev) => ({ ...prev, [key]: Number(val) }));
    setTouched((prev) => ({ ...prev, [key]: true }));
  };

  // Technically always true with the default map, but keep it for safety
  const allAnswered = useMemo(
    () =>
      ITEMS.every(
        (item) =>
          typeof responses[item.key] === "number" &&
          responses[item.key] >= 1 &&
          responses[item.key] <= 5
      ),
    [responses]
  );

  const anyTouched = useMemo(
    () => ITEMS.some((item) => touched[item.key]),
    [touched]
  );

  const handleSubmit = async () => {
    if (submitting) return;

    // Safety net (should never fire, but good to keep)
    if (!allAnswered) {
      alert("Please answer all items before submitting.");
      return;
    }

    // If they never touched any slider, special confirmation
    if (!anyTouched) {
      const okNeutral = window.confirm(
        "You left all items at the neutral value (3). " +
          "If this accurately reflects your experience, press OK to submit. " +
          "Otherwise, press Cancel to adjust your responses."
      );
      if (!okNeutral) return;
    } else {
      const ok = window.confirm(
        "Are you sure you want to submit your SUS responses?"
      );
      if (!ok) return;
    }

    setSubmitting(true);

    // 1) Bubble up to parent if needed
    if (typeof onSubmit === "function") {
      try {
        onSubmit(responses);
      } catch (err) {
        console.error("onSubmit handler threw:", err);
      }
    }

    // 2) Log to Firestore
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) {
        console.warn("SUS submit: no authenticated user found.");
      } else {
        await logSus(uid, responses);
      }

      // 3) Move to debrief
      nav("/debrief");
    } catch (err) {
      console.error("🔥 Failed to log SUS responses:", err);
      setSubmitting(false); // allow retry
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
        System Usability Scale (SUS)
      </h2>

      <p style={{ textAlign: "center", marginBottom: "2rem", opacity: 0.8 }}>
        Please indicate how strongly you agree or disagree with each statement.
        <br />
        Scale: <strong>1 = Strongly Disagree</strong> →{" "}
        <strong>5 = Strongly Agree</strong>
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {ITEMS.map((item) => {
          const value = responses[item.key]; // always 1–5, default 3
          return (
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
                  value={value}
                  onChange={(e) => handleChange(item.key, e.target.value)}
                  style={{ width: "65%" }}
                />

                <span style={{ fontSize: "0.85rem", opacity: 0.7 }}>
                  Strongly Agree
                </span>
              </div>

              <div style={{ textAlign: "center", marginTop: "0.4rem" }}>
                <strong>{value}</strong>
              </div>
            </div>
          );
        })}
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
        }}
      >
        {submitting ? "Submitting..." : "Submit SUS Responses"}
      </button>
    </div>
  );
}
