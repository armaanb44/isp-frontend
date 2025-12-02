// src/components/ChatInterface.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ensureAnonAuth } from "../lib/firebase";

import puzzlesData from "../data/puzzles.json";
import TimerBar from "./TimerBar";
import PuzzleScoreboard from "./PuzzleScoreboard";
import AnswerInput from "./AnswerInput";
import HintButton from "./HintButton";
import { useChat } from "../hooks/useChat";
import { auth } from "../lib/firebase";
import {
  ensureParticipantDoc,
  logMessage,
  logPuzzle,
  logSummary,
  endExperiment,
} from "../lib/logUtils";

const TOTAL_TIME = 480;
const INACTIVITY_MS = 40000;
const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

console.log("🔍 VITE_BACKEND_URL =", import.meta.env.VITE_BACKEND_URL);
console.log("🔍 BACKEND constant =", BACKEND);
console.log("🔍 Full chat URL =", `${BACKEND}/chat`);




export default function ChatInterface() {
  const nav = useNavigate();
  const { pushAssistantMessages, audioPlaying } = useChat();

  const [messages, setMessages] = useState([]);

    // new states to handle the hardcoded logic 16.11.25
  const [hasIntroPlayed, setHasIntroPlayed] = useState(false);
  const [freeChatEnabled, setFreeChatEnabled] = useState(false);
  const [halfTimeFired, setHalfTimeFired] = useState(false);
  const [oneMinuteFired, setOneMinuteFired] = useState(false);
  // track if last submitted answer was wrong and we want a GPT follow up
  const [pendingWrongAnswer, setPendingWrongAnswer] = useState(null);
  // track if we already played the riddle intro for this riddle
  const [riddleIntroPlayed, setRiddleIntroPlayed] = useState({});
  const [resultsSummary, setResultsSummary] = useState(null);
  const [redirectSeconds, setRedirectSeconds] = useState(null);

  //safety flags

  const [startDisabled, setStartDisabled] = useState(false);
const [startCooldown, setStartCooldown] = useState(0);

  

  //end experiment (ethics)
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  
  

function getRelevantHistory() {
  // send only recent ~15 messages, never empty
  const recent = messages.slice(-15);

  return recent.map(m => ({
    role: m.role,
    text: m.text,
  }));
}


  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [perPuzzleHints, setPerPuzzleHints] = useState({});
  const [answers, setAnswers] = useState({});
  const [correctCount, setCorrectCount] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const inactivityIdRef = useRef(null);
  const hasInteractedRef = useRef(false);
  const finishedRef = useRef(false);
  const startTsRef = useRef(Date.now());
  const puzzleStartRef = useRef(Date.now());
const pendingFinishRef = useRef(null);

  const [phase, setPhase] = useState("intro"); // 'intro' | 'active' | 'finished'

  const totalHintsRef = useRef(0);
  const [totalHintsCount, setTotalHintsCount] = useState(0);
  const incHints = (n = 1) => {
    totalHintsRef.current += n;
    setTotalHintsCount((c) => c + n);
  };

  const puzzle = useMemo(() => puzzlesData[currentIndex], [currentIndex]);


  useEffect(() => {
  async function initUser() {
    const user = await ensureAnonAuth();  // 🔥 ensures login (anonymous)
    console.log("👤 Logged in with UID:", user.uid);

    const assignedCondition = sessionStorage.getItem("assignedCondition") || "chat";

    await ensureParticipantDoc({
      uid: user.uid,
      condition: assignedCondition,
      consent: true,
    });

    console.log("📄 Participant doc ensured");
  }

  initUser();
}, []);

  useEffect(() => {
  console.log("🧩 FRONTEND — Current puzzle index:", currentIndex);
  console.log("🧩 FRONTEND — Current puzzle question:", puzzle?.question);
}, [currentIndex, puzzle]);


useEffect(() => {
  // Only do something when:
  // - audio is NOT playing
  // - we have a pending finish
  // - the experiment isn't already marked finished
  if (!audioPlaying && pendingFinishRef.current && !finishedRef.current) {
    const { finalCorrectCount, explicitTime } = pendingFinishRef.current;
    pendingFinishRef.current = null;

    // Call finish with the captured values
    finish(finalCorrectCount, explicitTime);
  }
}, [audioPlaying, finish]);


// Auto-play riddle audio for puzzles 2 and 3 (riddle2/riddle3)
useEffect(() => {
  //only do this in active phase
  if (phase !== "active") return;

  // if we've already played the riddle for this puzzle, do nothing
  if (riddleIntroPlayed[currentIndex]) return;

  let cancelled = false;

  async function playRiddleForCurrentPuzzle() {
    try {
      // For puzzle 0, riddle 1 is already played via "start_challenge"
      if (currentIndex === 0 ){
        setRiddleIntroPlayed((prev) => ({...prev, 0:true}));
        return;
      }

      const res = await fetch(`${BACKEND}/chat`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          phase: "active",
          intent:"read_riddle",
          puzzleIndex: currentIndex,
          totalPuzzles: puzzlesData.length,
          currentPuzzleQuestion: puzzle.question,
          puzzleAnswer: puzzle.answer,
          history: [],

        }),

      });
      if (!res.ok) throw new Error("Faieled to fetch riddle message")

      const data = await res.json();
      const assistantMessages = Array.isArray(data.messages)
      ? data.messages
      : [];

      if (cancelled) return;

      setMessages((m) => [...m, ...assistantMessages]);
      pushAssistantMessages(assistantMessages);

      // Mark this puzzle's riddle as played
      setRiddleIntroPlayed((prev) => ({
        ...prev,
        [currentIndex]: true,
      }));
    } catch (err) {
      console.error("Error auto-playing riddle for puzzle", currentIndex, err)
    }
  }

  playRiddleForCurrentPuzzle();
  return () => {
    cancelled=true;
  };
},[phase, currentIndex, puzzle, riddleIntroPlayed, pushAssistantMessages]);


  const [isTyping, setIsTyping] = useState(false);

  const scrollRef = useRef(null);

  // auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // ─────────────────────────────────────────────
  // Intro: first assistant message from backend (HARDCODED VIA backend intent)
  // ─────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function runIntro() {
      setIsTyping(true);
     
