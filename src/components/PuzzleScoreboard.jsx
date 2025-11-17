// src/components/PuzzleScoreboard.jsx
export default function PuzzleScoreboard({ current, total, hintsUsed, timeLeft }) {
  return (
    <div
      className="card puzzle-card"
      style={{
        marginTop: "1rem",
        marginBottom: "1rem",
      }}
    >
      <h3
        style={{
          marginTop: 0,
          marginBottom: "0.75rem",
          color: "#ffffffff",
        }}
      >
        Session Overview
      </h3>

      <div
        className="scorebar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
          color: "#ffffffff",
          fontWeight: "600",
          fontSize: "0.95rem",
        }}
      >
        <span>🧩 Puzzle {current} of {total}</span>
        <span>💡 Hints Used: {hintsUsed}</span>
        <span>⏱️ Time Left: {timeLeft}s</span>
      </div>
    </div>
  );
}
