import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import ConsentForm from './components/ConsentForm';
import ConditionRouter from './components/ConditionRouter';
import ChatInterface from './components/ChatInterface';
import AvatarChatInterface from './components/AvatarChatInterface';
import ResultScreen from "./components/ResultsScreen";

import DemoLanding from "../demo/demoLanding";
import './styles/chat.css';
import DemoVideoPage from "./components/demonstationPage";
import DeviceGuard from "./components/deviceGuard";
import NasaTLX from "./components/NasaTLX";
import NetworkedMinds from "./components/networkedMinds";
import GodspeedScale from "./components/godSpeedScale";
import SystemUsabilityScale from "./components/systemUsabilityScale";
import Withdrawn from "./components/withdrawn";
import Debrief from "./components/debriefForm";
import Layout from "./components/layout";
import InformationSheet from "./components/informationSheet";
import PreTaskQuestionnaire from "./components/preTaskQuestionnaire";
import { logPreTask } from "./lib/logUtils";
import { ensureAnonAuth } from "./lib/firebase";

async function handlePreTaskSubmit(payload) {
  const user = await ensureAnonAuth();

  // Prefer the exact participantId you stored at consent time,
  // but fall back to auth uid if needed.
  const participantId =
    localStorage.getItem("participantId") || user.uid;

  await logPreTask(participantId, payload);
}

async function handleTLXSubmit(scores) {
  console.log("TLX results:", scores);

  // Example Firebase log
  await logTLX(auth.currentUser?.uid, scores);

  nav("/result");
}


export default function App() {
  const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,   // WRAPS ALL ROUTES
    children: [
      { index: true, element: <InformationSheet /> },
      { path: "preTaskQuestionnaire", element: <PreTaskQuestionnaire onSubmit={handlePreTaskSubmit} /> },
      { path: "start", element: <ConditionRouter /> },
      { path: "chat", element: <ChatInterface /> },
      { path: "avatar-chat", element: <AvatarChatInterface /> },
      { path: "result", element: <ResultScreen /> },
      { path: "questionnaire", element: <NasaTLX onSubmit={handleTLXSubmit} /> },
      { path: "nms", element: <NetworkedMinds /> },
      { path: "godspeed", element: <GodspeedScale /> },
      { path: "susscale", element: <SystemUsabilityScale /> },
      { path: "debrief", element: <Debrief /> },
        //Information sheet
       { path: "consentForm", element: <ConsentForm /> },

      // DEMO routes
      { path: "demo", element: <DemoLanding /> },
      { path: "demo-video", element: <DemoVideoPage /> },
      { path: "withdrawn", element: <Withdrawn /> },

    

      // Catch-all
      { path: "*", element: <Navigate to="/" replace /> },
    ]
  }
]);

  return (
    <DeviceGuard>
      <RouterProvider router={router} />
    </DeviceGuard>
  );
}
