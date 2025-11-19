import { useNavigate } from "react-router-dom";

export default function Debrief() {
  const nav = useNavigate();

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
        Debrief Form
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
          <strong>Embodied AI Companions and Cooperative Problem Solving:</strong>{" "}
          A Study on Social Presence and Cognitive Engagement
        </p>

        <h3 style={{ color: "#000" }}>Thank You for Participating</h3>
        <p style={{ color: "#000" }}>
          Thank you for taking part in this research. Your contribution is highly
          valued and will help us better understand how people interact with AI
          companions during problem-solving tasks.
        </p>

        <h3 style={{ color: "#000" }}>What This Study Examined</h3>
        <p style={{ color: "#000" }}>
          This study explored how the presentation of an AI companion—either
          text-only or as a 3D-animated avatar—affects engagement, cooperation,
          and perceived social presence during a shared puzzle-solving task.
          Participants were randomly assigned to one of the two interface
          versions to allow for fair comparison.
        </p>

        <h3 style={{ color: "#000" }}>Why Some Details Were Brief at the Start</h3>
        <p style={{ color: "#000" }}>
          To ensure genuine and unbiased responses, certain design elements
          (such as the existence of two versions of the AI interface) were not
          fully highlighted before the task. No deception was used; the AI you
          interacted with responded in real time.
        </p>

        <h3 style={{ color: "#000" }}>What Data Was Collected</h3>
        <ul style={{ color: "#000" }}>
          <li>Messages exchanged with the AI</li>
          <li>Timestamps and puzzle completion progress</li>
          <li>Hint usage and puzzle timings</li>
          <li>Responses to the post-study questionnaire</li>
        </ul>
        <p style={{ color: "#000" }}>
          All data were collected <strong>anonymously</strong>. No names, emails,
          IP addresses, or identifiable information were stored.
        </p>

        <h3 style={{ color: "#000" }}>Data Storage and Use</h3>
        <p style={{ color: "#000" }}>
          Your data is stored anonymously in a{" "}
          <strong>GDPR-compliant, fully encrypted Firebase database</strong>.
          Only the researcher (Armaan Boparai) and the supervisor (Dr. Kulbir
          Birak) have access to the anonymized dataset. Results will be reported
          only in aggregated form.
        </p>
        <p style={{ color: "#000" }}>
          Because your data is fully anonymized, it cannot be linked to you and
          therefore cannot be withdrawn after submission.
        </p>

        <h3 style={{ color: "#000" }}>Potential Benefits</h3>
        <p style={{ color: "#000" }}>
          While there were no direct personal benefits from participating, your
          involvement helps advance research on human–AI interaction and the
          design of supportive AI companions for learning and cognitive tasks.
        </p>

        <h3 style={{ color: "#000" }}>If You Felt Any Discomfort</h3>
        <p style={{ color: "#000" }}>
          The puzzles were designed to be engaging rather than stressful.
          However, if you experienced any frustration or discomfort, this is
          normal and temporary.
        </p>

        <h3 style={{ color: "#000" }}>Contact Information</h3>
        <p style={{ color: "#000" }}>
          For study-related questions:
          <br />
          📧{" "}
          <a href="mailto:armaan.boparai@kcl.ac.uk">
            armaan.boparai@kcl.ac.uk
          </a>
          <br />
          <br />
          Supervisor: <strong>Dr. Kulbir Birak</strong>
          <br />
          📧{" "}
          <a href="mailto:kulbir.birak@kcl.ac.uk">kulbir.birak@kcl.ac.uk</a>
          <br />
          <br />
          For concerns about your rights as a participant:
          <br />
          📧 <a href="mailto:rec@kcl.ac.uk">rec@kcl.ac.uk</a>
        </p>

        <h3 style={{ color: "#000" }}>Request a Summary of Findings</h3>
        <p style={{ color: "#000" }}>
          If you would like a summary of the study results once the research is
          complete, you may email the researcher at the address above.
        </p>

        <h3 style={{ color: "#000" }}>Thank You</h3>
        <p style={{ color: "#000" }}>
          Thank you again for your time and participation. Your contribution
          directly supports ongoing research in human–AI collaboration.
        </p>

        <button
          onClick={() => nav("/")}
          style={{
            marginTop: "1.5rem",
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            borderRadius: "8px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Finish
        </button>
      </div>
    </div>
  );
}
