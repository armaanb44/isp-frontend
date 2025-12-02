import { db, ts } from './firebase'
import { doc, setDoc, updateDoc, collection, addDoc } from 'firebase/firestore'
import { nanoid } from 'nanoid'
import { log } from 'three'

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
export async function logSummary(participantId, { totalCorrect, totalHints, timeRemaining, timeElapsed, totalPuzzles }) {
  // update root participant doc + log a separate summary entry
  const partRef = doc(db, 'participants', participantId)
  const summaryRef = collection(db, 'participants', participantId, 'summary')

    const summaryPayload = {
    totalCorrect,
    totalHints,
    timeRemaining,
    timeElapsed,
    totalPuzzles,
    timestamp: ts(),
  };

    await Promise.all([
    // root doc (create or merge)
    setDoc(
      partRef,
      {
        totalCorrect,
        totalHints,
        timeRemaining,
        timeElapsed,
        totalPuzzles,
        lastSummaryAt: ts(),
      },
      { merge: true }
    ),

    // summary subcollection entry
    addDoc(summaryRef, summaryPayload),
  ]);
}
// ─────────────────────────────────────────────────────────────
// 5️⃣ End experiment
// ─────────────────────────────────────────────────────────────
export async function endExperiment(participantId) {
  const ref = doc(db, 'participants', participantId)
  await setDoc(ref, { endTime: ts() }, {merge: true});
}

// Generic questionnaire logger
// stores all questionnaries under participants/{id}/questionnaires

export async function logQuestionnaire(participantId, type, payload) {
  const ref = collection(db, 'participants', participantId, 'questionnaires')

  await addDoc(ref, {
    type,
    ...payload,
    timestamp: ts()
  })
}

// NASA-TLX specific helper (thin wrapper)


export async function logNasaTlx(participantId, scores) {
  return logQuestionnaire(participantId, 'nasa_tlx', scores)
}

// NMSPI Helper

export async function logNms (participantId, responses) {
  return logQuestionnaire(participantId, "nmspi", responses);
}

//god speed helper

export async function logGodspeed(participantId, answers) {
return logQuestionnaire (participantId, "godspeed", answers )
}

// sus helper

export async function logSus(participantId, input) {
  return logQuestionnaire (participantId, "sus", input)
}