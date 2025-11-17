// src/components/NetworkedMinds.jsx
import React, { use, useState } from "react";
import { useNavigate } from "react-router-dom";

const SCALE = [1, 2, 3, 4, 5, 6, 7];

const SECTIONS = [
  {
    title: "SECTION A — Co-Presence",
    items: [
      "I often felt as if the AI partner and I were in the same space together.",
      "I was often aware of the AI partner.",
      "I hardly noticed the AI partner. (reverse)",
      "I often felt as if we were in different places rather than together. (reverse)",
      "I think the AI partner often felt as if we were in the same place.",
      "The AI partner seemed aware of me.",
      "The AI partner didn’t notice me. (reverse)",
      "I think the AI partner felt as if we were in different places. (reverse)",
    ],
  },
  {
    title: "SECTION B — Psychological Engagement",
    subtitle: "Perceived Attention",
    items: [
      "I paid close attention to the AI partner.",
      "I was easily distracted from the AI partner. (reverse)",
      "I tended to ignore the AI partner. (reverse)",
      "The AI partner paid close attention to me.",
      "The AI partner seemed easily distracted from me. (reverse)",
      "The AI partner tended to ignore me. (reverse)",
    ],
  },
  {
    title: "SECTION B — Psychological Engagement",
    subtitle: "Emotional Contagion",
    items: [
      "I was sometimes influenced by the AI partner’s moods.",
      "When the AI partner was happy, I tended to feel happy.",
      "When the AI partner seemed sad, I tended to feel down.",
      "When the AI partner was nervous, I tended to feel nervous.",
      "The AI partner seemed influenced by my moods.",
      "When I was happy, the AI partner seemed happy.",
      "When I felt sad, the AI partner seemed down.",
      "When I was nervous, the AI partner seemed nervous.",
    ],
  },
  {
    title: "SECTION B — Psychological Engagement",
    subtitle: "Perceived Comprehension",
    items: [
      "I was able to communicate my intentions clearly to the AI partner.",
      "The AI partner was able to communicate intentions clearly to me.",
      "My thoughts were clear to the AI partner.",
      "The AI partner’s thoughts were clear to me.",
      "I was able to understand what the AI partner meant.",
      "The AI partner was able to understand what I meant.",
    ],
  },
  {
    title: "SECTION C — Behavioral Interdependence",
    items: [
      "My actions were often dependent on the AI partner’s actions.",
      "My behavior was often a direct response to the AI partner’s behavior.",
      "What I did often affected what the AI partner did.",
      "The AI partner’s actions were dependent on mine.",
      "The AI partner’s behavior was a direct response to mine.",
      "What the AI partner did often affected what I did.",
    ],
  },
];

export default function NetworkedMinds() {
  const [responses, setResponses] = useState({});
  const nav = useNavigate();

  const handleChange = (index, value) => {
    setResponses({ ...responses, [index]: value });
  };

  let globalIdx = 0;

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "2rem",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
        fontFamily: "Inter, sans-serif",
        color: "#000",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
        Networked Minds Social Presence Inventory (NMSPI)
      </h2>

      <p style={{ marginBottom: "1.5rem", fontSize: "0.95rem" }}>
        For each statement, choose the number that best reflects your
        experience interacting with the AI partner.
        <br />
        <strong>1 = Strongly Disagree &nbsp;&nbsp; 7 = Strongly Agree</strong>
      </p>

      {SECTIONS.map((sec, secIndex) => (
        <div key={secIndex} style={{ marginBottom: "2.5rem" }}>
          <h3 style={{ marginBottom: "0.5rem" }}>{sec.title}</h3>

          {sec.subtitle && (
            <h4 style={{ marginTop: "0.5rem", color: "#444" }}>
              {sec.subtitle}
            </h4>
          )}

          <table style={{ width: "100%", marginTop: "1rem" }}>
            <tbody>
              {sec.items.map((text, itemIndex) => {
                const idx = globalIdx++;
                return (
                  <tr
                    key={idx}
                    style={{ borderBottom: "1px solid #eee", height: "60px" }}
                  >
                    <td style={{ width: "60%", paddingRight: "1rem" }}>
                      {text}
                    </td>
                    <td style={{ width: "40%", textAlign: "center" }}>
                      {SCALE.map((num) => (
                        <label key={num} style={{ margin: "0 6px" }}>
                          <input
                            type="radio"
                            name={`q_${idx}`}
                            value={num}
                            checked={responses[idx] === String(num)}
                            onChange={(e) =>
                              handleChange(idx, e.target.value)
                            }
                          />
                          <span style={{ marginLeft: "2px" }}>{num}</span>
                        </label>
                      ))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}

    <button
  onClick={() => {
    console.log("NMSPI responses:", responses);
    nav("/godspeed");
  }}
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