setStartDisabled(true);
setStartCooldown(18);  // 17-second cooldown

      try {
        const response = await fetch(`${BACKEND}/chat`, {
          method:"POST",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({
            phase: "intro",
            intent: "hardcoded_intro",
            puzzleIndex: 0,
            totalPuzzles: puzzlesData.length,
            currentPuzzleQuestion: puzzlesData[0]?.question || "",
            readinessScore: null,
            history: [],
          }),
        });
        const data = await response.json();

        if(cancelled) return;

        const assistantMessages = Array.isArray(data.messages)
        ? data.messages
        : [];


        // push to chat UI
        setMessages((m) => [...m, ...assistantMessages]);

        // push to avatar queue
        pushAssistantMessages(assistantMessages);

        setHasIntroPlayed(true);

        try {
  const uid = auth.currentUser?.uid;
  if (uid) {
    await Promise.all(
      assistantMessages.map((msg) =>
        logMessage(uid, {
          role: "assistant",
          text: msg.text || "",
          type: "intro",
        })
      )
    );
  }
} catch (err) {
  console.error("🔥 log intro messages error:", err);
}

        
        
      
    } catch (err) {
      console.error("Intro message error:", err);
      if (cancelled) return;

        // fallback if backend fails
        const fallbackMsg = {
          role: "assistant",
          text: 
          "Hey there! I'm your teammate for this reasoning challenge," +
          "On a scale of 1 to 5, how nervous are you feeling?",
          facialExpression: "smile",
          animation: "Talking",
          audio: null,
          lipsync: null,
        };

        setMessages((m) => [...m, fallbackMsg]);
        pushAssistantMessages([fallbackMsg]);
      } finally {
        if (!cancelled) setIsTyping(false);
      }
    }
    runIntro();

    return () => {
      cancelled = true;
    }
  }, []);


// Cooldown timer for Start Challenge button
useEffect(() => {
  if (!startDisabled || startCooldown <= 0) return;

  const id = setInterval(() => {
    setStartCooldown((s) => s - 1);
  }, 1000);

  return () => clearInterval(id);
}, [startDisabled, startCooldown]);


