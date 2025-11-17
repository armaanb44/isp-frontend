// src/components/TimerBar.jsx
export default function TimerBar({ total, left }) {
  const pct = Math.max(0, Math.min(100, Math.round((left/total)*100)))
  return (
    <div className="timerbar">
      <div className="timerbar-fill" style={{ width: `${pct}%` }} />
    </div>
  )
}
