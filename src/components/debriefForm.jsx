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
          This study explored how the way an AI teammate is presented affects
          engagement, cooperation, and the feeling of “social presence” during a
          shared puzzle task. Specifically, we compared two versions of the AI:
        </p>
        <ul style={{ color: "#000" }}>
          <li>A <strong>text-only</strong> chat interface</li>
          <li>A <strong>text + 3D animated avatar</strong> interface</li>
        </ul>
        <p style={{ color: "#000" }}>
          Each participant was randomly assigned to one of these two versions.
          The puzzles, timing, and underlying AI behaviour were the same in both
          conditions; only the way the AI was presented visually was different.
        </p>

        <h3 style={{ color: "#000" }}>Why This Was Not Fully Explained at the Start</h3>
        <p style={{ color: "#000" }}>
          At the beginning of the study, you were told that you would work with
          an AI teammate to solve puzzles. However, we did <strong>not</strong>{" "}
          explicitly tell you that there were two different versions of the AI
          interface (chat-only vs. avatar + chat), or which one you were in.
        </p>
        <p style={{ color: "#000" }}>
          This is a form of <strong>mild deception by omission</strong> that is
          sometimes used in psychology and human–computer interaction research.
          The reason is that knowing in advance that there are “two different
          conditions” can change how people pay attention, how they evaluate the
          interaction, or how seriously they take the task. By keeping this
          detail hidden until now, we aimed to measure your experience in a more
          natural and unbiased way.
        </p>
        <p style={{ color: "#000" }}>
          Importantly, nothing was hidden from you about the{" "}
          <strong>content</strong> of the task: the puzzles, timings, and the AI
          teammate’s reasoning support were the same across participants. The
          only difference was the way the AI was presented on-screen.
        </p>
        <p style={{ color: "#000" }}>
          Now that the full design has been explained, if learning about this
          procedure causes you any concern or you would like to discuss it
          further, you are very welcome to contact the researcher or supervisor
          using the details below.
        </p>

        <h3 style={{ color: "#000" }}>What Data Was Collected</h3>
        <ul style={{ color: "#000" }}>
          <li>Messages exchanged between you and the AI teammate</li>
          <li>Timestamps and puzzle completion progress</li>
          <li>Number of hints used and puzzle completion times</li>
          <li>Your randomly assigned interface condition (chat-only vs. avatar + chat)</li>
          <li>Responses to the post-study questionnaires</li>
        </ul>
        <p style={{ color: "#000" }}>
          All data were collected <strong>anonymously</strong>. No names, email
          addresses, IP addresses, or other identifying information were stored.
        </p>

        <h3 style={{ color: "#000" }}>Data Storage and Use</h3>
        <p style={{ color: "#000" }}>
          Your data is stored anonymously in a{" "}
          <strong>GDPR-compliant, fully encrypted Firebase database</strong>.
          Only the student researcher (Armaan Boparai) and the project
          supervisor (Dr. Kulbir Birak) have access to the pseudonymised
          research data. Results will be reported only in aggregated form or
          with fully anonymised example excerpts.
        </p>
        <p style={{ color: "#000" }}>
          Because your data is stored without direct identifiers and is only
          linked to a randomly generated participant ID, it cannot be traced
          back to you personally and therefore <strong>cannot be withdrawn</strong>{" "}
          after submission.
        </p>

        <h3 style={{ color: "#000" }}>Potential Benefits</h3>
        <p style={{ color: "#000" }}>
          While there were no direct personal benefits from participating, your
          involvement helps advance research on human–AI interaction and the
          design of supportive AI companions for learning, mental health, and
          other cognitively demanding tasks.
        </p>

        <h3 style={{ color: "#000" }}>If You Felt Any Discomfort</h3>
        <p style={{ color: "#000" }}>
          The puzzles were designed to be challenging and engaging rather than
          stressful. It is normal to feel a bit of pressure or frustration while
          solving timed reasoning problems. If you experienced discomfort or
          have lingering concerns—especially after learning about the two
          conditions—you are encouraged to contact the researcher to discuss
          this.
        </p>

        <h3 style={{ color: "#000" }}>Contact Information</h3>
        <p style={{ color: "#000" }}>
          For study-related questions or to discuss any concerns about the
          procedure:
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
          For concerns about your rights as a participant, or about research
          ethics more broadly:
          <br />
          📧 <a href="mailto:rec@kcl.ac.uk">rec@kcl.ac.uk</a>
        </p>

        <h3 style={{ color: "#000" }}>Request a Summary of Findings</h3>
        <p style={{ color: "#000" }}>
          If you would like a lay summary of the study results once the research
          is complete, you are welcome to email the researcher at the address
          above.
        </p>

        <h3 style={{ color: "#000" }}>Thank You</h3>
        <p style={{ color: "#000" }}>
          Thank you again for your time and participation. Your contribution
          directly supports ongoing research in human–AI collaboration and
          social presence in digital environments.
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
