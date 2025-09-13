import { useState, useEffect } from "react";

export default function usePageVisibilityAndReset() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "u") {
        window.location.reload();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) {
      window.location.reload();
    }
  }, [isVisible]);
}
