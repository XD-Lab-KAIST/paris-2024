import { useRef, useEffect, useCallback } from "react";

import { getRandom } from "@/utils/functions/getRandom";

export default function useRandomInterval(callback: any, minDelay: number, maxDelay: number) {
  const timeoutRef = useRef<any>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleTick = () => {
      const nextTickAt = getRandom(minDelay, maxDelay);
      timeoutRef.current = setTimeout(() => {
        callbackRef.current();
        handleTick();
      }, nextTickAt);
    };
    handleTick();
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [minDelay, maxDelay]);

  const cancel = useCallback(() => clearTimeout(timeoutRef.current), [timeoutRef]);
  return cancel;
}
