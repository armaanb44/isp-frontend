import { useLocation, useNavigate } from "react-router-dom";

export default function ResultScreen() {
  const nav = useNavigate();
  const { state } = useLocation() || {};

  return (
    <div className="container">
      <h1>Debrief</h1>

      <div className="card">
        <p>Correct: {state?.totalCorrect ?? 0}</p>
        <p>Total Hints: {state?.totalHints ?? 0}</p>
        <p>Time Remaining: {state?.timeRemaining ?? 0}s</p>

        <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          
        

          {/* Proceed to questionnaires */}
          <button
            onClick={() => nav("/questionnaire")}
            style={{
              padding: "0.9rem",
              background: "#0066ff",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            Proceed to Post-Study Questionnaire
          </button>
        </div>
      </div>
    </div>
  );
}


  {/* Restart experiment 
          <button onClick={() => nav('/')} style={{
            padding: "0.9rem",
            background: "#ccc",
            color: "#000",
            border: "none",
            borderRadius: "8px",
            fontWeight: 600,
            cursor: "pointer"
          }}>
            Restart
          </button> 
*/}