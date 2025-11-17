import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ConsentForm() {
  const nav = useNavigate();
  const [checked, setChecked] = useState(false);

  return (
    <div
      className="container"
      style={{
        maxWidth: "800px",
        margin: "2rem auto",
        lineHeight: "1.6",
        color: "#000",
        opacity: 1, // ensure full opacity
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#e4e4e4ff" }}>
        Participant Information and Consent Form
      </h1>

      <div
        className="card"
        style={{
          padding: "2rem",
          borderRadius: "12px",
          background: "#f9f9f9",
          color: "#000",
          opacity: 1,
        }}
      >
        <h2 style={{ color: "#000" }}>Study Title</h2>
        <p style={{ color: "#000" }}>
          <strong>Embodied AI Companions and Cooperative Problem Solving:</strong> A Study on Social
          Presence and Cognitive Engagement
        </p>

        <h3 style={{ color: "#000" }}>Researcher</h3>
        <p style={{ color: "#000" }}>
          <strong>Armaan Boparai</strong> – MSc Applied Neuroscience, King’s College London
          <br />
          Supervisor: <strong>Dr. Kulbir Birak</strong>
        </p>

        <h3 style={{ color: "#000" }}>1. Purpose of the Study</h3>
        <p style={{ color: "#000" }}>
          You are invited to take part in a research study exploring how people interact with AI
          companions during problem-solving tasks. The study examines whether interacting with an AI
          presented as a 3D avatar, compared to text-only, influences engagement, cooperation, and
          perceived social presence.
        </p>

        <h3 style={{ color: "#000" }}>2. What Participation Involves</h3>
        <ul style={{ color: "#000" }}>
          <li>You will complete a short (8min), browser-based cooperative puzzle task with an AI companion.</li>
          <li>The session lasts around 15-20 minutes in total, including a short questionnaire afterward.</li>
          <li>You will be randomly assigned to one of two versions of the AI interface:</li>
          <ul>
            <li>Text-only AI</li>
            <li>Text + 3D avatar AI</li>
          </ul>
          <li>The AI will communicate naturally, provide hints, and collaborate to solve puzzles.</li>
          <li>All interactions (messages, timestamps, hints used, completion times) are logged anonymously.</li>
          <li>After the task, you will answer brief questions about your experience.</li>
        </ul>

        <h3 style={{ color: "#000" }}>3. Voluntary Participation and Withdrawal</h3>
        <p style={{ color: "#000" }}>
          Participation is entirely voluntary. You may withdraw at any time before submitting the questionnaire,
          without giving a reason. Because all data are anonymized at source, once submitted, your data cannot be
          identified or withdrawn.
        </p>

        <h3 style={{ color: "#000" }}>4. Risks and Benefits</h3>
        <p style={{ color: "#000" }}>
          This study poses minimal risk. The puzzles are designed to be engaging but not stressful. There are no
          direct benefits to you, but your participation will help improve the design of future AI learning and
          support systems.
        </p>

        <h3 style={{ color: "#000" }}>5. Data Protection and Confidentiality</h3>
        <ul style={{ color: "#000" }}>
          <li>No identifying information (name, email, IP address) is collected.</li>
          <li>
            Data are stored securely in an encrypted Firebase database in compliance with UK GDPR and King’s College
            London Data Protection Policy.
          </li>
          <li>Only the researcher and supervisor will have access to anonymized data.</li>
          <li>Results will be reported only in aggregate form; no individual responses will be identifiable.</li>
        </ul>

        <h3 style={{ color: "#000" }}>6. Ethics Approval</h3>
        <p>*PENDING ETHICS APPROVAL*</p>
        {/*<p style={{ color: "#000" }}>
          This study has been reviewed and approved under the Minimal Risk Research Ethics Checklist by the Department
          of Psychology, King’s College London.
        </p>*/}

        <h3 style={{ color: "#000" }}>7. Contact for Questions or Concerns</h3>
        <p style={{ color: "#000" }}>
          If you have questions about the study, please contact:
          <br />
          📧 <a href="mailto:armaan.boparai@kcl.ac.uk">armaan.boparai@kcl.ac.uk</a>
          <br />
          <br />
          If you have concerns about your rights as a participant, contact the King’s College London Research Ethics
          Office at:
          <br />
          📧 <a href="mailto:rec@kcl.ac.uk">rec@kcl.ac.uk</a>
        </p>

        <h3 style={{ color: "#000" }}>8. Consent Statement</h3>
        <p style={{ color: "#000" }}>By checking the box below, you confirm that:</p>
        <ul style={{ color: "#000" }}>
          <li>You have read and understood the information above.</li>
          <li>You are at least 18 years old.</li>
          <li>You understand your participation is voluntary and anonymous.</li>
          <li>You agree to take part in this study.</li>
        </ul>

        <label style={{ display: "block", marginTop: "1rem", color: "#000" }}>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            style={{ marginRight: "0.5rem" }}
          />
          I consent to participate in this research study.
        </label>

        <button
          disabled={!checked}
          onClick={() => nav("/demo")}
          style={{
            marginTop: "1.5rem",
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            borderRadius: "8px",
            backgroundColor: checked ? "#007bff" : "#ccc",
            color: "#fff",
            border: "none",
            cursor: checked ? "pointer" : "not-allowed",
          }}
        >
          I Consent
        </button>
      </div>
    </div>
  );
}
