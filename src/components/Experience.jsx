// src/components/Experience.jsx
import { Canvas } from "@react-three/fiber";
import {
  CameraControls,
  Environment,
  ContactShadows,
  Text,
} from "@react-three/drei";
import { Suspense, useRef, useEffect, useState } from "react";
import { Avatar } from "./Avatar";
import CameraLogger from "./CameraLogger";
import { useChat } from "../hooks/useChat";

/* Optional Dots (typing indicator)
const Dots = (props) => {
  const { loading } = useChat();
  const [loadingText, setLoadingText] = useState("");
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingText((prev) => (prev.length > 2 ? "." : prev + "."));
      }, 800);
      return () => clearInterval(interval);
    } else {
      setLoadingText("");
    }
  }, [loading]);
  if (!loading) return null;
  return (
    <group {...props}>
      <Text fontSize={0.14} anchorX="left" anchorY="bottom">
        {loadingText}
        <meshBasicMaterial attach="material" color="black" />
      </Text>
    </group>
  );
};
*/

export default function Experience() {
  const cameraControls = useRef();
  const { cameraZoomed } = useChat();
  const [controlsReady, setControlsReady] = useState(false);

  // Wait until CameraControls are mounted before setting lookAt
  useEffect(() => {
    if (!cameraControls.current) return;
    const timeout = setTimeout(() => {
      if (cameraControls.current) {
        cameraControls.current.setLookAt(
          0.44, 883.01, 794.54,   // camera position
         3.31, 746.95, 144.12,  // camera target
          false               // no smooth transition
        );
        setControlsReady(true);
      }
    }, 100); // short delay ensures it's mounted
    return () => clearTimeout(timeout);
  }, []);

  // React to zoom state (smooth transition)
  useEffect(() => {
    if (!controlsReady || !cameraControls.current) return;

    if (cameraZoomed) {
      cameraControls.current.setLookAt( 51.27, 723.93, 1763.07,-59.50, 435.91, -64.71,  true);
    } else {
      cameraControls.current.setLookAt(
        0.44, 883.01, 794.54,
       3.31, 746.95, 144.12, 
        true
      );
    }
  }, [cameraZoomed, controlsReady]);

  return (
    <>
      {/* Camera & Lights */}
      <CameraControls ref={cameraControls}/>
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 3, 5]} />

      <Suspense fallback={null}>
        {/* Avatar model */}
        <Avatar position={[0, -0.9, 0]} />

        {/* Optional typing dots near head */}
        {/* <Dots position={[0.05, 1.75, 0]} /> */}

        {/* Scene setup */}
        <Environment preset="sunset" />
        <ContactShadows
          position={[0, -0.9, 0]}  // ✅ sits right below feet
          opacity={0.45}
          scale={10}
          blur={1.5}
          far={3}
        />
      </Suspense>

      {/* Debug camera logger */}
      <CameraLogger controlsRef={cameraControls} />
      </>
  );
}
