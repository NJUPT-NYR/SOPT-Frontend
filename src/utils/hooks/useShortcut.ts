import { useCallback, useEffect, useRef } from "react";

export default function useShortCutTriggerClick() {
  const env = useRef({ registers: [] });
  useEffect(() => {
    let lock = false;
    const handleKeyDown = (event) => {
      if (lock) return;
      const targets = (env.current.registers ?? []).filter(
        (one) =>
          one.key === event.key &&
          event.metaKey === !!one.metaKey &&
          event.shiftKey === !!one.shiftKey &&
          event.ctrlKey === !!one.ctrlKey
      );
      if (targets.length) {
        lock = true;
        targets.forEach((one) => {
          one.callback(event);
        });
        event.preventDefault();
      }
    };
    const handleKeyUp = () => {
      lock = false;
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  const register = useCallback(
    (config: {
      callback: () => void;
      key: string;
      metaKey?: boolean;
      shiftKey?: boolean;
      ctrlKey?: boolean;
    }) => {
      env.current.registers.push(config);
    },
    [env]
  );
  const revokeAll = useCallback(() => {
    env.current.registers = [];
  }, []);
  return { register, revokeAll };
}
