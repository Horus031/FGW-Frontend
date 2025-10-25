// src/hooks/useSecretSequence.ts
import { useEffect, useRef, useState, useCallback } from "react";

type UseSecretSequenceOptions = {
  secretSequence: string[];
  onMatched: () => void;
  timeoutMs?: number;
  blockDefault?: boolean;
};

export default function useSecretSequence({
  secretSequence,
  onMatched,
  timeoutMs = 1500,
  blockDefault = false,
}: UseSecretSequenceOptions) {
  const bufferRef = useRef<string[]>([]);
  const timerRef = useRef<number | null>(null);
  const [buffer, setBuffer] = useState<string[]>([]);
  const [lastKey, setLastKey] = useState<string | null>(null);

  const resetBuffer = useCallback(() => {
    bufferRef.current = [];
    setBuffer([]);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (blockDefault) e.preventDefault();
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      setLastKey(key);

      // Add key to buffer
      bufferRef.current.push(key);
      if (bufferRef.current.length > secretSequence.length)
        bufferRef.current.shift();

      setBuffer([...bufferRef.current]);

      // Reset timer if typing stops for too long
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => resetBuffer(), timeoutMs);

      // Check for match
      if (
        bufferRef.current.length === secretSequence.length &&
        bufferRef.current.every(
          (k, i) => k.toLowerCase() === secretSequence[i].toLowerCase()
        )
      ) {
        onMatched();
        resetBuffer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [secretSequence, timeoutMs, onMatched, resetBuffer, blockDefault]);

  return { buffer, lastKey };
}
