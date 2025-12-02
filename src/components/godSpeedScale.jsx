import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../lib/firebase";
import { logGodspeed } from "../lib/logUtils";

export default function GodspeedScale({ onSubmit }) {
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const nav = useNavigate();

  const scales = [
    {
      title: "Anthropomorphism",
      items: [
        ["Fake", "Natural"],
        ["Machinelike", "Humanlike"],
        ["Unconscious", "Conscious"],
        ["Artificial", "Lifelike"],
        ["Moving rigidly", "Moving elegantly"],
      ],
    },
    {
      title: "Animacy",
      items: [
        ["Dead", "Alive"],
        ["Stagnant", "Lively"],
        ["Mechanical", "Organic"],
        ["Artificial", "Lifelike"],
        ["Inert", "Interactive"],
        ["Apathetic", "Responsive"],
      ],
    },
    {
      title: "Likeability",
      items: [
        ["Dislike", "Like"],
        ["Unfriendly", "Friendly"],
        ["Unkind", "Kind"],
        ["Unpleasant", "Pleasant"],
        ["Awful", "Nice"],
      ],
    },
    {
      title: "Perceived Intelligence",
      items: [
        ["Incompetent", "Competent"],
        ["Ignorant", "Knowledgeable"],
        ["Irresponsible", "Responsible"],
        ["Unintelligent", "Intelligent"],
        ["Foolish", "Sensible"],
      ],
    },
    {
      title: "Perceived Safety",
      items: [
        ["Anxious", "Relaxed"],
        ["Calm", "Agitated"],
        ["Still", "Surprised"],
      ],
    },
  ];

  const handleChange = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: Number(value) }));
  };

  // 🔹 Build the full list of keys once (stable across renders)
  const allKeys = useMemo(
    () =>
      scales.flatMap((scale) =>
        scale.items.map((_, itemIndex) => `${scale.title}_${itemIndex}`)
      ),
    [scales]
  );

  const allAnswered = allKeys.every((k) => answers[k] !== undefined);

  const handleSubmit = async () => {
    if (submitting) return;

    if (!allAnswered) {
      alert("Please answer all items before submitting.");
      return;
    }

    const ok = window.confirm(
      "Are you sure you want to submit your responses?"
    );
    if (!ok) return;

    setSubmitting(true);

    // optional: lift state up
    if (typeof onSubmit === "function") {
      try {
        onSubmit(answers);
      } catch (err) {
        console.error("onSubmit handler threw:", err);
      }
    }

    try {
      const uid = auth.currentUser?.uid;
      if (!uid) {
        console.warn("Godspeed: no authenticated user found.");
      } else {
        await logGodspeed(uid, answers);
      }

      // next questionnaire
      nav("/susscale");
    } catch (err) {
      console.error("🔥 Failed to log Godspeed scale:", err);
      setSubmitting(false); // let them retry
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
        Godspeed Questionnaire Series
      </h2>

      <p style={{ textAlign: "center", marginBottom: "2rem", opacity: 0.8 }}>
        Please rate each item using the slider between the opposing adjectives.
        <br />
        <strong>1 = strongly left</strong> &nbsp;|&nbsp;
        <strong>5 = strongly right</strong>
      </p>

      {scales.map((scale, scaleIndex) => (
        <div key={scaleIndex} style={{ marginBottom: "2rem" }}>
          <h3 style={{ marginBottom: "0.8rem", fontWeight: 600 }}>
            {scale.title}
          </h3>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            {scale.items.map(([left, right], itemIndex) => {
              const key = `${scale.title}_${itemIndex}`;

              return (
                <div key={key} style={{ width: "100%" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontWeight: 500,
                      marginBottom: "0.6rem",
                    }}
                  >
                    <span>{left}</span>
                    <span>{right}</span>
                  </div>

                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={answers[key] ?? 3}
                    onChange={(e) => handleChange(key, e.target.value)}
                    style={{ width: "100%" }}
                  />

                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "0.4rem",
                      fontSize: "0.85rem",
                      opacity: 0.7,
                    }}
                  >
                    {answers[key] ?? 3}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

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
        {submitting ? "Submitting..." : "Submit Responses"}
      </button>
    </div>
  );
}
