import { useCallback, useRef, useEffect } from "react";

// Type for the callback function
type CallbackFunction = (...args: any[]) => void;

export function useDebounce<T extends CallbackFunction>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const timerRef = useRef<number | null>(null);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}