useEffect(() => {
  if (startCooldown <= 0 && startDisabled) {
    setStartDisabled(false);
  }
}, [startCooldown, startDisabled]);



  // ─────────────────────────────────────────────
  // Countdown timer (only in active phase)
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "active") return;
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(id);
          finish(correctCount, 0);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [phase]); // intentionally not including correctCount to keep logic simple


  // Time-based audio events: half-time and one-minute-left
  useEffect(() => {
    if (phase !== "active") return;

    // half time (4 min mark)
    if (!halfTimeFired && timeLeft <= TOTAL_TIME/2) {
      (async () => {
        try{
          const res = await fetch(`${BACKEND}/chat`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              phase: "active",
              intent: "half_time",
              puzzleIndex: currentIndex,
              totalPuzzles: puzzlesData.length,
              currentPuzzleQuestion: puzzle.question,
              puzzleAnswer: puzzle.answer,
              history: [],
            
            }),
        
      });

      const data = await res.json();
      const assistantMessages = Array.isArray(data.messages)
      ? data.messages
      : [];

      setMessages((m) => [...m, ...assistantMessages]);
      pushAssistantMessages(assistantMessages);
      setHalfTimeFired(true);

      try {
  const uid = auth.currentUser?.uid;
  if (uid) {
    await Promise.all(
      assistantMessages.map((msg) =>
        logMessage(uid, {
          role: "assistant",
          text: msg.text || "",
          type: "time_event_half" // or "time_event_last_minute"
        })
      )
    );
  }
} catch (err) {
  console.error("🔥 log time event error:", err);
}

      
    } catch (err) {
      console.error("Error playing half-time message:", err);

    }
  })();
}

