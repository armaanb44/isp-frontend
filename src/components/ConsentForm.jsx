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
        opacity: 1,
      }}
    >
      {/* HEADER + PROJECT META (matches KCL template fields) */}
      <h1
        style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          color: "#e4e4e4ff",
        }}
      >
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
        <h2 style={{ color: "#000" }}>Project Details</h2>
        <p style={{ color: "#000" }}>
          <strong>Title of project:</strong> Embodied AI Companions and
          Cooperative Problem Solving: A Study on Social Presence and Cognitive
          Engagement
          <br />
          <strong>Ethical review reference number:</strong> [to be added after
          approval]
          <br />
          <strong>Information Sheet version:</strong> 1.0 – [DD/MM/2025]
        </p>

        <h3 style={{ color: "#000" }}>Researcher</h3>
        <p style={{ color: "#000" }}>
          <strong>Student researcher:</strong> Armaan Boparai – MSc Applied
          Neuroscience, King’s College London
          <br />
          <strong>Supervisor:</strong> Dr. Kulbir Birak, King’s College London
        </p>

        {/* INFORMATION SHEET CONTENT (what participation involves, etc.) */}
        <h3 style={{ color: "#000" }}>1. Purpose of the Study</h3>
        <p style={{ color: "#000" }}>
          You are invited to take part in a research study exploring how people
          interact with an AI teammate during problem-solving tasks. The study
          investigates how aspects of this interaction relate to engagement,
          cooperation, and the feeling of working with a social partner.
        </p>

        <h3 style={{ color: "#000" }}>2. What Participation Involves</h3>
        <ul style={{ color: "#000" }}>
          <li>
            You will complete a short (approximately 8-minute) browser-based
            cooperative puzzle task with an AI teammate.
          </li>
          <li>
            The entire session lasts around 15–20 minutes, including a short
            questionnaire afterward.
          </li>
          <li>
            The AI teammate will appear through an on-screen interface and will
            communicate with you, provide hints, and collaborate with you to
            solve puzzles.
          </li>
          <li>
            Task-related data (e.g. messages, timestamps, hints used, completion
            times) will be stored using a randomly generated participant ID.
          </li>
          <li>
            After the task, you will answer brief questions about your
            experience (e.g. how engaged you felt and how you experienced the
            interaction with the AI).
          </li>
        </ul>

        <h3 style={{ color: "#000" }}>3. Voluntary Participation and Withdrawal</h3>
        <p style={{ color: "#000" }}>
          Participation is entirely voluntary. You may refuse to take part, or
          you may withdraw from the study at any time <strong>before</strong>{" "}
          submitting the final questionnaire, without giving a reason. If you
          choose to withdraw before submission, your data will not be used.
        </p>
        <p style={{ color: "#000" }}>
          Because no names or contact details are collected and your responses
          are stored only under a randomly generated participant ID, once you
          have submitted your responses it will no longer be possible to
          identify or withdraw your individual data.
        </p>

        <h3 style={{ color: "#000" }}>4. Risks and Benefits</h3>
        <p style={{ color: "#000" }}>
          This study poses minimal risk. The puzzles are designed to be
          engaging but not distressing. You may skip any question you do not
          wish to answer and can stop at any point before submitting. There are
          no direct personal benefits, but your participation will help improve
          understanding of how people interact with AI learning and support
          systems.
        </p>

        <h3 style={{ color: "#000" }}>5. Data Protection and Confidentiality</h3>
        <ul style={{ color: "#000" }}>
          <li>
            No direct identifying information (such as your name, email
            address, or social media handle) will be collected.
          </li>
          <li>
            Your data (e.g. age, basic demographic information, puzzle
            performance, and questionnaire responses) will be stored using a
            randomly generated participant ID.
          </li>
          <li>
            Data are stored securely in an encrypted Firebase database in
            compliance with UK data protection law (UK GDPR and the Data
            Protection Act 2018) and King’s College London Data Protection
            Policy.
          </li>
          <li>
            Only the student researcher and project supervisor will have access
            to the pseudonymised research data.
          </li>
          <li>
            Results will be reported only in aggregate form and/or using fully
            anonymised example excerpts; no individual participant will be
            identifiable in any report, dissertation, publication, or
            presentation.
          </li>
          <li>
            Pseudonymised research data will be stored for the period required
            by King’s College London research data policies (normally up to 5
            years after final assessment or publication) and will then be
            securely deleted or fully anonymised.
          </li>
        </ul>

        <h3 style={{ color: "#000" }}>6. Ethics Approval</h3>
        <p style={{ color: "#000" }}>
          This project will only begin once it has received ethical approval
          from the relevant King’s College London Research Ethics Committee.
        </p>

        <h3 style={{ color: "#000" }}>7. Contact for Questions or Concerns</h3>
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

        {/* CONSENT FORM SECTION – MATCHED TO KCL TEMPLATE */}
        <h3 style={{ color: "#000" }}>8. Consent Form</h3>
        <p style={{ color: "#000" }}>
          Please only continue if you have read and understood the information
          above. By taking part you are confirming that you have read the
          Participant Information Sheet for this project.
        </p>
        <p style={{ color: "#000" }}>
          By ticking the box below, you confirm that:
        </p>
        <ul style={{ color: "#000" }}>
          <li>
            <strong>
              I confirm that I have read and understood the Participant
              Information Sheet (version 1.0, dated [DD/MM/2025]) for the above
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

        <label
          style={{ display: "block", marginTop: "1rem", color: "#000" }}
        >
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            style={{ marginRight: "0.5rem" }}
          />
          I confirm that I consent to participate in this research project.
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
