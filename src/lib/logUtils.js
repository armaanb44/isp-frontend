import { db, ts } from './firebase'
import { doc, setDoc, updateDoc, collection, addDoc } from 'firebase/firestore'
import { nanoid } from 'nanoid'

// ─────────────────────────────────────────────────────────────
// 1️⃣ Create or ensure participant root document
// ─────────────────────────────────────────────────────────────
export async function ensureParticipantDoc({ uid, condition, consent }) {
  const id = uid || nanoid()
  const ref = doc(db, 'participants', id)

  await setDoc(ref, {
    condition,
    consent,
    startTime: ts(),
    endTime: null,
  }, { merge: true })

  return { id, ref }
}

// ─────────────────────────────────────────────────────────────
// 2️⃣ Log each message
// ─────────────────────────────────────────────────────────────
export async function logMessage(participantId, { role, text, type = 'reply' }) {
  const ref = collection(db, 'participants', participantId, 'messages')
  await addDoc(ref, {
    role,
    text,
    type,
    timestamp: ts(),   // lowercase for consistency
  })
}

// ─────────────────────────────────────────────────────────────
// 3️⃣ Log each puzzle attempt
// ─────────────────────────────────────────────────────────────
export async function logPuzzle(participantId, { id, answer, correct, hintsUsed, duration }) {
  const ref = collection(db, 'participants', participantId, 'puzzles')
  await addDoc(ref, {
    puzzleId: id,
    answer,
    correct,
    hintsUsed,
    duration,
    timestamp: ts(),
  })
}

// ─────────────────────────────────────────────────────────────
// 4️⃣ Log summary or running totals
// ─────────────────────────────────────────────────────────────
export async function logSummary(participantId, { totalCorrect, totalHints, timeRemaining }) {
  // update root participant doc + log a separate summary entry
  const partRef = doc(db, 'participants', participantId)
  const summaryRef = collection(db, 'participants', participantId, 'summary')

  await Promise.all([
    updateDoc(partRef, { totalCorrect, totalHints, timeRemaining }),
    addDoc(summaryRef, { totalCorrect, totalHints, timeRemaining, timestamp: ts() })
  ])
}

// ─────────────────────────────────────────────────────────────
// 5️⃣ End experiment
// ─────────────────────────────────────────────────────────────
export async function endExperiment(participantId) {
  const ref = doc(db, 'participants', participantId)
  await updateDoc(ref, { endTime: ts() })
}
