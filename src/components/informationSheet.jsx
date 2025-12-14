import React from "react";
import { useNavigate } from "react-router-dom";

export default function InformationSheet() {
  const navigate = useNavigate();

  const handleDownloadPdf = () => {
    // Assumes information-sheet.pdf is in your public/ folder
    const link = document.createElement("a");
    link.href = "/information-sheet.pdf";
    link.download = "InformationSheet.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGoToConsent = () => {
    navigate("/consentForm");
  };

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
        Information Sheet for Participants
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
          <strong>Ethical clearance reference number:</strong> MRSU-25/26-53480  
          <br />
          <strong>Information Sheet version:</strong> 1.0 – [05/12/2025]
        </p>

        <p style={{ color: "#000", marginTop: "1rem" }}>
          <em>
            Click Download Information Sheet Below To Keep A Copy Of This
            Document
          </em>
        </p>

        <h3 style={{ color: "#000" }}>Invitation</h3>
        <p style={{ color: "#000" }}>
          You are being invited to take part in a research project which forms
          part of my MSc Applied Neuroscience dissertation at King’s College
          London. Before you decide, it is important for you to understand why
          the research is being done and what your participation will involve.
          Please take time to read this information carefully and discuss it
          with others if you wish. Feel free to contact me if anything is not
          clear or you would like more information.
        </p>

        <h3 style={{ color: "#000" }}>What is the purpose of the project?</h3>
        <p style={{ color: "#000" }}>
          The project aims to understand how people experience working with an
          AI “teammate” during a short reasoning task and how different forms of
          AI interface support may influence engagement, cooperation, and the
          feeling of working with a social partner. The results may help inform
          the design of future AI-based learning and support tools.
        </p>
        <p style={{ color: "#000" }}>
          To ensure unbiased responses, some details about the specific
          interface focus will be explained fully during the debrief.
        </p>

        <h3 style={{ color: "#000" }}>Why have I been invited to take part?</h3>
        <p style={{ color: "#000" }}>
          You are being invited because you are an adult (18 years or older) who
          is able to complete an online task in English using a desktop or
          laptop computer with internet access and audio output. We are looking
          for volunteers from the general population, including university
          students and other adults recruited via online and university
          channels.
        </p>
        <p style={{ color: "#000" }}>To take part, you should:</p>
        <ul style={{ color: "#000" }}>
          <li>Be 18 years of age or older</li>
          <li>Be fluent in English</li>
          <li>Have normal or corrected-to-normal vision and hearing</li>
          <li>
            Use a desktop or laptop computer with internet access and audio
            (mobile phones and tablets are not supported for this study)
          </li>
        </ul>
        <p style={{ color: "#000" }}>
          There are no specific requirements regarding gender, ethnicity, or
          nationality, and no clinical populations are being specifically
          targeted.
        </p>

        <h3 style={{ color: "#000" }}>What will happen if I take part?</h3>
        <p style={{ color: "#000" }}>
          If you choose to take part, your participation will take place fully
          online via a study website and will involve the following steps:
        </p>
        <ul style={{ color: "#000" }}>
          <li>
            After clicking the study link, you will first see this Information
            Sheet and an online consent form. You will be asked to confirm that
            you have read the information and that you meet the eligibility
            criteria.
          </li>
          <li>
            You will then complete a brief pre-task questionnaire asking for
            basic information (such as your age and gender) and a few questions
            about your experience with AI tools and how you are feeling.
          </li>
          <li>
            Next, you will complete a short, timed puzzle task (around 8
            minutes) together with an AI teammate via an on-screen interface
            designed to support you during the task.
          </li>
          <li>
            You will see a small set of reasoning puzzles (for example, short
            riddles) and will type your answers into a text box. The AI will
            respond with hints, encouragement, and follow-up questions. During
            this task, the system will record your answers, response times, the
            number of hints used, and the content of the chat for research
            purposes.
          </li>
          <li>
            After the puzzles, you will answer a short post-task questionnaire
            about your experience (for example, how engaged you felt, how
            difficult the task was, and how you experienced the AI teammate).
          </li>
          <li>
            At the end, you will see a debrief page explaining the purpose of
            the study in more detail, including the specific interface focus,
            and giving you contact details if you have further questions.
          </li>
        </ul>
        <p style={{ color: "#000" }}>
          In total, participation will take approximately 15–20 minutes. No
          audio or video of you will be recorded; only your interactions with
          the task and questionnaires will be stored.
        </p>

        <h3 style={{ color: "#000" }}>Do I have to take part?</h3>
        <p style={{ color: "#000" }}>
          No. Participation is completely voluntary. You should only take part
          if you want to, and choosing not to take part will not disadvantage
          you in any way. You can close your browser at any point before
          submitting your final responses if you decide you no longer wish to
          participate.
        </p>

        <h3 style={{ color: "#000" }}>Incentives</h3>
        <p style={{ color: "#000" }}>
          There is no payment or material incentive for taking part in this
          study. Some participants may take part as a way of contributing to
          psychological research and to support student projects.
        </p>

        <h3 style={{ color: "#000" }}>
          What are the possible risks of taking part?
        </h3>
        <p style={{ color: "#000" }}>
          This project is considered minimal risk. The puzzles are designed to
          be mildly challenging but not distressing. 
        </p>
        <p style={{ color: "#000" }}>
          The main inconvenience may be a small amount of time and effort in
          concentrating on the puzzles. If at any point you feel uncomfortable
          or no longer wish to continue, you can end the task at any time
          by clicking the "End Experiment" button on the top right of your screen.
        </p>

        <h3 style={{ color: "#000" }}>
          What are the possible benefits of taking part?
        </h3>
        <p style={{ color: "#000" }}>
          There are no direct personal benefits to you from taking part.
          However, you may find the puzzles and interaction with the AI
          interesting or enjoyable. Your participation will help improve
          understanding of how people experience different forms of AI
          interfaces, which may contribute to designing better AI-based learning
          and support systems in the future.
        </p>

        <h3 style={{ color: "#000" }}>Data handling and confidentiality</h3>
        <p style={{ color: "#000" }}>
          King’s College London is the Sponsor of this research and is
          responsible for looking after your information and using it properly.
          Your data will be processed in compliance with UK data protection
          laws, including the UK General Data Protection Regulation (UK GDPR)
          and the Data Protection Act 2018.
        </p>

        <p style={{ color: "#000" }}>
          <strong>Categories of personal data we will collect</strong>
        </p>
        <ul style={{ color: "#000" }}>
          <li>Age (in years, to confirm you are 18 or over)</li>
          <li>Basic demographic information (e.g. gender)</li>
          <li>
            Your responses to questionnaires about your experience of the task
          </li>
          <li>
            Your puzzle performance data (answers, response times, hints used)
            and the text of the chat between you and the AI
          </li>
        </ul>
        <p style={{ color: "#000" }}>
          We will not collect your name, email address, full postal address, IP
          address, or social media handles, and we will not record any images or
          audio/video of you.
        </p>

        <p style={{ color: "#000" }}>
          <strong>How and where your data will be stored</strong>
        </p>
        <ul style={{ color: "#000" }}>
          <li>
            Your data will be stored under a randomly generated participant ID,
            not your name.
          </li>
          <li>
            Electronic data will be stored in a secure, encrypted Firebase
            database.
          </li>
          <li>
            Only the student researcher and project supervisor will have access
            to the pseudonymised research data.
          </li>
        </ul>

        <p style={{ color: "#000" }}>
          <strong>Data sharing and international transfers</strong>
        </p>
        <p style={{ color: "#000" }}>
          Fully anonymised data (for example, summary statistics and
          non-identifying example excerpts from chat or responses) may be
          included in the MSc dissertation and in any academic publications or
          conference presentations that arise from this work. These outputs may
          be read or accessed by people inside and outside the UK. No
          identifiable or pseudonymised data about you will be shared outside
          King’s College London.
        </p>

        <p style={{ color: "#000" }}>
          <strong>How long your data will be kept</strong>
        </p>
        <p style={{ color: "#000" }}>
          Pseudonymised research data (linked to a participant ID rather than
          your name) will be kept for the period required by King’s College
          London research data policies, which is normally up to 5 years after
          assessment of the dissertation or after any publication that relies on
          the data. After this period, the data will either be securely deleted
          or fully anonymised so that no individual can be identified.
        </p>

        <p style={{ color: "#000" }}>
          <strong>Anonymity in research outputs</strong>
        </p>
        <p style={{ color: "#000" }}>
          You will not be named or otherwise directly identified in any report,
          dissertation, publication, or presentation. If example quotations from
          the chat are used, they will be selected and edited to ensure they do
          not contain any information that could reasonably identify you.
        </p>

        <h3 style={{ color: "#000" }}>
          What if I change my mind about taking part?
        </h3>
        <p style={{ color: "#000" }}>
          You are free to withdraw from the project at any time before you
          submit your final responses, without giving a reason. If you withdraw
          before submission, your data will not be included in the study.
        </p>
        <p style={{ color: "#000" }}>
          Because we do not collect names or contact details and your data are
          stored only under a random participant ID, once you have submitted
          your responses it will no longer be possible to identify which data
          belong to you. This means that after submission it will not be
          possible to withdraw your individual data.
        </p>

        <h3 style={{ color: "#000" }}>How is the project being funded?</h3>
        <p style={{ color: "#000" }}>
          This project is a self-funded student dissertation project conducted as
          part of the MSc Applied Neuroscience at King’s College London. There
          is no external commercial funding.
        </p>

        <h3 style={{ color: "#000" }}>
          What will happen to the results of the project?
        </h3>
        <p style={{ color: "#000" }}>
          The results will be summarised in a dissertation submitted in partial
          fulfilment of the requirements for the MSc Applied Neuroscience at
          King’s College London. Findings may also be written up for submission
          to academic journals or for presentation at conferences. Any such
          outputs will use only anonymised data and will not identify
          individual participants.
        </p>

        <h3 style={{ color: "#000" }}>
          Who should I contact for further information?
        </h3>

        <p style={{ color: "#000" }}>
          If you have any questions or would like more information about this
          project, please contact:
        </p>
        <p style={{ color: "#000" }}>
          <strong>Student researcher:</strong>
          <br />
          Armaan Boparai
          <br />
          MSc Applied Neuroscience
          <br />
          Institute of Psychiatry, Psychology &amp; Neuroscience
          <br />
          King’s College London
          <br />
          📧{" "}
          <a href="mailto:armaan.boparai@kcl.ac.uk">
            armaan.boparai@kcl.ac.uk
          </a>
        </p>

        <h3 style={{ color: "#000" }}>
          What if I have further questions, or if something goes wrong?
        </h3>
        <p style={{ color: "#000" }}>
          If this project has harmed you in any way, or if you wish to make a
          complaint about the conduct of the project, you can contact:
        </p>
        <p style={{ color: "#000" }}>
          <strong>Project supervisor:</strong>
          <br />
          Dr Kulbir Birak
          <br />
          Institute of Psychiatry, Psychology &amp; Neuroscience
          <br />
          King’s College London
          <br />
          📧{" "}
          <a href="mailto:kulbir.birak@kcl.ac.uk">kulbir.birak@kcl.ac.uk</a>
        </p>

        <p style={{ color: "#000", marginTop: "1.5rem" }}>
          Thank you for reading this information sheet and for considering
          taking part in this research.
        </p>

        {/* ACTION BUTTONS (LEFT / RIGHT) */}
        <div
          style={{
            marginTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          {/* LEFT BUTTON -> NAVIGATE */}
          <button
            onClick={handleGoToConsent}
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              borderRadius: "8px",
              backgroundColor: "#198754",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            I have read the information sheet
          </button>

          {/* RIGHT BUTTON -> DOWNLOAD */}
          <button
            onClick={handleDownloadPdf}
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              borderRadius: "8px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Download Information Sheet (PDF)
          </button>
        </div>
      </div>
    </div>
  );
}
