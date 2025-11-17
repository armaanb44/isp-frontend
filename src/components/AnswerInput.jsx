import { useState } from "react";

export default function AnswerInput ({onSend, onSubmitAnswer}) {
    const [text, setText] = useState('')
    return (
        <div className="inputRow">
            <input
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder = "Type a thought or answer.."
            onKeyDown = { e => {
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    if (!text.trim()) return
                    onSend(text.trim())
                    setText('')
                }
            }}
            />
            <button onClick={() => { if (text.trim()) { onSend(text.trim()); setText('')}}} >Send </button>
            
        </div>
    )
}