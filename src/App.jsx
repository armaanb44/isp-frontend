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
      { index: true, element: <ConsentForm /> },
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
       { path: "information", element: <InformationSheet /> },

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
