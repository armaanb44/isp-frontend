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

async function handleTLXSubmit(scores) {
  console.log("TLX results:", scores);

  // Example Firebase log
  await logTLX(auth.currentUser?.uid, scores);

  nav("/result");
}


export default function App() {
  const router = createBrowserRouter([
    // ----------------------------
    // REAL STUDY ROUTES
    // ----------------------------
    { path: '/', element: <ConsentForm /> },
    { path: '/start', element: <ConditionRouter /> },

    // Real conditions
    { path: '/chat', element: <ChatInterface /> },
    { path: '/avatar-chat', element: <AvatarChatInterface /> },

    { path: '/result', element: <ResultScreen /> },

    
    { path: "/questionnaire", element: <NasaTLX onSubmit={handleTLXSubmit} /> },
    { path: "/nms", element: <NetworkedMinds /> },     // ⭐ NEW
    { path: "/godspeed", element: <GodspeedScale /> },     // ⭐ NEW
     { path: "/susscale", element: <SystemUsabilityScale /> },     // ⭐ NEW



    // ----------------------------
    // DEMO ROUTES (Ethics Preview)
    // ----------------------------
    { path: '/demo', element: <DemoLanding /> },
    { path: '/demo-video', element: <DemoVideoPage /> },
    { path: '/withdrawn', element: <Withdrawn /> },


    // Catch-all
    { path: '*', element: <Navigate to="/" replace /> },
  ]);

  return (
    <DeviceGuard>
      <RouterProvider router={router} />
    </DeviceGuard>
  );
}
