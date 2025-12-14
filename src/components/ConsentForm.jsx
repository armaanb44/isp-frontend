import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createParticipantOnConsent } from "../lib/logUtils";
import { ensureAnonAuth } from "../lib/firebase";

export default function ConsentForm() {
  const nav = useNavigate();
  const [checked, setChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleConsent = async () => {
    if (!checked || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await ensureAnonAuth(); // make sure auth.uid exists
      const { id } = await createParticipantOnConsent();

      localStorage.setItem("participantId", id);
      nav("/preTaskQuestionnaire");
    } catch (err) {
      console.error("Failed to create participant on consent:", err);
      setSubmitError(
        "Something went wrong while confirming consent. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  const buttonDisabled = !checked || isSubmitting;

  return (
    <div
      className="container"
      style={{
        maxWidth: "800px",
        margin: "2rem auto",
        lineHeight: "1.6",
        color: "#000",
        opacity: 1,
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          color: "#e4e4e4ff",
        }}
      >
        Participant Consent Form
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
        <h2 style={{ color: "#000" }}>Project Details</h2>
        <p style={{ color: "#000" }}>
          <strong>Title of project:</strong> Embodied AI Companions and
          Cooperative Problem Solving: A Study on Social Presence and Cognitive
          Engagement
          <br />
          <strong>Ethical review reference number:</strong> MRSU-25/26-53480  
          <br />
          <strong>Information Sheet version:</strong> 1.0 – [05/12/2025]
        </p>

        <h3 style={{ color: "#000" }}>Researcher</h3>
        <p style={{ color: "#000" }}>
          <strong>Student researcher:</strong> Armaan Boparai – MSc Applied
          Neuroscience, King’s College London
          <br />
          <strong>Supervisor:</strong> Dr. Kulbir Birak, King’s College London
        </p>

        <h3 style={{ color: "#000" }}> Contact for Questions or Concerns</h3>
        <p style={{ color: "#000" }}>
          If you have questions about the study, please contact:
          <br />
          📧{" "}
          <a href="mailto:armaan.boparai@kcl.ac.uk">
            armaan.boparai@kcl.ac.uk
          </a>
          <br />
          <br />
          If you have concerns about your rights as a participant, or wish to
          raise a complaint, you may contact the King’s College London Research
          Ethics Office:
          <br />
          📧 <a href="mailto:rec@kcl.ac.uk">rec@kcl.ac.uk</a>
        </p>

        <h3 style={{ color: "#000" }}>Consent Form</h3>
        <p style={{ color: "#000" }}>
          Please only continue if you have read and understood the information
          above. By taking part you are confirming that you have read the
          Participant Information Sheet for this project.
        </p>
        <p style={{ color: "#000" }}>By ticking the box below, you confirm that:</p>

        <ul style={{ color: "#000" }}>
          <li>
            <strong>
              I confirm that I have read and understood the Participant
              Information Sheet (version 1.0, dated [05/12/2025]) for the above
              project and that I meet the eligibility criteria.
            </strong>
          </li>
          <li>
            <strong>
              I have had the opportunity to consider the information provided
              and to ask questions, which have been answered to my satisfaction.
            </strong>
          </li>
          <li>
            <strong>
              I understand that I will be interacting with an AI teammate to
              complete a short reasoning task in my web browser.
            </strong>
          </li>
          <li>
            <strong>
              I consent voluntarily to be a participant in this project and
              understand that I can refuse to take part or withdraw at any time
              before submitting my final responses, without giving a reason.
            </strong>
          </li>
          <li>
            <strong>
              I understand that once I have submitted my responses, my data
              will be stored in a form that does not allow me to be identified
              and therefore cannot be withdrawn.
            </strong>
          </li>
          <li>
            <strong>
              I understand that my information will be processed for the
              purposes explained in the Participant Information Sheet and will
              be handled in accordance with UK GDPR, the Data Protection Act
              2018, and King’s College London policies.
            </strong>
          </li>
          <li>
            <strong>
              I understand that my information may be subject to review by
              responsible individuals from King’s College London for monitoring
              and audit purposes.
            </strong>
          </li>
        </ul>

        <label style={{ display: "block", marginTop: "1rem", color: "#000" }}>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            style={{ marginRight: "0.5rem" }}
            disabled={isSubmitting}
          />
          I confirm that I consent to participate in this research project.
        </label>

        {submitError && (
          <div
            style={{
              marginTop: "0.75rem",
              color: "#b00020",
              fontSize: "0.95rem",
            }}
          >
            {submitError}
          </div>
        )}

        <button
          disabled={buttonDisabled}
          onClick={handleConsent}
          style={{
            marginTop: "1.5rem",
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            borderRadius: "8px",
            backgroundColor: buttonDisabled ? "#ccc" : "#007bff",
            color: "#fff",
            border: "none",
            cursor: buttonDisabled ? "not-allowed" : "pointer",
            opacity: isSubmitting ? 0.85 : 1,
          }}
          title={isSubmitting ? "Submitting consent..." : "I Consent"}
        >
          {isSubmitting ? "Submitting consent..." : "I Consent"}
        </button>

        {isSubmitting && (
          <div style={{ marginTop: "0.5rem", fontSize: "0.9rem", opacity: 0.75 }}>
            Creating your participant session…
          </div>
        )}
      </div>
    </div>
  );
}
