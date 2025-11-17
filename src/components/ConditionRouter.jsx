import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ConditionRouter() {
  const nav = useNavigate();

  useEffect(() => {
    const run = async () => {
      // 1️⃣ Randomly assign or recall condition
      const stored = localStorage.getItem("condition");
      const condition = stored || (Math.random() < 0.5 ? "chat" : "avatar");
      localStorage.setItem("condition", condition);

      // ❌ REMOVED init-participant API call
      // We don't need backend initialization anymore.

      // 2️⃣ Route them to their condition
      nav("/avatar-chat");
    };

    run();
  }, [nav]);

  return null;
}
