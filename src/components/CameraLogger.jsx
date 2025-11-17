// src/components/CameraLogger.jsx
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from 'three'

/**
 * CameraLogger — logs camera position & target when you press "P".
 * Pass your CameraControls ref as `controlsRef`.
 */
export default function CameraLogger({ controlsRef }) {
  const { camera, scene } = useThree();

  useEffect(() => {
    const logCamera = () => {
      if (!camera) return console.warn("⚠️ No camera found.");
      const pos = camera.position;
      const target = controlsRef?.current?.getTarget
        ? controlsRef.current.getTarget(new THREE.Vector3())
        : controlsRef?.current?.target;

      const positionStr = `[${pos.x.toFixed(2)}, ${pos.y.toFixed(2)}, ${pos.z.toFixed(2)}]`;
      const targetStr = target
        ? `[${target.x.toFixed(2)}, ${target.y.toFixed(2)}, ${target.z.toFixed(2)}]`
        : "⚠️ target unavailable";

      console.groupCollapsed("🎥 Camera Snapshot");
      console.log("Position:", positionStr);
      console.log("Target:", targetStr);
      console.groupEnd();
    };

    const onKey = (e) => {
      const key = e.key.toLowerCase();
      if (key === "p") logCamera();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [camera, controlsRef, scene]);

  return null;
}