// one minute left 
if (!oneMinuteFired && timeLeft <= 60) {
  (async () => {
    try {
      const res = await fetch (`${BACKEND}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          phase: "active",
          intent: "one_minute_left",
          puzzleIndex: currentIndex,
          totalPuzzles: puzzlesData.length,
          currentPuzzleQuestion: puzzle.question,
          puzzleAnswer: puzzle.answer,
          history: [],
        }),
      });

    const data = await res.json();
    const assistantMessages = Array.isArray(data.messages)
    ? data.messages
    : [];

    setMessages((m) => [...m, ...assistantMessages]);
    pushAssistantMessages(assistantMessages);
    setOneMinuteFired(true);

    try {
  const uid = auth.currentUser?.uid;
  if (uid) {
    await Promise.all(
      assistantMessages.map((msg) =>
        logMessage(uid, {
          role: "assistant",
          text: msg.text || "",
          type: "time_event_half" // or "time_event_last_minute"
        })
      )
    );
  }
} catch (err) {
  console.error("🔥 log time event error:", err);
}


    } catch (err) {
      console.error("Error playing one-minute left message:", err);
    }
  })();
}
}, [phase, timeLeft, halfTimeFired, oneMinuteFired, currentIndex, puzzle, pushAssistantMessages]
);

/*

  // ─────────────────────────────────────────────
  // Inactivity handling
  // ─────────────────────────────────────────────
  const clearInactivity = () => {
    if (inactivityIdRef.current) {
      clearTimeout(inactivityIdRef.current);
      inactivityIdRef.current = null;
    }
  };

  const startInactivity = () => {
    if (!hasInteractedRef.current || finishedRef.current) return;

    clearInactivity();
    inactivityIdRef.current = setTimeout(async () => {
      const text = "Hey! Time is running out - what's your next thought? Let me help.";
      setMessages((m) => [...m, { role: "assistant", text }]);
      try {
        await logMessage(auth.currentUser?.uid, {
          role: "assistant",
          text,
          type: "autoPrompt",
        });
      } catch {}
      startInactivity();
    }, INACTIVITY_MS);
  };

  useEffect(() => {
    return () => clearInactivity();
  }, []);

  const markInteractionAndRestartInactivity = () => {
    hasInteractedRef.current = true;
    startInactivity();
  };

  */
  // ─────────────────────────────────────────────
  // Helper
  // ─────────────────────────────────────────────
  function normalize(s) {
    return String(s || "").trim().toLowerCase();
  }

  // ─────────────────────────────────────────────
  // CHAT SEND
  // ─────────────────────────────────────────────
  async function sendUser(text) {
    if (!text?.trim() || finishedRef.current) return;

    setMessages((m) => [...m, { role: "user", text, ts: Date.now() }]);


    // auto-detect correct answer in active phase
    if (phase === "active") {
      const normalizedAnswer = puzzle.answer.toLowerCase().trim();
      const normalizedUser = text
        .toLowerCase()
        .replace(/[.,!?;:'"()]/g, "")
        .trim();

      const found =
        normalizedUser === normalizedAnswer ||
        normalizedUser.includes(` ${normalizedAnswer} `) ||
        normalizedUser.endsWith(` ${normalizedAnswer}`) ||
        normalizedUser.startsWith(`${normalizedAnswer} `) ||
        normalizedUser.split(" ").includes(normalizedAnswer);

      if (found) {
        setTimeout(() => submitAnswer(puzzle.answer), 600);
        return;
      }
    }

    try {
      await logMessage(auth.currentUser?.uid, {
        role: "user",
        text,
        type: "reply",
      });
    } catch {}

    setIsTyping(true);


    console.log("📤 FRONTEND — Sending to /chat:", {
  message: text,
  phase,
  puzzleIndex: currentIndex,
  currentPuzzleQuestion: puzzle.question,
  puzzleAnswer: puzzle.answer,
});


    const response = await fetch(`${BACKEND}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: text,
        phase,
        puzzleIndex: currentIndex,
        totalPuzzles: puzzlesData.length,
        currentPuzzleQuestion: puzzle.question,
        puzzleAnswer: puzzle.answer,
        readinessScore: null,
        history:getRelevantHistory(),
      }),
    });

    const data = await response.json();
    const assistantMessages = Array.isArray(data.messages)
      ? data.messages
      : [];

   setMessages((m) => [
  ...m,
  ...assistantMessages.map((msg) => ({ ...msg, ts: Date.now() })),
]);
    pushAssistantMessages(assistantMessages);



    
try {
  const uid = auth.currentUser?.uid;
  if (uid) {
    await Promise.all(
      assistantMessages.map((msg) =>
        logMessage(uid, {
          role: "assistant",
          text: msg.text || "",
          type: "gpt_reply",
        })
      )
    );
  }
} catch (err) {
  console.error("🔥 log assistant messages error:", err);
}

setIsTyping(false);

    // extract hints
    if (phase === "active") {
      assistantMessages.forEach((msg) => {
        const t = msg.text || "";
        const hintMatches = [...t.matchAll(/\[HINT\]\s*([^\n\r]+)/g)];

        if (hintMatches.length) {
          const extractedHints = hintMatches.map((m) => m[1].trim());

          setPerPuzzleHints((h) => {
            const prev = h[puzzle.id] || [];
            return { ...h, [puzzle.id]: [...prev, ...extractedHints] };
          });

          incHints(hintMatches.length);

          try {
            logMessage(auth.currentUser?.uid, {
              role: "assistant",
              text: t,
              type: "hint_auto",
              meta: { count: hintMatches.length, puzzleId: puzzle.id },
            });
          } catch {}
        }
      });
    }

   // markInteractionAndRestartInactivity();
  }

  // ─────────────────────────────────────────────
  // SUBMIT ANSWER
  // ─────────────────────────────────────────────
  async function submitAnswer(userAnswer) {
    if (finishedRef.current) return;

    const isCorrect = normalize(userAnswer) === normalize(puzzle.answer);
    const duration = Math.round((Date.now() - puzzleStartRef.current) / 1000);
    const used = perPuzzleHints[puzzle.id]?.length || 0;

    setAnswers((a) => ({
      ...a,
      [puzzle.id]: { userAnswer, correct: isCorrect, hintsUsed: used, duration },
    }));

    try {
      await logPuzzle(auth.currentUser?.uid, {
        id: puzzle.id,
        answer: userAnswer,
        correct: isCorrect,
        hintsUsed: used,
        duration,
      });
    } catch {}

    const nextCorrectCount = isCorrect ? correctCount + 1 : correctCount;

    // animated feedback


    console.log("📤 FRONTEND — Sending to /answer-feedback:", {
  isCorrect,
  userAnswer,
  puzzleIndex: currentIndex,
  currentPuzzleQuestion: puzzle.question
});


    try {
      const feedbackRes = await fetch(`${BACKEND}/answer-feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isCorrect,
          userAnswer,
          duration,
          hintsUsed: used,
          phase,
          puzzleIndex: currentIndex,
          totalPuzzles: puzzlesData.length,
          currentPuzzleQuestion: puzzle.question,
         history:getRelevantHistory(),
        }),
      });

      const feedbackData = await feedbackRes.json();
      const assistantMessages = Array.isArray(feedbackData.messages)
        ? feedbackData.messages
        : [];

     setMessages((m) => [
  ...m,
  ...assistantMessages.map((msg) => ({ ...msg, ts: Date.now() })),
]);
      pushAssistantMessages(assistantMessages);

      try {
  const uid = auth.currentUser?.uid;
  if (uid) {
    await Promise.all(
      assistantMessages.map((msg) =>
        logMessage(uid, {
          role: "assistant",
          text: msg.text || "",
          type: "feedback",
        })
      )
    );
  }
} catch (err) {
  console.error("🔥 log feedback messages error:", err);
}

    } catch (err) {
      console.error("❌ feedback error:", err);

      const fallbackMsg = {
        role: "assistant",
        text: isCorrect
          ? "Nice! Let's move forward!"
          : "Good try! Let's keep going.",
        facialExpression: isCorrect ? "smile" : "default",
        animation: "Talking",
        audio: null,
        lipsync: null,
      };

      setMessages((m) => [...m, fallbackMsg]);
      pushAssistantMessages([fallbackMsg]);
    }

    if (currentIndex < puzzlesData.length - 1) {
      setCorrectCount(nextCorrectCount);
      setCurrentIndex((i) => i + 1);
      puzzleStartRef.current = Date.now();
      setCurrentAnswer("");
    } else {
  setCorrectCount(nextCorrectCount);

  // 🔹 Defer finish until current audio (feedback line) has completed
  pendingFinishRef.current = {
    finalCorrectCount: nextCorrectCount,
    explicitTime: timeLeft,   // capture time remaining NOW
  };
}


   // markInteractionAndRestartInactivity();
  }

  // ─────────────────────────────────────────────
  // ASK HINT
  // ─────────────────────────────────────────────
  async function askHint() {
    if (finishedRef.current) return;

    const prev = perPuzzleHints[puzzle.id] || [];
    const hintResponse = await fetch(`${BACKEND}/generate-hint`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        puzzle: puzzle.question,
        previousHints: prev,
      }),
    }).then((r) => r.json());

    const hint = hintResponse.hint;

    setPerPuzzleHints((h) => ({ ...h, [puzzle.id]: [...prev, hint] }));
    setMessages((m) => [...m, { role: "assistant", text: hint }]);
    incHints(1);
    try {
      await logMessage(auth.currentUser?.uid, {
        role: "assistant",
        text: hint,
        type: "hint",
      });
    } catch {}

   //markInteractionAndRestartInactivity();
  }

  // ─────────────────────────────────────────────
  // FINISH
  // ─────────────────────────────────────────────
async function finish(
  finalCorrectCount = correctCount,
  explicitTimeParam
) {
  if (finishedRef.current) return;
  finishedRef.current = true;

  // 🔒 Make sure we always have a sane time value
  let safeTimeLeft;
  if (typeof explicitTimeParam === "number" && Number.isFinite(explicitTimeParam)) {
    safeTimeLeft = explicitTimeParam;
  } else if (typeof timeLeft === "number" && Number.isFinite(timeLeft)) {
    safeTimeLeft = timeLeft;
  } else {
    safeTimeLeft = 0;
  }

  const totalHintsRaw = totalHintsRef.current;
  const totalHints = (typeof totalHintsRaw === "number" && Number.isFinite(totalHintsRaw))
    ? totalHintsRaw
    : 0;

  const remaining = Math.max(0, safeTimeLeft);
  const timeElapsed = TOTAL_TIME - remaining;
  const totalPuzzles = puzzlesData.length;

  console.log("🧮 FINISH SUMMARY DEBUG", {
    finalCorrectCount,
    explicitTimeParam,
    safeTimeLeft,
    timeLeftState: timeLeft,
    remaining,
    totalHints,
    totalPuzzles,
  });

  // Save summary to firestore
  try {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      console.warn("⚠️ No auth UID at finish, skipping Firestore log");
    } else {
      await logSummary(uid, {
        totalCorrect: finalCorrectCount,
        totalHints,
        timeRemaining: remaining,
        timeElapsed,
        totalPuzzles,
      });

      await endExperiment(uid);
    }
  } catch (err) {
    console.error(" Falied to log summary/end experiment", err);
  }

  // move UI to finished state
  setPhase("finished");

  const summary = {
    totalCorrect: finalCorrectCount,
    totalHints,
    timeRemaining: remaining,
  };
  setResultsSummary(summary);
  setRedirectSeconds(10);

  // Request closing message from backend
  let closingText = "";
  let closingAudio = null;
  let closingLipSync = null;

  try {
    console.log("📤 CLOSING MESSAGE PAYLOAD:", {
      correct: finalCorrectCount,
      totalHints,
      timeRemaining: remaining,
      totalPuzzles: puzzlesData.length,
    });

    const res = await fetch(`${BACKEND}/closing-message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        correct: finalCorrectCount,
        totalHints,
        timeRemaining: remaining,
        totalPuzzles: puzzlesData.length,
      }),
    });

    const data = await res.json();
    closingText = data.text;
    closingAudio = data.audio;
    closingLipSync = data.lipsync;
  } catch (err) {
    console.error("Closing message failed", err);
    closingText = "Great work today. It was a pleasure working with you - take care.";
    closingAudio = null;
    closingLipSync = null;
  }

  const closingMsg = {
    role: "assistant",
    text: closingText,
    facialExpression: "smile",
    animation: "Talking2",
    audio: closingAudio,
    lipsync: closingLipSync,
    ts: Date.now(),
  };

  setMessages((m) => [...m, closingMsg]);
  pushAssistantMessages([closingMsg]);

  try {
    const uid = auth.currentUser?.uid;
    if (uid) {
      await logMessage(uid, {
        role: "assistant",
        text: closingMsg.text || "",
        type: "closing",
      });
    }
  } catch (err) {
    console.error("🔥 log closing message error:", err);
  }
}





  // preserve hint logic per puzzle
  const prevHintsRef = useRef(0);
  const rawHintsForThisPuzzle = perPuzzleHints?.[puzzle?.id]?.length ?? 0;
  const currentHintsUsed = rawHintsForThisPuzzle || prevHintsRef.current;
  useEffect(() => {
    prevHintsRef.current = rawHintsForThisPuzzle;
  }, [puzzle?.id, rawHintsForThisPuzzle]);

  const totalHintsSoFar = useMemo(
    () =>
      Object.values(perPuzzleHints).reduce(
        (s, arr) => s + (arr?.length || 0),
        0
      ),
    [perPuzzleHints]
  );

  //exit click handler
  async function handleExitClick() {
  const confirmed = window.confirm(
    "Are you sure you want to end the experiment? Your session will stop immediately. You will not lose any compensation."
  );

  if (!confirmed) return;

  // Cleanup + mark experiment finished
 // clearInactivity();
  finishedRef.current = true;

  try {
    await endExperiment(auth.currentUser?.uid);
  } catch (err) {
    console.error("Failed to log endExperiment:", err);
  }

  nav("/withdrawn"); // a simple page saying "You have withdrawn from the study."
}

//auto redirect ticker 
useEffect(() => {
  if (phase !== "finished") return;
  if (redirectSeconds === null) return;

  if (redirectSeconds <= 0) {
    nav("/questionnaire");
    return;
  }

  const timerId = setTimeout(() => {
    setRedirectSeconds((s) => s - 1);
  }, 1000);

  return () => clearTimeout(timerId);
}, [phase, redirectSeconds, nav]);



  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────
  return (
    
    
    <div className="container">
  
  <button
    className="end-experiment"
    style={{
      background: "red",
      color: "white",
      padding: "0.4rem 0.8rem",
      border: "none",
      borderRadius: "6px",
      fontWeight: "600",
      cursor: "pointer",
      marginBottom: "1rem",
      position: "absolute",
      top: "20px",
      right: "20px"
    }}
    onClick={handleExitClick}
  >
    End Experiment
  </button>

      {/* Chat card */}
      <div className="card chat-card">
        <h3>Chat with your AI partner</h3>
        <div className="chat">
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.role}`}>
              {(m.text || "").replace(/\[HINT\]\s*/g, "")}
            </div>
          ))}

          {isTyping && (
            <div className="msg assistant typing">
              <span className="dots">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </span>
            </div>
          )}

          <div ref={scrollRef} />
        </div>


        { phase !== "finished" && (
        <AnswerInput
        disabled={audioPlaying}
          onSend={(text) => {
            if (audioPlaying) return; // safety double-check
            sendUser(text);
           // markInteractionAndRestartInactivity();
          }}
        />
        )}

        {phase === "intro" && (
          <div className="startArea">
            <button
              className="startButton"
              disabled={startDisabled}
              onClick={async () => {
                if(phase !== "intro") return;
                setPhase("active");
                setStartDisabled(true)
                puzzleStartRef.current = Date.now();

                //marking riddle 1 as played
                setRiddleIntroPlayed((prev) => ({...prev, 0:true}));

                // 1. Request the backend to play the hardcoded riddle 1
                try {
                  const res = await fetch(`${BACKEND}/chat`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify({
                      phase: "active",
                      intent: "start_challenge",
                      puzzleIndex: currentIndex,
                      totalPuzzles: puzzlesData.length,
                      currentPuzzleQuestion: puzzle.question,
                      puzzleAnswer: puzzle.answer,
                      history: []
                    }),
                  });

                  const data = await res.json();
                  const assistantMessages  = Array.isArray(data.messages)
                  ? data.messages
                  : [];

                  setMessages((m) => [...m, ...assistantMessages]);
                  pushAssistantMessages(assistantMessages);
                } catch (err) {
                  console.error("Error starting challlenge:", err);
                }

                // wait 2 seconds affer the riddle playback before enabling free chat
                await new Promise((resolve) => setTimeout(resolve, 2000));
              }}
            >
              {startDisabled
  ? `Start Challenge (${startCooldown})`
  : "Start Challenge"}

            </button>
          </div>
        )}
      </div>

      {/* Puzzle + timer */}
      {phase === "active" && (
        <>
          <PuzzleScoreboard
            current={currentIndex + 1}
            total={puzzlesData.length}
            hintsUsed={totalHintsCount}
            timeLeft={timeLeft}
          />

          <div className="card puzzle-card animate-in">
            <h3>Puzzle {currentIndex + 1}</h3>
            <p>{puzzle.question}</p>
            <div className="answerSection">
               {/* <input
                type="text"
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Enter your answer"
              />
            <button
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
                onClick={() =>
                  currentAnswer.trim() && submitAnswer(currentAnswer.trim())
                }
              >
                Submit
              </button> */}
              <div style={{ flex: 1 }} />
            </div>
          </div>

          <TimerBar total={TOTAL_TIME} left={timeLeft} />
        </>
      )}

      {/* Debrief card (after challenge ends) */}
      {phase === "finished" && resultsSummary && (
        <div className="card puzzle-card animate-in">
          <h3>Debrief</h3>
          <p>Correct: {resultsSummary.totalCorrect}</p>
          <p>Total Hints: {resultsSummary.totalHints}</p>
          <p>Time Remaining: {resultsSummary.timeRemaining}s</p>
          <button onClick={() => nav("/questionnaire")}>
  {redirectSeconds !== null && redirectSeconds > 0
    ? `Proceed to Post-Study Questionnaire (${redirectSeconds})`
    : "Proceed to Post-Study Questionnaire"}
</button>
        </div>
      )}
    </div>
  );
}
